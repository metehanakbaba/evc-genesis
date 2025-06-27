import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@ui/forms': fileURLToPath(new URL('./src/shared/ui/components/Forms', import.meta.url)),
      '@ui/display': fileURLToPath(new URL('./src/shared/ui/components/Display', import.meta.url)),
      '@ui/layout': fileURLToPath(new URL('./src/shared/ui/components/Layout', import.meta.url)),
      '@ui/feedback': fileURLToPath(new URL('./src/shared/ui/components/Feedback', import.meta.url)),
      '@ui/navigation': fileURLToPath(new URL('./src/shared/ui/components/Navigation', import.meta.url)),
      '@ui/theme': fileURLToPath(new URL('./src/shared/ui/theme', import.meta.url)),
    },
  },
  server: {
    port: 5173,
  },
  define: {
    global: 'globalThis',
  },
  build: {
    target: 'esnext',
  },
})
