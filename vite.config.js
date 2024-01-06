import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import legacy from '@vitejs/plugin-legacy';
import { fileURLToPath, URL } from 'node:url';
import { terser } from 'rollup-plugin-terser';


// https://vitejs.dev/config/
export default defineConfig({
  base:"./",
  plugins: [
    vue(),
    legacy(),
    terser({
      keep_fnames: true, // 保留函数名，避免混淆
    }),
  ],
  resolve: {
    alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
    }
}
})
