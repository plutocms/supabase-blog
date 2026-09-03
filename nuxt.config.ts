// Point these at a local checkout (e.g. `../supabase`, `../supabase-storage`,
// `../ui`) to test unpublished changes; unset, they resolve to the published
// npm packages.
const supabaseLayer = process.env.PLUTO_SUPABASE_PATH || '@plutocms/supabase'
const supabaseStorageLayer =
  process.env.PLUTO_SUPABASE_STORAGE_PATH || '@plutocms/supabase-storage'
const uiLayer = process.env.PLUTO_UI_PATH || '@plutocms/ui'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: [supabaseLayer, supabaseStorageLayer, uiLayer],

  $meta: {
    name: 'supabase-blog',
  },
})
