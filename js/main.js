import { getAll, getById, removeById, updateById } from "./service.js";
import initializeSlider from "./slide.js";

const categoryLeft = document.querySelector(".category-left");
const categoryRight = document.querySelector(".category-right");
const saleProduct = document.querySelector(".sale-product");
const searchInput = document.getElementById("search-input");
const searchResults = document.getElementById("search-results");
const overlay = document.getElementById("overlay");
const selectClothes = document.querySelector(".select-clothes");
const selectTech = document.querySelector(".select-tech")
const category = await getAll("products/category-list");
const data = await getAll("products");
const products = data.products;
const categories = [
  '<i class="ri-brush-line"></i>',
  '<i class="ri-store-2-line"></i>',
  '<i class="ri-sofa-line"></i>',
  '<i class="ri-shopping-basket-line"></i>',
  '<i class="ri-home-line"></i>',
  '<i class="ri-bowl-line"></i>',
  '<i class="ri-macbook-line"></i>',
  '<i class="ri-shirt-line"></i>',
  '<i class="ri-footprint-line"></i>',
  '<i class="ri-time-line"></i>',
  '<i class="ri-phone-line"></i>',
  '<i class="ri-motorbike-line"></i>',
  '<i class="ri-creative-commons-by-line"></i>',
  '<i class="ri-smartphone-line"></i>',
  '<i class="ri-football-line"></i>',
  '<i class="ri-glasses-2-line"></i>',
  '<i class="ri-tablet-line"></i>',
  '<i class="ri-t-shirt-line"></i>',
  '<i class="ri-car-line"></i>',
  '<i class="ri-handbag-line"></i>',
  '<i class="ri-t-shirt-2-line"></i>',
  '<i class="ri-vip-diamond-line"></i>',
  '<i class="ri-women-line"></i>',
  '<i class="ri-timer-2-line"></i>',
];

const productsPerPage = 10; 
let currentPage = 1;

function renderCategory() {
  category.forEach((e, index) => {
    const liElement = document.createElement("li");
    // liElement.classList.add("m-3")
    liElement.innerHTML = /*html */ `
		<a class="flex" href="/pages/category.html?category=${e}">
			${categories[index]}
			<span>${e.split("-").join(" ")}</span>
		</a>
		`;
    index < category.length / 2
      ? categoryLeft.appendChild(liElement)
      : categoryRight.appendChild(liElement);
  });
}

function renderHotSale(data) {
  const arrIndex = [];
  const max = data.length - 1;
  const min = 0;
  for (let i = 0; i < 5; i++) {
    let index = Math.floor(Math.random() * (max - min) + min);
    arrIndex.push(index);
  }
  arrIndex.forEach((index) => {
    const alcorElement = document.createElement("a");
    alcorElement.setAttribute("href", "google.com");
    alcorElement.classList.add("item_sale");
    alcorElement.innerHTML = /*html */ `
            <div class='contain_img'>
                <img src="${data[index].thumbnail}"/>
            </div>
            <div class='contain_desc'>
                <h4>${data[index].title.slice(0, 20)}</h4>
                <p><span>$${(
                  data[index].price /
                  (1 - data[index].discountPercentage / 100)
                ).toFixed(2)}</span>
                <span>$${data[index].price}</span></p>
            </div>
            
        `;
    saleProduct.appendChild(alcorElement);
  });
}

function renderHotItem(page) {
  const hotItem = document.querySelector(".hot_item");
  hotItem.innerHTML = ""; // Xóa nội dung cũ

  const start = (page - 1) * productsPerPage;
  const end = start + productsPerPage;
  const productsToDisplay = data.products.slice(start, end);

  productsToDisplay.forEach((product) => {
    const divElement = document.createElement("div");
    divElement.innerHTML = /*html */ `
        <div class='contain_img'>
          <img src="${product.thumbnail}"/>
        </div>
        <div class='content_box'>
          <h3 class="font-semibold text-xl">${product.title}</h3>
          <div class="price flex justify-between items-center">
            <span>$${product.price}</span>
            <div class="rating">
              <span class="text-[gold] text-xl">★</span>
              <span>${product.rating} (${product.reviews.length})</span>
            </div>
          </div>
        </div>
      `;
    hotItem.appendChild(divElement);
  });

  updatePagination();
}

