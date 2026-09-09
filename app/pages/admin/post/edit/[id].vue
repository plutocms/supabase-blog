<script setup lang="ts">
const route = useRoute('admin-post-edit-id')

const { data: post } = await useFetch(`/api/post/get/${route.params.id}`, {
  key: `/api/post/get/${route.params.id}`,
  transform: (res) => res?.data,
})

useHead({
  title: `Editing "${post.value?.title}"`,
})

const form = ref<FormPost>()

onMounted(() => {
  if (post.value) {
    form.value = {
      title: post.value.title,
      slug: post.value.slug,
      content: post.value.content ?? '',
      status: post.value.status as FormPost['status'],
    }
  } else {
    form.value = undefined
  }
})
</script>

<template>
  <div>
    <PostForm v-model="form" :post-id="post?.id" />
  </div>
</template>
