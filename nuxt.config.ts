// https://nuxt.com/docs/api/configuration/nuxt-config

import wasm from "vite-plugin-wasm";
import topLevelAwait from "vite-plugin-top-level-await";

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
    plugins: [
      wasm(),
      topLevelAwait()
    ]
  }
})
