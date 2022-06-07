import { defineNuxtConfig } from 'nuxt'

export default defineNuxtConfig({
    target: 'static',
    buildModules: [
      '@nuxt/image',
    ]
})