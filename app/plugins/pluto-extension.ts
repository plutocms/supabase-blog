import NavbarAdminActions from '../components/NavbarAdminActions.vue'
import PlutoRichtextField from '../components/PlutoRichtextField.vue'

export default defineNuxtPlugin(() => {
  definePlutoExtension({
    id: 'supabase-blog',
    navbarActions: [{ id: 'post-actions', component: NavbarAdminActions }],
    nav: [
      {
        id: 'posts',
        order: 200,
        label: 'supabase-blog.nav.posts',
        icon: 'lucide:file-text',
        to: '/admin/posts',
        defaultOpen: true,
        children: [
          { label: 'supabase-blog.nav.createPost', to: '/admin/post/new' },
          { label: 'supabase-blog.nav.allPosts', to: '/admin/posts' },
        ],
      },
    ],
    pages: [
      { id: 'posts', path: '/admin/posts', title: 'supabase-blog.nav.posts', icon: 'lucide:file-text' },
      { id: 'post-new', path: '/admin/post/new', title: 'supabase-blog.pages.newPost', parent: 'supabase-blog:posts' },
    ],
    capabilities: [
      { id: 'posts-read-drafts', key: 'posts:read_drafts', label: 'supabase-blog.capabilities.readDrafts' },
      { id: 'posts-publish', key: 'posts:publish', label: 'supabase-blog.capabilities.publish' },
      { id: 'posts-delete', key: 'posts:delete', label: 'supabase-blog.capabilities.delete' },
    ],
    contentTypes: [{ id: 'post', type: postType }],
    contentFieldWidgets: [{ id: 'richtext', fieldType: 'richtext', component: PlutoRichtextField }],
  })
})