function updatePagination() {
  const pagination = document.querySelector(".pagination");
  pagination.innerHTML = "";

  const totalPages = Math.ceil(data.products.length / productsPerPage);
  
  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement("button");
    button.innerHTML = i === currentPage ? `<span>${i}</span>` : `${i}`;
    button.className = "page-btn";
    button.addEventListener("click", () => {
      currentPage = i;
      renderHotItem(currentPage);
    });
    pagination.appendChild(button);
  }
}

// Lắng nghe sự kiện input
searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  searchResults.innerHTML = "<i class='ri-triangle-fill'></i>";
  searchResults.classList.remove("hidden");
  overlay.classList.remove("hidden");

  if (query) {
    const filteredProducts = products.filter((product) =>
      product.title.toLowerCase().includes(query)
    );

    if (filteredProducts.length > 0) {
      filteredProducts.forEach((product) => {
        const resultItem = document.createElement("div");
        resultItem.className = "result-item flex items-center";
        resultItem.innerHTML = `
                  <img src="${product.thumbnail}" alt="${product.title}"/>
                  <span>${product.title}</span>
              `;
        resultItem.addEventListener("click", () => {
          console.log("hello");
        });
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
});

overlay.addEventListener("click", () => {
  searchInput.value = "";
  searchResults.innerHTML = "";
  overlay.classList.add("hidden");
});

async function renderClothes(data, dataSugget, fquery, squery) {
  const element = document.querySelector(fquery);
  data.products.forEach((item) => {
    let star = "";
    const divElement = document.createElement("a");
    divElement.classList.add("clothes_item");
    for (let i = 1; i <= item.rating; i++) {
      star += `<span class="text-[gold] text-xl">★</span>`;
    }
    if (item.rating < 5) {
      const result = 5 - Math.floor(item.rating);
      for (let i = 1; i <= result; i++) {
        star += `<span class="text-xl">★</span>`;
      }
    }
    divElement.innerHTML = /*html */ `
      <img src="${item.thumbnail}"/>
      <h3>${item.title}</h3>
      <p>${star}</p>
      <p>$${item.price}</p>
    `;

    element.appendChild(divElement);
  });

  const elementSuget = document.querySelector(squery);
  dataSugget.products.forEach((item) => {
    const divElement2 = document.createElement("div");
    divElement2.classList.add("flex", "cursor-pointer", "contain-sug");
    divElement2.innerHTML = `
      <div class="wrap-img-sug">
        <img src="${item.thumbnail}" class="object-cover"/>
      </div>
      <div>
        <h5>${item.title}</h5>
        <p>$${item.price}</p>
      </div>
    `;
    elementSuget.appendChild(divElement2);
  });
}

Array.from(selectClothes.children).forEach((item) => {
  item.addEventListener("click", () => {
    Array.from(selectClothes.children).forEach((child) => {
      child.classList.remove("opacity-100");
      child.classList.add("opacity-45");
    });

    item.classList.add("opacity-100");
  });
});

$(document).ready(function () {
  initializeSlider(".slider");
});

Array.from(selectTech.children).forEach((item) => {
  item.addEventListener("click", () => {
    Array.from(selectTech.children).forEach((child) => {
      child.classList.remove("opacity-100");
      child.classList.add("opacity-45");
    });

    item.classList.add("opacity-100");
  });
});
$(document).ready(function () {
  initializeSlider(".slider");
});


renderCategory();
renderHotSale(data.products);
renderHotItem(currentPage);
renderClothes(await getAll("products/category/mens-shirts"), await getAll("products/category/womens-dresses"), ".product-clothes", ".product_list");
renderClothes(await getAll("products/category/smartphones?limit=5"), await getAll("products/category/laptops?limit=5"), ".product-mobile", ".product_list_tech");

