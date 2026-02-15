import NavbarAdminActions from '../components/NavbarAdminActions.vue'

const sidebarActions = [
  {
    label: 'Posts',
    href: '/admin/posts',
    icon: 'lucide:box',
    onSelect: () => {
      navigateTo('/admin/posts')
    },
    defaultOpen: true,
    children: [
      {
        label: 'Create new post',
        href: '/admin/post/new',
      },

      {
        label: 'All posts',
        href: '/admin/posts',
      },
    ],
  },
]

export default defineNuxtPlugin(() => {
  const { addAction: addNavbarAdminActions } = useNavbarAdminActions()
  const { addAction: addSidebarAdminActions } = useSidebarAdminActions()

  addNavbarAdminActions(markRaw(NavbarAdminActions))
  addSidebarAdminActions(sidebarActions)
})
