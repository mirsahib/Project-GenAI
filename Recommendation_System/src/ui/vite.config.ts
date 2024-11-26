import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    port:3000
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@lib": path.resolve(__dirname, "./src/lib"),
      "@pages":path.resolve(__dirname, "./src/pages"),
      "@utils":path.resolve(__dirname, "./src/utils"),
      "@config":path.resolve(__dirname, "./src/config"),
    },
  },
  

})
