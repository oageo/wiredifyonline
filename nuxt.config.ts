// https://nuxt.com/docs/api/configuration/nuxt-config

import wasmpack from "vite-plugin-wasm-pack";

export default defineNuxtConfig({
  devtools: { enabled: true },
  css: [
    "bulma"
  ],
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: " wiredify online"
    }
  },
  vite: {
    plugins: [wasmpack("wiredify_lib")]
  }
})
