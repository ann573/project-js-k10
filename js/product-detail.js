import { getAll, getById, removeById, updateById } from "./service.js";
import { getParams } from "./utils.js";
import initializeSlider from "./slide.js";


const searchInput = document.getElementById("search-input");
const searchResults = document.getElementById("search-results");
const titleProduct = document.querySelector(".title_product");

const overlay = document.getElementById("overlay");
const path = document.querySelector(".path");

(async () => {
  const data = await getById("products", getParams("id"));
  renderpath(data);
  renderInformartion(data);
})();

function renderpath(data) {
  console.log(data);
  path.innerHTML = /*html*/ `
        <a href="../index.html" class="text-[#09c] hover:text-[#fcb800] transition-colors">Home</a> /
        <a href="../pages/category.html?category=${data.category}" class="text-[#09c] hover:text-[#fcb800] transition-colors capitalize">${data.category}</a> /
        <span>${data.title}</span>

    `;
}

function renderInformartion(data) {
  const main = document.querySelector(".main");
  const titleProduct = document.querySelector(".title_product"); // Đảm bảo xác định phần tử này

  let star = "";
  for (let i = 1; i <= data.rating; i++) {
    star += `<span class="text-[gold] text-sm mr-1">★</span>`;
  }
  
  if (data.rating < 5) {
    const result = 5 - Math.floor(data.rating);
    for (let i = 1; i <= result; i++) {
      star += `<span class="text-sm text-gray-400 mr-1">★</span>`;
    }
  }

  titleProduct.innerHTML = /*html*/ `
    <h1 class="text-2xl mb-1">${data.title}</h1>
    <div class="flex items-center">
      <span>${star}</span>
      <a href="#" class="relative text-[#666] text-sm ml-1 mr-10 after:absolute after:-right-5 after:top-[3px] after:h-3/4 after:w-px after:bg-[#66666669] after:content-['']"> ( ${data.reviews.length} reviews )
      </a>
      <span class="text-[#666] text-sm">SKU: ${data.sku}</span>
    </div>
  `;

  // Thêm ảnh dự phòng nếu cần
  while (data.images.length < 3) {
    data.images.push("https://placehold.co/400");
  }

  // Tạo slider
  let slideElement = document.createElement("div");
  slideElement.classList.add("your-slider", "col-span-2");
  let wrap = '';
  data.images.forEach((item) => {
    wrap += `
      <div><img src="${item}" class="w-full transition-transform hover:scale-110" alt="Slide 1"></div>
    `;
  });
  slideElement.innerHTML = wrap;
  main.appendChild(slideElement);

  // Khởi tạo Slick slider
  $('.your-slider').slick({
    dots: true,
    arrows: false,
    customPaging: function(slider, i) {
      return '<img src="' + data.images[i] + '" alt="Slide ' + (i + 1) + '" />';
    },
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  });

  let containImage = document.querySelectorAll(".slick-dots li img")
  containImage[0].style.outline= "1px solid #fcb800"
  containImage.forEach((item) => {
    item.addEventListener("click", function() {
      containImage.forEach(img => img.style.outline = "1px solid #66666642");
      this.style.outline = "1px solid #fcb800";
    });
  });
}

searchInput.addEventListener("input", debounce(async () => {
    const query = searchInput.value.toLowerCase();
    searchResults.classList.remove("hidden");
    overlay.classList.remove("hidden");

    const productData = await getAll("products");
    const products = productData.products;
    searchResults.innerHTML = "";

    if (query) {
      const filteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(query)
      );

      if (filteredProducts.length > 0) {
        filteredProducts.forEach((product) => {
          const resultItem = document.createElement("a");
          resultItem.setAttribute(
            "href",
            `./pages/product-detail.html?id=${product.id}`
          );
          resultItem.className = "result-item flex items-center";
          resultItem.innerHTML = `
            <img src="${product.thumbnail}" alt="${product.title}"/>
            <span>${product.title}</span>
          `;
          searchResults.appendChild(resultItem);
        });
      } else {
        const noResultItem = document.createElement("div");
        noResultItem.className = "text-center p-4";
        noResultItem.style.paddingBlock = "10px";
        noResultItem.innerHTML = "<span>Không có kết quả</span>";
        searchResults.appendChild(noResultItem);
      }
    } else {
      overlay.classList.add("hidden");
    }
  }, 300)
);


function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

overlay.addEventListener("click", () => {
  searchInput.value = "";
  searchResults.innerHTML = "";
  overlay.classList.add("hidden");
});
