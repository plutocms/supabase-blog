import NavbarAdminActions from '../components/NavbarAdminActions.vue'

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
  })
})
