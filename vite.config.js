import { resolve } from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import eslintPlugin from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    eslintPlugin({
      include: ["src/**/*.js", "src/**/*.vue", "src/*.js", "src/*.vue"]
    })
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      // 圖片不能用resolve的方式引入，會導致顯示錯誤，必須為相對路徑
      "/images": "src/assets/images"
    }
  },
  server: {
    port: "8083"
  }
});
