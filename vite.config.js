import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import basicSsl from '@vitejs/plugin-basic-ssl'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '127.0.0.1', // 强制 Vite 使用 IP 地址而不是 localhost
    port: 5173,        // 保持端口不变
    strictPort: true,
  }
})

