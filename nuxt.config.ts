// https://nuxt.com/docs/api/configuration/nuxt-config

import wasmpack from "vite-plugin-wasm-pack";

export default defineNuxtConfig({
  devtools: { enabled: true },
  vite: {
    plugins: [wasmpack("wiredify_lib")]
}
})
