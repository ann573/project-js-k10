import { getParams } from "./utils.js";
import { getAll, getById } from "./service.js";

const path = document.querySelector(".path");
const increase = document.querySelector(".increase");
const desc = document.querySelector(".desc");
const fillByRating = document.querySelector(".fillRating");
const numberProduct = document.querySelector("#number_product");
const mainMenu = document.querySelector(".main");

let currentPage = 1;
const perPage = 8;

(async () => {
  const data = await getAll(`products/category/${getParams("category")}`);
  console.log(data);
  numberProduct.textContent = data.products.length;
  renderpath();
  checkboxPrice(data);
  renderFillByRating();
  renderProducts(currentPage, data);
  renderReviews(data);
  renderSameProduct(data);
})();

function renderpath() {
  path.innerHTML = /*html*/ `
          <a href="../index.html" class="text-[#09c] hover:text-[#fcb800] transition-colors">Home</a> /
          <span class="capitalize">${getParams("category")
            .split("-")
            .join(" ")}</span>
      `;
}

function checkboxPrice(data) {
  increase.addEventListener("click", () =>
    renderProductByPrice(data, increase)
  );
  desc.addEventListener("click", () => renderProductByPrice(data, desc));
}

function renderProductByPrice(data, element) {
  if (element.children[0].children[0].style.display === "block") {
    element.children[0].children[0].style.display = "none";
  } else {
    increase.children[0].children[0].style.display = "none";
    desc.children[0].children[0].style.display = "none";
    element.children[0].children[0].style.display = "block";
  }
}

function renderFillByRating() {
  for (let i = 1; i <= 5; i++) {
    let star = "";
    const divElement = document.createElement("div");
    divElement.classList.add(
      "cursor-pointer",
      "flex",
      "items-center",
      "mb-2",
      "w-max",
      "select-none"
    );

    const checkboxHTML = `
      <div class="square size-4 bg-white flex items-center border border-[#666666] text-[#fcb800] cursor-pointer mr-3" id="check-${i}">
        <i class="ri-check-line hidden"></i> <!-- Thêm icon check với style display: none ban đầu -->
      </div>
    `;

    // Tạo các sao
    for (let j = 1; j <= i; j++) {
      star += `<span class="text-[gold] mr-1">★</span>`;
    }

    for (let k = 5; k > i; k--) {
      star += `<span class="text-gray-400 mr-1">★</span>`;
    }

    // Kết hợp checkbox và sao trong một dòng
    divElement.innerHTML = checkboxHTML + star;
    fillByRating.appendChild(divElement);

    divElement.addEventListener("click", function () {
      if (this.children[0].children[0].style.display === "block") {
        this.children[0].children[0].style.display = "none";
      } else {
        this.children[0].children[0].style.display = "block";
      }
    });
  }
}

function renderProducts(page, data) {
  mainMenu.innerHTML = "";
  const start = (page - 1) * perPage;
  const end = start + perPage;
  const productsToDisplay = data.products.slice(start, end);

  console.log(productsToDisplay);
  productsToDisplay.forEach((item) => {
    let star = renderStar(item);
    const divElement = document.createElement("a");
    divElement.setAttribute("href", `./product-detail.html?id=${item.id}`);
    divElement.classList.add(
      "p-3",
      "hover:outline",
      "hover:outline-[1px]",
      "hover:outline-[#c0c0c0]",
      "relative"
    );
    divElement.classList.add("clothes_item");
    divElement.innerHTML = /*html */ `
      <img src="${item.thumbnail}"/>
      <h3 class="min-h-12">${item.title}</h3>
      <p>${star}</p>
      <p class="flex items-center gap-2"><span class="line-through text-sm">$${(
        item.price /
        (1 - item.discountPercentage / 100)
      ).toFixed(2)}</span>
      <span class="text-[#F5912C] font-semibold">$${item.price}</span></p>
      <span class="bg-[#f14705] block px-3 w-max rounded text-white font-bold absolute left-1 top-1">-${item.discountPercentage}%</span>
    `;

    mainMenu.appendChild(divElement);

    updatePagination(data);
  });
}

function updatePagination(data) {
  const pagination = document.querySelector(".pagination");
  pagination.innerHTML = "";

  const totalPages = Math.ceil(data.products.length / perPage);

  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement("button");
    button.classList.add("page-btn", "mx-2", "hover:opacity-80");
    button.innerHTML =
      i === currentPage
        ? `<span class="flex justify-center items-center w-5 h-5 rounded-full bg-[#F5912C] text-white">${i}</span>`
        : `${i}`;
    button.addEventListener("click", () => {
      currentPage = i;
      renderProducts(currentPage, data);
      window.scrollTo({
        top: 123,
        left: 0,
        behavior: "smooth",
      });
    });
    pagination.appendChild(button);
  }
}

function renderStar(data) {
  let star = "";
  for (let i = 1; i <= data.rating; i++) {
    star += `<span class="text-[gold] mr-1">★</span>`;
  }

  if (data.rating < 5) {
    const result = 5 - Math.floor(data.rating);
    for (let i = 1; i <= result; i++) {
      star += `<span class="text-gray-400 mr-1">★</span>`;
    }
  }
  return star;
}
