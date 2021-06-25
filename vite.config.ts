import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import { defineConfig } from "vite";
import { chromeExtension } from "vite-plugin-chrome-extension";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), chromeExtension()],
  resolve: {
    alias: {
      "/@": resolve(__dirname, "src"),
    },
  },
  build: {
    rollupOptions: {
      input: "src/manifest.json",
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "src/assets/styles/_variables.scss";',
      },
    },
  },
});
