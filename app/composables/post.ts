export function usePost(postSlugOrId?: number | string | string[] | null) {
  if (Array.isArray(postSlugOrId)) {
    postSlugOrId = postSlugOrId[0]
  }

  const listFetch = useFetch('/api/post/list', {
    key: 'posts',
    transform: (res) => res.data,
    immediate: !postSlugOrId,
    server: !postSlugOrId,
  })

  const postFetch = useFetch(`/api/post/get/${postSlugOrId}`, {
    key: `post-${postSlugOrId}`,
    transform: (res) => res?.data,
    immediate: !!postSlugOrId,
    server: !!postSlugOrId,
  })

  const pending = computed<boolean>(() => {
    if (postSlugOrId) {
      return postFetch.pending.value
    }

    return listFetch.pending.value
  })

  function refresh() {
    if (postSlugOrId) {
      postFetch.refresh()
    }

    listFetch.refresh()
  }

  const activeFetch = postSlugOrId ? postFetch : listFetch

  interface UsePostResultBase {
    posts: typeof listFetch.data
    post: typeof postFetch.data
    refresh: () => void
    pending: typeof pending
    error: typeof activeFetch.error
  }

  type UsePostResult = UsePostResultBase & {
    then: (
      onFulfilled?: ((value: UsePostResultBase) => unknown) | null,
      onRejected?: ((reason: unknown) => unknown) | null
    ) => Promise<unknown>
  }

  const result: UsePostResult = {
    posts: listFetch.data,
    post: postFetch.data,
    refresh,
    pending,
    then(onFulfilled, onRejected) {
      return activeFetch.then(() => {
        const { then: _then, ...base } = result
        return onFulfilled?.(base)
      }, onRejected)
    },
    error: activeFetch.error,
  }

  return result
}
