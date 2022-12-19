import { crx } from "@crxjs/vite-plugin";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import manifest from "./manifest.json" assert { type: "json" };

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), crx({ manifest })],
  // css: {
  //   preprocessorOptions: {
  //     scss: {
  //       additionalData: '@import "src/assets/styles/_variables.scss";',
  //     },
  //   },
  // },
});
