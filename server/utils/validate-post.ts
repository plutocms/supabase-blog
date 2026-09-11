import type { PostInsert, PostStatus } from '#shared/types/post'

const ALLOWED_STATUSES: PostStatus[] = ['draft', 'published']

/**
 * Throws a 400 when the payload is missing a required field or a field
 * has the wrong shape. The `status` CHECK constraint in
 * public/schema.supabase-blog.sql already rejects an unknown status at
 * the DB level — this turns that (and a couple of other obvious gaps)
 * into a clean 400 instead of a raw Postgres error, or worse, an insert
 * that silently succeeds with a missing title.
 */
export function assertValidPostPayload(body: Partial<PostInsert> | null) {
  if (!body || typeof body !== 'object') {
    throw createError({ statusCode: 400, statusMessage: 'No payload sent.' })
  }

  if (typeof body.slug !== 'string' || body.slug.trim().length === 0) {
    throw createError({
      statusCode: 400,
      statusMessage: 'A non-empty slug is required.',
    })
  }

  if (typeof body.title !== 'string' || body.title.trim().length === 0) {
    throw createError({
      statusCode: 400,
      statusMessage: 'A non-empty title is required.',
    })
  }

  if (
    body.status !== undefined &&
    !ALLOWED_STATUSES.includes(body.status as PostStatus)
  ) {
    throw createError({
      statusCode: 400,
      statusMessage: `status must be one of: ${ALLOWED_STATUSES.join(', ')}`,
    })
  }

  if (body.content !== undefined && typeof body.content !== 'string') {
    throw createError({
      statusCode: 400,
      statusMessage: 'content must be a string.',
    })
  }
}
