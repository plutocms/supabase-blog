import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)

  if (!event.context.params?.id) {
    throw createError({ message: 'No id provided.' })
  }

  const id = Number.parseInt(event.context.params?.id)

  const client = await serverSupabaseClient<BlogDatabase>(event)

  const { data, error } = await client.from('posts').delete().eq('id', id)

  if (error) {
    throw createError({ statusMessage: error.message })
  }

  return {
    message: 'Post deleted successfully.',
    statusCode: 200,
    data,
  }
})
