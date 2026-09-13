// The `post` content type. It maps onto the `posts` table columns from
// `db/migrations/001_baseline.sql`: id, created_at, updated_at, slug,
// title, content, status, published_at. See the content-model skill in
// `@plutocms/pluto` for the full field/status/timestamp contract.
//
// `defineContentType` and the field types come from `@plutocms/pluto`'s
// `shared/utils`/`shared/types`, auto-imported the same way every other
// shared/utils export is across this layer (see, for example,
// `definePlutoExtension` in `app/plugins/pluto-extension.ts`). This file
// needs no explicit import for them.
//
// `basePath`/`newPath`/`editPath` point the generic list and form UI at
// this layer's existing, already-deployed admin URLs
// (`/admin/posts`, `/admin/post/new`, `/admin/post/edit/:id`) instead of
// the `/admin/content/post` convention `autoRoutes` would otherwise imply.
// `autoRoutes: false` keeps this content type from generating its own
// nav/pages entries — `app/plugins/pluto-extension.ts` already declares
// them by hand, at these same URLs.
export const postType = defineContentType({
  name: 'post',
  label: 'Post',
  labelPlural: 'Posts',
  icon: 'lucide:file-text',
  source: 'posts',
  titleField: 'title',
  fields: [
    { name: 'title', type: 'text', label: 'Title', required: true, inList: true, region: 'main' },
    { name: 'slug', type: 'slug', label: 'Slug', from: 'title', preview: '/post/', inList: true, region: 'side' },
    { name: 'content', type: 'richtext', label: 'Content', region: 'main' },
  ],
  slug: { field: 'slug' },
  status: {
    column: 'status',
    default: 'draft',
    publishedValue: 'published',
    publishedAtColumn: 'published_at',
    values: [
      { label: 'Draft', value: 'draft' },
      { label: 'Published', value: 'published' },
    ],
  },
  timestamps: { created: 'created_at', updated: 'updated_at' },
  capabilities: { read: 'posts:read_drafts', write: 'posts:publish', delete: 'posts:delete' },
  autoRoutes: false,
  basePath: '/admin/posts',
  newPath: '/admin/post/new',
  editPath: (id) => `/admin/post/edit/${id}`,
})
