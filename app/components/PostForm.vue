<script setup lang="ts">
import type { SelectItem } from '@nuxt/ui'

const props = defineProps<{
  postId?: number
}>()

const route = useRoute('admin-post-edit-id')

useHead({
  title: route.params.id ? 'Edit post' : 'Add new post',
})

const toast = useToast()

const isEditing = computed<boolean>(() => route.path.includes('edit'))

const form = defineModel<FormPost>({
  default: () => ({
    title: '',
    slug: '',
    content: '',
    status: 'draft',
  }),
})

const statusOptions: SelectItem[] = [
  { label: 'Draft', value: 'draft' },
  { label: 'Published', value: 'published' },
]

watch(
  () => form.value.title,
  (value) => {
    form.value.slug = slugify(value) ?? ''
  }
)

const isSubmitting = ref<boolean>(false)

async function submitForm() {
  const payload: PostInsert = {
    slug: form.value?.slug ?? '',
    title: form.value?.title || 'Untitled',
    content: form.value?.content || null,
    status: form.value?.status ?? 'draft',
  }

  try {
    isSubmitting.value = true

    if (!isEditing.value) {
      const { data } = await $fetch('/api/post/create', {
        method: 'POST',
        body: payload,
      })

      toast.add({
        title: 'Post created',
        description: 'Your post has been created successfully.',
        color: 'success',
      })

      navigateTo(`/admin/post/edit/${data.id}`)

      return
    }

    if (!props.postId) {
      throw new Error('Missing post id for edit')
    }

    await $fetch(`/api/post/edit/${props.postId}`, {
      method: 'POST',
      body: payload,
    })

    toast.add({
      title: 'Post updated',
      description: 'Your post has been updated successfully.',
      color: 'success',
    })
  } catch (error) {
    console.error(error)

    toast.add({
      title: 'Error',
      description: 'An error occurred while saving the post.',
      color: 'error',
    })
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="min-h-full bg-linear-to-br px-4 py-6 lg:px-8 lg:py-8">
    <div class="bg-transparent mx-auto flex max-w-6xl flex-col gap-6 rounded-3xl lg:flex-row lg:gap-10 lg:p-8">
      <!-- Left: Title and Content -->
      <div class="flex-1 flex flex-col gap-8">
        <PostTitleInput v-model="form.title" placeholder="Add a title" class="pl-0" />

        <PostEditor
          v-model="form.content"
          :ui="{ content: 'py-8' }"
          placeholder="Write your content here..."
        />
      </div>

      <!-- Right: Form Fields -->
      <div
        class="dark:bg-zinc-950 light:bg-zinc-100 flex w-full shrink-0 flex-col gap-8 rounded-2xl p-4 lg:mt-6 lg:max-h-[90vh] lg:max-w-xs lg:overflow-y-auto"
      >
        <div class="flex flex-col gap-4">
          <div class="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <UButton
              v-if="isEditing" :to="`/post/${form.slug}`" icon="lucide:eye" variant="link" as="NuxtLink"
              target="_blank" class="justify-center"
            >
              Preview
            </UButton>

            <UButton
              :icon="isEditing ? 'lucide:save' : 'lucide:check'" :loading="isSubmitting"
              :disabled="form.title === ''" type="button" class="justify-center" @click="submitForm"
            >
              {{ isEditing ? 'Save' : 'Publish' }}
            </UButton>
          </div>

          <UFormField :help="form.slug ? `/post/${form.slug}` : undefined" label="Slug" />

          <UFormField label="Status">
            <USelect v-model="form.status" :items="statusOptions" value-key="value" class="w-full" />
          </UFormField>
        </div>
      </div>
    </div>
  </div>
</template>
