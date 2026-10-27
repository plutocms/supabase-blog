# Blog layer for Pluto with Supabase

This layer adds a blog to Pluto. It stores posts in Supabase. Editors write them in the Pluto admin with a rich text editor. The layer builds on [`@plutocms/supabase`](https://github.com/plutocms/supabase), `@plutocms/supabase-storage` and `@plutocms/ui`.

## What the layer gives

- **Post admin:** list, create, edit and delete posts at `/admin/posts`, `/admin/post/new` and `/admin/post/edit/:id`. The pages run on the generic content UI of `@plutocms/pluto`, against the `post` content type.
- **Rich text editor:** a Tiptap editor that stores Markdown. It has a focus layout and draft/publish controls.
- **Inline images:** an editor can pick an existing file or upload a new one. The upload uses the media library of `@plutocms/supabase-storage`.
- **Capabilities:** `posts:read_drafts`, `posts:publish` and `posts:delete` gate the actions. An admin holds all three.
- **Public data:** the published posts on the public API of Pluto, for a site in any stack: `GET /api/pluto/v1/content/post` and `GET /api/pluto/v1/content/post/<id or slug>`. A list item has an `excerpt`, and one post has its body as sanitized `html`. In Nuxt, use `usePlutoPublicList` and `usePlutoPublicItem`. See https://pluto.vulmix.dev/core/public-api.
- **`PlutoProse`:** a component that shows a stored richtext value (Markdown, HTML or Tiptap JSON) as sanitized, styled HTML. Use it on a public post page.
- **Migrations:** the `posts` table and its policies ship as layer migrations. An admin applies them from `/admin/migrations`.

For the full detail, see [FEATURES.md](./FEATURES.md).

## Requirements

- A Supabase project, with `SUPABASE_URL` and `SUPABASE_KEY` in your `.env`. See the [`@plutocms/supabase` README](https://github.com/plutocms/supabase).
- Nuxt 4 and a Tailwind entry file that your app owns. See the single Tailwind build section in the [`@plutocms/pluto` README](https://github.com/plutocms/pluto).

## Installation

Install the layer. It brings `@plutocms/supabase` (and with it `@plutocms/pluto`), `@plutocms/supabase-storage` and `@plutocms/ui`. Your app extends only this layer.

```bash
# npm
npm i @plutocms/supabase-blog

# pnpm
pnpm add @plutocms/supabase-blog

# bun
bun add @plutocms/supabase-blog
```

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  extends: [['@plutocms/supabase-blog', { install: true }]],
})
```

The `package.json` of the app lists only `@plutocms/supabase-blog`, besides `nuxt`, `vue` and `vue-router`.

## Links

- Starter: [`pluto-supabase-blog-template`](https://github.com/plutocms/pluto-supabase-blog-template), with public `blog` and `post/[slug]` pages.
- Skills: `.claude/skills/blog-posts/SKILL.md` and `.claude/skills/prose/SKILL.md`.
