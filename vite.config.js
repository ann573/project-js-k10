import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    outDir: 'dist',  // Đầu ra cho thư mục `dist`
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index: resolve(__dirname, './index.html'),
        category: resolve(__dirname, './category.html'),
        "product-detail": resolve(__dirname, './product-detail.html')
      }
    }
  },
  assetsInclude: ['**/*.jpg', '**/*.png', '**/*.svg'],
})