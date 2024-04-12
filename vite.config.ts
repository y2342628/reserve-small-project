import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'



export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd());
  console.log(env,1111)
  
  return {
    plugins: [
      vue(),
      vueJsx(),
    ],
    server: {
      proxy: {
        [env.VITE_BASE_API]: {
          target: env.VITE_BASE_HOST, // 代理目标地址
          changeOrigin: true,
          rewrite: (path) =>path.replace(/^\/api/, ''),
        }
      }
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  }
})
