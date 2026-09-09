import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<BlogDatabase>(event)
  const body = await readBody<PostInsert>(event)

  if (!body) {
    throw createError({ statusMessage: 'No payload sent.' })
  }

  const now = new Date().toISOString()

  const payload: PostInsert = {
    slug: body.slug,
    title: body.title,
    content: body.content,
    status: body.status,
    created_at: now,
    updated_at: now,
    published_at: body.status === 'published' ? now : null,
  }

  const { data, error } = await client
    .from('posts')
    .insert(payload)
    .select()
    .single()

  if (error) {
    throw createError({ statusMessage: error.message })
  }

  return {
    message: 'Post created successfully',
    statusCode: 200,
    data,
  }
})
