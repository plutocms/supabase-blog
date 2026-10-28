// Point these at a local checkout (e.g. `../supabase`, `../supabase-storage`)
// to test unpublished changes; unset, they resolve to the published npm
// packages.
const supabaseLayer = process.env.PLUTO_SUPABASE_PATH || '@plutocms/supabase'
const supabaseStorageLayer =
  process.env.PLUTO_SUPABASE_STORAGE_PATH || '@plutocms/supabase-storage'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: [supabaseLayer, supabaseStorageLayer],

  $meta: {
    name: 'supabase-blog',
  },

  // No `css` entry: the app owns the one Tailwind build, and Nuxt UI scans
  // this layer's app/ dir. See the single-tailwind-build skill in pluto.
})
