// header.js
function createHeader() {
    const header = document.createElement('header');
    header.className = "container mx-auto grid grid-cols-12 gap-5 py-5 px-10 shadow-lg bg-[#fcb800] fixed top-0 left-0 z-50";
    
    header.innerHTML = `
      <div class="logo col-span-3 text-center flex justify-center">
        <a href="#">
          <img class="site-logo" alt="Đồ công nghệ" src="./assests/img/logo-trustmart.png" />
        </a>
      </div>
      <div class="search col-span-5 flex items-center">
        <div class="search_input flex items-center w-full relative">
          <i class="ri-search-line absolute left-2"></i>
          <input type="text" name="search" placeholder="Tìm kiếm sản phẩm" class="outline-none border border-[#eee] w-full py-2 px-8 rounded-xl" id="search-input" />
          <div id="search-results" class="hidden absolute top-[150%] w-full bg-white shadow-lg z-20"></div>
        </div>
      </div>
      <div class="col-span-2 flex items-center justify-end gap-2">
        <i class="ri-phone-line text-3xl"></i>
        <div class="text flex flex-col">
          <span class="text-sm">Hotline</span>
          <span class="font-semibold">1900.88.8888</span>
        </div>
      </div>
      <div class="relative flex items-center justify-center cursor-pointer">
        <i class="ri-shopping-basket-line text-3xl"></i>
        <p class="absolute top-0 left-14 bg-black rounded-lg text-[#fff] text-xs size-5 flex justify-center items-center">0</p>
      </div>
      <div class="flex items-center">
        <button class="bg-[#fff] px-5 py-2 rounded-xl font-semibold transition-colors hover:bg-black hover:text-[#fff]">Login</button>
      </div>
    `;
  
    return header;
  }
  
  // Chèn header vào DOM
  document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const headerComponent = createHeader();
    body.prepend(headerComponent); // Thêm header vào đầu body
  });
  