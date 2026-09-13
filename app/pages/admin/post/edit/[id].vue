<script setup lang="ts">
const route = useRoute('admin-post-edit-id')
</script>

<template>
  <PlutoContentForm :id="route.params.id as string" type="post" />
</template>
