import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const configDir = path.dirname(fileURLToPath(import.meta.url))
  const envDir = path.resolve(configDir, '..', '..', 'frontend')
  const env = loadEnv(mode, envDir, '')
  const backendOrigin = env.VITE_BACKEND_ORIGIN || 'http://localhost:4000'

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api': {
          target: backendOrigin,
          changeOrigin: true,
        },
        '/uploads': {
          target: backendOrigin,
          changeOrigin: true,
        },
        '/_play': {
          target: backendOrigin,
          changeOrigin: true,
          rewrite: (p) => p.replace(/^\/_play/, '/play'),
        },
      },
    },
  }
})
