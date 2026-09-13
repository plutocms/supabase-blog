import { postType } from '#shared/content/post'
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
        label: 'Posts',
        icon: 'lucide:file-text',
        to: '/admin/posts',
        defaultOpen: true,
        children: [
          { label: 'Create new post', to: '/admin/post/new' },
          { label: 'All posts', to: '/admin/posts' },
        ],
      },
    ],
    pages: [
      { id: 'posts', path: '/admin/posts', title: 'Posts', icon: 'lucide:file-text' },
      { id: 'post-new', path: '/admin/post/new', title: 'New post', parent: 'supabase-blog:posts' },
    ],
    capabilities: [
      { id: 'posts-read-drafts', key: 'posts:read_drafts', label: 'Read draft posts' },
      { id: 'posts-publish', key: 'posts:publish', label: 'Create and publish posts' },
      { id: 'posts-delete', key: 'posts:delete', label: 'Delete posts' },
    ],
    contentTypes: [{ id: 'post', type: postType }],
    contentFieldWidgets: [{ id: 'richtext', fieldType: 'richtext', component: PlutoRichtextField }],
  })
})
