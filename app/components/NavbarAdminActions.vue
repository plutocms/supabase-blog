<script setup lang="ts">
import type { NavbarAdminActionButtonProps } from '#layers/utils/shared/types/navbar'

const route = useRoute('admin-product-edit-id')

const items = computed<NavbarAdminActionButtonProps[]>(() => [
  {
    label: 'Create post',
    icon: 'lucide:plus',
    to: '/admin/product/new',
    show: !route.path.startsWith('/admin/product/new'),
  },

  {
    label: 'Edit post',
    icon: 'lucide:pen-line',
    to: `/admin/product/edit/${route.params.id}`,
    show: route.path.startsWith('/product/'),
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
