---
name: blog-posts
description: Blog post admin (create, edit, list, delete) with a rich text editor and image upload.
---

# Blog posts

This skill covers the blog post feature in the `supabase-blog` layer. It lets an admin create,
edit, list, and delete blog posts. Each post has a title and a rich text body.

## The `posts` table

The table is defined in this layer's `db/migrations/` directory (see below). It has these
columns:

- `id` — bigint. The primary key. The database generates it.
- `created_at` — timestamptz. The database sets it when a row is created.
- `updated_at` — timestamptz. The API sets it on every create and edit.
- `slug` — text. Unique. It forms the public post path, `/post/<slug>`.
- `title` — text. Required.
- `content` — text. The post body, in markdown. It can hold inline images.
- `status` — text. Either `draft` or `published`. The default is `draft`.
- `published_at` — timestamptz. Null while the post is a draft. The API sets it when a post
  becomes published, and clears it back to null when a post goes back to draft.

Row Level Security rules use three named capabilities, checked through
`public.has_capability(cap)` (from `@plutocms/supabase` 0.7.0+):

- `posts:read_drafts` — read a row where `status = 'draft'`. An anonymous visitor (`anon`)
  always reads only rows where `status = 'published'`, capability or not.
- `posts:publish` — insert a row, or update any row.
- `posts:delete` — delete any row.

`public.has_capability()` folds in `public.is_admin()`, so an admin holds all three
capabilities with no extra setup. There is no ownership-scoped capability yet — a holder of
`posts:publish` can edit every post, not only their own.

### How the migration applies

This layer ships versioned migrations under `db/migrations/`, following the convention
described in `@plutocms/supabase`'s own `layer-migrations` skill. See that skill for how the
engine discovers, applies, and records migrations. This layer's migration files, in order:

- `db/migrations/001_baseline.sql` — the `posts` table, its indexes, and the original RLS
  policies. This is the exact schema released in `v0.1.3`.
- `db/migrations/002_admin_policies.sql` — hardens the `posts` RLS policies so that reading a
  draft, and every insert, update, and delete, requires `public.is_admin()`.
- `db/migrations/003_capability_policies.sql` — rewrites the same four `posts` RLS policies to
  the three named capabilities above, instead of `public.is_admin()`.

`public/schema.supabase-blog.sql` is now a compatibility stub. It stays in place only so a
site still running `@plutocms/supabase` older than 0.4.0 gets a clear upgrade error instead of
silently missing this layer's migrations. Remove it one release after 0.4.0 is the floor
everywhere.

## Server API routes

All routes live under `server/api/post/`. Each one loads a Supabase client typed with
`BlogDatabase` (see the shim below), from `#supabase/server`.

- `POST /api/post/create` — body: `{ slug, title, content, status }`. Sets `created_at` and
  `updated_at` to now. Sets `published_at` to now when `status` is `published`, else null.
  Returns `{ message, statusCode, data }`.
- `GET /api/post/list` — no body. Returns `{ data }`, every post ordered by `created_at`
  descending (the row-level security rule still hides drafts from an anonymous caller).
- `GET /api/post/get/:id` — `:id` can be a numeric id or a slug. Returns `{ data }`. Returns a
  404 with the message `Post not found` when no row matches.
- `POST /api/post/edit/:id` — body: `{ slug, title, content, status }`. Sets `updated_at` to
  now. Sets `published_at` to now when the new status is `published` and the stored
  `published_at` is still null. Clears `published_at` to null when the new status is `draft`.
  Returns `{ message, statusCode, data }`.
- `DELETE /api/post/delete/:id` — no body. Returns `{ message, statusCode, data }`.

## The `usePost` composable

`app/composables/post.ts` exports `usePost(postSlugOrId?)`.

- Call it with no argument to fetch the post list (`GET /api/post/list`).
- Call it with a slug or id to fetch one post (`GET /api/post/get/:id`).

It returns `{ posts, post, refresh, pending, error }`, and the result is also awaitable (it has
a `then` method), so `const { post } = await usePost(id)` works.

## Pages and components

- `app/pages/admin/posts.vue` — the post list. Shows a table on desktop and cards on mobile.
  Each row links to the edit page and offers a delete action through a confirm modal.
- `app/pages/admin/post/new.vue` — the create page. Renders `PostForm` with an empty form.
- `app/pages/admin/post/edit/[id].vue` — the edit page. Fetches the post, then renders
  `PostForm` with the loaded form.
- `app/components/PostForm.vue` — the two-column form shared by the create and edit pages. The
  left column holds the title input and the rich text editor. The right column holds a preview
  link, the save button, the read-only slug display, and the status select.
- `app/components/PostEditor.vue` — the rich text editor. It wraps `@nuxt/ui`'s `UEditor` with
  a markdown content type and a toolbar. It also owns the image upload flow (see below).

These components come from other layers, already auto-imported:

- `PostTitleInput` — from the `ui` layer.
- `UploadMedia` — from the `supabase-storage` layer.
- `AdminView`, `Modal`, `ModalHeader`, `ModalContent`, `ModalFooter` — from the `pluto` layer,
  through the `supabase` layer.

## Image upload

A post body can hold inline images. The path from click to inserted image:

1. The editor toolbar's image button, or the suggestion menu's "Image" entry, opens the
   `imageUpload` custom handler in `PostEditor.vue`.
2. The handler opens the `UploadMedia` modal (`isMediaModalOpen.value = true`) instead of
   inserting a node directly.
3. Inside the modal, the editor either picks an existing file or uploads a new one. A new
   upload posts to `POST /api/media/new` (in the `supabase-storage` layer), which stores the
   file and inserts a `media` row.
4. The modal emits `insert` with the chosen media row (or rows).
5. `PostEditor.vue`'s `onInsertMedia` handler builds the public URL with
   `useMedia().getMediaUrl(name)`, then calls
   `editor.chain().focus().setImage({ src, alt }).run()` to insert the image into the post
   body.

## The `BlogDatabase` shim

`shared/types/post.ts` declares `BlogDatabase`. It takes the generated `Database` type (from
`shared/types/supabase.ts`, which is gitignored and regenerated per environment) and adds a
`posts` table to it. Without the shim, none of this layer's code that calls
`client.from('posts')` would typecheck, because the generated snapshot has no `posts` table
until this layer's migration has run once against a real database and the Supabase CLI has
regenerated the snapshot from it.

Delete the `posts` block from `BlogDatabase` once the generated `Database` snapshot declares
the `posts` table on its own. At that point `BlogDatabase` can become a plain alias for
`Database`, or every reference to `BlogDatabase` can move back to `Database`.
