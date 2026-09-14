/**
 * Registers the `post` content type with core's generic content routes,
 * at Nitro startup.
 */
export default defineNitroPlugin(() => {
  registerContentType(postType)
})
