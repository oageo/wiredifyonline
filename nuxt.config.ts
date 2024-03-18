// https://nuxt.com/docs/api/configuration/nuxt-config

import wasmpack from "vite-plugin-wasm-pack";

export default defineNuxtConfig({
  devtools: { enabled: true },
  css: [
    "bulma"
  ],
  app: {
    head: {
      htmlAttrs: {
        lang: "ja",
        prefix: "og: https://ogp.me/ns#"
      },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: "wiredify online",
      meta: [
        { property: "og:type", content: "website" },
        { property: "og:site_name", content: "wiredify online" }
      ]
    }
  },
  modules: [
    "nuxt-purgecss"
  ],
  vite: {
    plugins: [wasmpack("wiredify_lib")]
  }
})
