import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<BlogDatabase>(event)
  const params = event.context.params
  const body = await readBody<PostInsert>(event)

  if (!body) {
    throw createError({ statusMessage: 'No payload sent.' })
  }

  if (!params?.id) {
    throw createError({ statusMessage: 'No param sent.' })
  }

  const postId = Number(params.id)

  const { data: existing, error: fetchError } = await client
    .from('posts')
    .select('published_at')
    .eq('id', postId)
    .single()

  if (fetchError) {
    throw createError({ statusMessage: fetchError.message })
  }

  const payload: PostUpdate = {
    slug: body.slug,
    title: body.title,
    content: body.content,
    status: body.status,
    updated_at: new Date().toISOString(),
    published_at:
      body.status === 'published'
        ? (existing.published_at ?? new Date().toISOString())
        : null,
  }

  const { data, error } = await client
    .from('posts')
    .update(payload)
    .eq('id', postId)
    .select('*')
    .single()

  if (error) {
    throw createError({ statusMessage: error.message })
  }

  return {
    message: 'Post updated successfully',
    statusCode: 200,
    data,
  }
})
