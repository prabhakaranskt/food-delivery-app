import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
   logLevel: 'info',
  plugins: [react()],
  server: {
    host: true
  },
  //  build: {
  //   rollupOptions: {
  //     external: ['fs']
  //   }
  // }
})
