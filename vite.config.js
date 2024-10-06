import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: "https://markarko.github.io/dawson-scheduler-v2/"
})
