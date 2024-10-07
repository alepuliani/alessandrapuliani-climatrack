import { fileURLToPath, URL } from "node:url"

import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"

// https://vitejs.dev/config/
export default defineConfig({
  base: "/alessandrapuliani-climatrack/",
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern"
      }
    }
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url))
    }
  }
})
