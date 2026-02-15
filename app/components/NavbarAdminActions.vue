<script setup lang="ts">
import type { NavbarAdminActionButtonProps } from '#layers/utils/shared/types/navbar'

const route = useRoute('admin-product-edit-id')

const items = computed<NavbarAdminActionButtonProps[]>(() => [
  {
    label: 'Create post',
    icon: 'lucide:file-plus-2',
    to: '/admin/post/new',
    show: !route.path.startsWith('/admin/post/new'),
  },

  {
    label: 'Edit post',
    icon: 'lucide:file-pen-line',
    to: `/admin/post/edit/${route.params.id}`,
    show: route.path.startsWith('/posts/'),
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
