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

The public site reads posts through two hand-written routes under `server/api/post/`,
unchanged. Each loads a Supabase client typed with `BlogDatabase` (see the shim below), from
`#supabase/server`.

- `GET /api/post/list` — no body. Returns `{ data }`, every post ordered by `created_at`
  descending (the row-level security rule still hides drafts from an anonymous caller).
- `GET /api/post/get/:id` — `:id` can be a numeric id or a slug. Returns `{ data }`. Returns a
  404 with the message `Post not found` when no row matches.

The old hand-written write routes — `POST /api/post/create`, `POST /api/post/edit/:id`,
`DELETE /api/post/delete/:id` — are gone. The admin UI writes through the generic
`/api/_pluto/content/post/*` routes instead (see "The admin UI: the `post` content type"
below). `server/utils/validate-post.ts` (`assertValidPostPayload`), which only those three
routes called, is gone too.

## The `usePost` composable

`app/composables/post.ts` exports `usePost(postSlugOrId?)`. The admin UI does not use it
anymore (see below) — it stays because `pluto-supabase-blog-template`'s public pages
(`blog.vue`, `post/[slug].vue`) still call it.

- Call it with no argument to fetch the post list (`GET /api/post/list`).
- Call it with a slug or id to fetch one post (`GET /api/post/get/:id`).

It returns `{ posts, post, refresh, pending, error }`, and the result is also awaitable (it has
a `then` method), so `const { post } = await usePost(id)` works.

A post's `content` field, as `usePost` returns it, is the raw stored value this editor writes
(markdown today). `PlutoProse` is the component that turns that value into sanitized, styled
HTML for display — see the `prose` skill for its full detail.

## The admin UI: the `post` content type

`/admin/posts`, `/admin/post/new`, and `/admin/post/edit/:id` no longer run hand-written pages
and forms. They run `@plutocms/pluto`'s generic content-model admin UI, against one content
type declared in `shared/content/post.ts`:

- `app/pages/admin/posts.vue` renders `<PlutoContentList type="post" />`.
- `app/pages/admin/post/new.vue` renders `<PlutoContentForm type="post" />`.
- `app/pages/admin/post/edit/[id].vue` renders `<PlutoContentForm type="post" :id="..." />`.

`shared/content/post.ts` declares the `title`, `slug`, and `content` fields, the `status`
workflow (`draft`/`published`, stamping `published_at` the first time a post is published), the
`created_at`/`updated_at` timestamps, and the three capabilities above. It sets
`autoRoutes: false` and explicit `basePath`/`newPath`/`editPath` values, so the URLs above never
changed — see `@plutocms/pluto`'s content-model skill for what every field on a content type
means, and `@plutocms/supabase`'s content-adapter skill for how a content type maps onto a real
table.

The old hand-written equivalents — `app/components/PostForm.vue`, and the `PostForm`-rendering
bodies of the three pages above — are gone. `app/components/PostEditor.vue` (the rich text
editor, see "The rich text editor" and "Image upload" below) keeps its plain `v-model` contract,
but the generic form does not call it directly: `app/components/PlutoRichtextField.vue` adapts
that `v-model` to the `field`/`modelValue`/`disabled`/`update:modelValue` contract every
content-model field widget shares, and is registered for the `richtext` field type in
`app/plugins/pluto-extension.ts`.

## The rich text editor

`app/components/PostEditor.vue` builds a `@tiptap/vue-3` editor directly, with `useEditor()`.
It does not use Nuxt UI's `<UEditor>` component. `<UEditor>`'s own `onUpdate` handler always
serializes the whole document to markdown on every keystroke, with no way to debounce it. Under
fast typing or a held backspace, that serialization queues up and freezes the page. Building the
editor directly gives full control over when serialization happens.

The toolbar and menu item definitions (fixed toolbar, bubble toolbar, suggestion menu, and the
drag-handle's block menu) live in `app/utils/postEditorItems.ts`, imported by explicit relative
path.

### Markdown at the boundary

The document lives as native ProseMirror state while the user types. `PostEditor.vue` never
calls `editor.getMarkdown()` (a full-document serialize) inside the editor's `onUpdate` handler.
Instead:

- `onUpdate` only marks the document dirty and (re)starts a 400ms debounce timer.
- The debounce timer's callback, and the editor's `onBlur` handler, do the real markdown
  serialization and write it to the component's `v-model`.
- An external change to the `v-model` (for example, the parent loading a different post) is
  compared against the last markdown string this component itself emitted. If it matches, the
  incoming change is the component's own echo, and it is ignored — no re-serialization needed to
  detect that.

This keeps every keystroke cheap. The only place a full-document serialization ever runs is the
debounced flush, at most once per 400ms of active typing, plus once on blur.

### Removed features

Mention, Emoji, and Horizontal Rule are not in the editor. They may return later as separate
features. Text Align was removed too — it was a toolbar button that never worked, because the
`@tiptap/extension-text-align` package was never installed.

A post's status has no control in the admin UI yet — a known, accepted gap in
`@plutocms/pluto`'s generic form, not something this layer works around.

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
