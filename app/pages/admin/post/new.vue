<script setup lang="ts">
const form = ref<FormPost>({
  title: '',
  slug: '',
  content: '',
  status: 'draft',
})
</script>

<template>
  <PostForm v-model="form" />
</template>
