// https://nuxt.com/docs/api/configuration/nuxt-config

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
  // nuxt-purgecss は Nuxt 4 非対応のため、PostCSS プラグインを直接使う（設定は旧モジュールのデフォルト相当）
  $production: {
    postcss: {
      plugins: {
        "@fullhuman/postcss-purgecss": {
          content: [
            "components/**/*.{vue,jsx?,tsx?}",
            "layouts/**/*.{vue,jsx?,tsx?}",
            "pages/**/*.{vue,jsx?,tsx?}",
            "composables/**/*.{vue,jsx?,tsx?}",
            "app.{vue,jsx?,tsx?}",
            "plugins/**/*.{js,ts}",
            "nuxt.config.{js,ts}"
          ],
          defaultExtractor: (content: string) => {
            const contentWithoutStyleBlocks = content.replace(/<style[^]+?<\/style>/gi, "");
            return contentWithoutStyleBlocks.match(/[\w-.:/]+(?<!:)/g) || [];
          },
          safelist: [
            "body",
            "html",
            "nuxt-progress",
            "__nuxt",
            /-(leave|enter|appear)(|-(to|from|active))$/,
            /^nuxt-link(|-exact)-active$/,
            /^(?!cursor-move).+-move$/,
            /.*data-v-.*/,
            /:slotted/,
            /:deep/,
            /:global/
          ]
        }
      }
    }
  }
})
