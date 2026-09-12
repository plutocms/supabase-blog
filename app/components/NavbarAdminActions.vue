<script setup lang="ts">
import type { NavbarAdminActionButtonProps } from '#layers/utils/shared/types/navbar'

const route = useRoute()

// `can()` only hides these actions from a user who cannot use them. It is
// a UI convenience, not a security boundary. The real enforcement is the
// posts:publish RLS policy and the requireCapability guard on the
// create/edit server routes.
const { can } = usePlutoPermissions()

const items = computed<NavbarAdminActionButtonProps[]>(() => [
  {
    label: 'Create post',
    icon: 'lucide:file-plus-2',
    to: '/admin/post/new',
    show: !route.path.startsWith('/admin/post/new') && can('posts:publish'),
  },

  {
    label: 'Edit post',
    icon: 'lucide:file-pen-line',
    to: `/admin/post/edit/${
      ('id' in route.params && route.params.id) ||
      ('slug' in route.params && route.params.slug) ||
      ''
    }`,
    show: route.path.startsWith('/post/') && can('posts:publish'),
  },
])
</script>

<template>
  <template v-for="item in items" :key="item.label">
    <NavbarAdminActionButton
      :label="item.label"
      :icon="item.icon"
      :to="item.to"
      :show="item.show"
    />
  </template>
</template>
