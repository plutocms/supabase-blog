<script setup lang="tsx">
import type { TableColumn } from '@nuxt/ui'
import { NuxtLink, UButton, ULink } from '#components'

useHead({
  title: 'All posts',
})

const { posts, refresh, pending } = usePost()

const columns = ref<TableColumn<Post>[]>([
  {
    accessorKey: 'id',
    header: '#',
  },
  {
    accessorKey: 'title',
    header: 'Title',
    cell: ({ row }) => (
      <div class="flex flex-col gap-y-1">
        <div>
          <ULink to={`/admin/post/edit/${row.getValue('id')}`}>
            {row.getValue('title')}
          </ULink>
        </div>

        <div class="opacity-0 group-hover:opacity-100">
          <div class="flex gap-x-3">
            <NuxtLink
              to={`/admin/post/edit/${row.getValue('id')}`}
              class="text-info cursor-pointer px-0 py-0.5 hover:underline"
            >
              Edit
            </NuxtLink>

            <a
              class="text-error cursor-pointer px-0 py-0.5 hover:underline"
              onClick={(event: Event) => {
                event.preventDefault()
                openRemovePostModal(row.getValue('id'))
              }}
            >
              Remove
            </a>
          </div>
        </div>
      </div>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
  },
  {
    accessorKey: 'slug',
    header: 'Slug',
  },
  {
    accessorKey: 'created_at',
    header: 'Created at',
    cell: ({ row }) => new Date(row.getValue('created_at')).toLocaleString(),
  },
])

const currentPostId = ref<number | null>(null)
const isDeletePostModalOpen = ref<boolean>(false)

function openRemovePostModal(postId: number | null) {
  if (!postId) {
    return
  }

  currentPostId.value = postId

  isDeletePostModalOpen.value = true
}

function closeRemovePostModal() {
  currentPostId.value = null

  isDeletePostModalOpen.value = false
}

async function deletePost(postId: number | null) {
  if (!postId) {
    return
  }

  try {
    await $fetch(`/api/post/delete/${postId}`, {
      method: 'DELETE',
    })

    refresh()

    closeRemovePostModal()
  } catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <div>
    <Modal v-model="isDeletePostModalOpen" :custom-size="680">
      <ModalHeader @close="closeRemovePostModal">Remove post</ModalHeader>

      <ModalContent>
        <p>Do you really want to remove this item?</p>
      </ModalContent>

      <ModalFooter>
        <div class="flex items-center gap-4">
          <UButton
            icon="lucide:x"
            variant="ghost"
            color="neutral"
            @click="closeRemovePostModal"
          >
            Cancel
          </UButton>

          <UButton
            icon="lucide:trash"
            color="error"
            @click="deletePost(currentPostId)"
          >
            Remove
          </UButton>
        </div>
      </ModalFooter>
    </Modal>

    <AdminView>
      <div
        class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"
      >
        <hgroup
          class="flex items-center justify-between gap-x-3 lg:justify-start"
        >
          <h1 class="text-3xl font-bold lg:text-4xl">All posts</h1>

          <UButton
            :loading="pending"
            icon="lucide:refresh-ccw"
            variant="ghost"
            title="Refresh"
            square
            @click="refresh()"
          />
        </hgroup>

        <div class="flex lg:shrink-0">
          <UButton
            icon="lucide:plus"
            as="NuxtLink"
            to="/admin/post/new"
            class="flex-1 justify-center lg:flex-none"
          >
            Add post
          </UButton>
        </div>
      </div>

      <div class="grid gap-3 lg:hidden">
        <UCard v-for="post in posts" :key="post.id">
          <div class="flex flex-col gap-4">
            <div class="min-w-0">
              <NuxtLink
                :to="`/admin/post/edit/${post.id}`"
                class="block truncate text-lg font-semibold hover:underline"
              >
                {{ post.title }}
              </NuxtLink>
              <p class="mt-1 truncate text-sm text-muted">/{{ post.slug }}</p>
            </div>

            <dl class="grid grid-cols-2 gap-3 text-sm">
              <div>
                <dt class="text-muted">Status</dt>
                <dd class="font-medium">
                  {{ post.status }}
                </dd>
              </div>
            </dl>

            <div class="flex gap-2 border-t border-default pt-3">
              <UButton
                :to="`/admin/post/edit/${post.id}`"
                icon="lucide:pen-line"
                color="neutral"
                variant="soft"
                class="flex-1 justify-center"
              >
                Edit
              </UButton>
              <UButton
                icon="lucide:trash"
                color="error"
                variant="soft"
                class="flex-1 justify-center"
                @click="openRemovePostModal(post.id)"
              >
                Remove
              </UButton>
            </div>
          </div>
        </UCard>
      </div>

      <UCard :ui="{ body: 'sm:p-0 p-0' }" class="hidden lg:block">
        <div class="overflow-x-auto">
          <UTable
            :data="posts"
            :columns="columns"
            :meta="{
              class: {
                tr: 'group',
              },
            }"
            :loading="pending"
          />
        </div>
      </UCard>
    </AdminView>
  </div>
</template>
