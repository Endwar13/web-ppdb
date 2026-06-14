import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        fasilitas: resolve(__dirname, 'Fasilitas.html'),
        program: resolve(__dirname, 'program.html'),
      },
    },
  },
})