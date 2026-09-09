import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<BlogDatabase>(event)

  const { data, error } = await client
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    throw createError({ statusMessage: error.message })
  }

  return { data }
})
