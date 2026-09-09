import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const params = event.context.params
  const client = await serverSupabaseClient<BlogDatabase>(event)

  if (params) {
    const lookup = params.id
    const id = Number.parseInt(lookup as string, 10)
    const isId = !Number.isNaN(id)

    const { data, error } = await client
      .from('posts')
      .select('*')
      .eq(isId ? 'id' : 'slug', isId ? id : (lookup as string))
      .limit(1)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        throw createError({
          statusCode: 404,
          statusMessage: 'Post not found',
        })
      }

      throw createError({ statusMessage: error.message })
    }

    return { data }
  }
})
