import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'//import file tailwind
import { resolve } from 'path';//import file html lain dari node js

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),//Untuk Halaman Utama
        fasilitas: resolve(__dirname, 'Fasilitas.html'),//Halaman lain 
        program: resolve(__dirname, 'program.html'),//Halaman Lain
      },
    },
  },
})