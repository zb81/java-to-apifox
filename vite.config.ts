import process from 'node:process'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    define: {
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'true',
      __VUE_OPTIONS_API__: 'false',
    },
    base: env.VITE_APP_BASE,
    plugins: [UnoCSS(), vue()],
    server: {
      strictPort: true,
    },
  }
})
