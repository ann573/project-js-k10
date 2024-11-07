export default {
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',  // Tệp index chính
        page1: 'pages/category.html', // Thêm page1.html vào quá trình build
        page2: 'pages/product-detail.html'  // Thêm page2.html vào quá trình build
      }
    }
  }
};