import { getParams } from "./utils.js";
import { getAll} from "./service.js";

const path = document.querySelector(".path");
const increase = document.querySelector(".increase");
const desc = document.querySelector(".desc");
const fillByRating = document.querySelector(".fillRating");
const numberProduct = document.querySelector("#number_product");
const mainMenu = document.querySelector(".main");
const gallery = document.querySelector(".gallery");
const list = document.querySelector(".list");
const searchProduct = document.querySelector("input[name='search_product']");

let isGallery = false;
let isIncreas = false;
let isDesc = false;
let currentPage = 1;
let rating;

(async () => {
  const data = await getAll(`products/category/${getParams("category")}`);
  console.log(data);
  numberProduct.textContent = data.products.length;
  renderpath();
  checkboxPrice(data);
  renderFillByRating(data);
  updateClasses(data); 
  gallery.addEventListener("click", () => updateClasses(data));
  list.addEventListener("click", () => updateClasses(data));
})();

const updateClasses = (data) => {
  searchProduct.value="";
  isGallery = !isGallery;
  gallery.classList.toggle("text-[#292828]", isGallery);
  list.classList.toggle("text-[#807b7b]", isGallery);
  gallery.classList.toggle("text-[#807b7b]", !isGallery);
  list.classList.toggle("text-[#292828]", !isGallery);
  if (isDesc) renderProductDesc(data.products)
  else if (isIncreas) renderProductIncrease(data.products)
  else renderProducts(currentPage, data.products);

};

searchProduct.addEventListener("input", function(e){
    const datafilter = data.products.filter((item)=> item.title.toLowerCase().includes(e.target.value.toLowerCase()))
    renderProducts(currentPage, datafilter)
});


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
    renderCheckPrice(data, increase)
  );
  desc.addEventListener("click", () => renderCheckPrice(data, desc));
}

function renderCheckPrice(data, element) {
  if (element.children[0].children[0].style.display === "block") {
    element.children[0].children[0].style.display = "none";
  } else {
    increase.children[0].children[0].style.display = "none";
    desc.children[0].children[0].style.display = "none";
    element.children[0].children[0].style.display = "block";
  }
  if(element.classList[0] === "increase"){
    isIncreas = !isIncreas;
    if (isDesc) isDesc = false
    if(isIncreas)
    {
      renderProductIncrease(data.products)
    } else renderProducts(currentPage, data.products)
  }else{
    isDesc = !isDesc;
    if (isIncreas) isIncreas=false;
    if(isDesc){
      renderProductDesc(data.products)
    } else renderProducts(currentPage, data.products)
  }
}

function renderProductIncrease(data){
  const newData = [...data]
  console.log(newData)
  newData.sort((a, b) => a.price - b.price);
    renderProducts(currentPage, newData)
}

function renderProductDesc(data){
  const newData = [...data]
  newData.sort((a, b) => b.price - a.price);
    renderProducts(currentPage, newData)
}

function renderFillByRating(data) {
  for (let i = 1; i <= 5; i++) {
    let star = "";
    const divElement = document.createElement("div");
    divElement.classList.add(
      "check_star",
      "cursor-pointer",
      "flex",
      "items-center",
      "mb-2",
      "w-max",
      "select-none"
    );

    const checkboxHTML = `
      <div class="square size-4 bg-white flex items-center border border-[#666666] text-[#fcb800] cursor-pointer mr-3" id="check-${i}">
        <i class="ri-check-line hidden"></i> 
      </div>
    `;

    for (let j = 1; j <= i; j++) {
      star += `<span class="text-[gold] mr-1">★</span>`;
    }

    for (let k = 5; k > i; k--) {
      star += `<span class="text-gray-400 mr-1">★</span>`;
    }

    divElement.innerHTML = checkboxHTML + star;
    fillByRating.appendChild(divElement);
  }

  const checkStar = document.getElementsByClassName("check_star");
  Array.from(checkStar).forEach((item, index) => {
    item.addEventListener("click",() => iconCheck(item, index, data));
  });
}

function iconCheck(item, index, data){
  const checkedIcon = item.querySelector(".ri-check-line");

      if (checkedIcon.classList.contains("hidden")) {
        checkedIcon.classList.remove("hidden");
        checkedIcon.classList.add("block");
      } else {
        checkedIcon.classList.remove("block");
        checkedIcon.classList.add("hidden");
        renderProductsByStar(-1, data);
        return
      }

      renderProductsByStar(index, data);
}

function renderProductsByStar(index, data){
  let newData;
  if (index === -1){
  newData = [...data.products]
  } else {
    rating = index
    newData = data.products.filter((item) => Math.floor(item.rating) === rating + 1)
  }
  if (isDesc) renderProductDesc(newData)
  else if (isIncreas) renderProductIncrease(newData)
  else renderProducts(currentPage, newData)
}

function renderProducts(page, data) {
  if (data.length === 0){
    mainMenu.innerHTML = `<p class='text-center text-xl col-span-4 font-semibold'>Không tìm thấy sản phẩm nào 😞</p>`
    updatePagination(data, 0);
    return
  } 
  const perPage = isGallery ? 8 : 4;
  mainMenu.classList.toggle("grid-cols-1", !isGallery)
  mainMenu.classList.toggle("grid-cols-4", isGallery)
  mainMenu.innerHTML = "";
  const start = (page - 1) * perPage;
  const end = start + perPage;
  const productsToDisplay = data.slice(start, end);

  productsToDisplay.forEach((item) => {
    let star = renderStar(item);
    const divElement = document.createElement("a");
    divElement.setAttribute("href", `./product-detail.html?id=${item.id}`);

    divElement.classList.add(
      "p-3",
      "hover:outline",
      "hover:outline-[1px]",
      "hover:outline-[#c0c0c0]",
      "relative",
      );
    if(isGallery){
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
    `;}else{
      divElement.classList.add("flex", "items-start", "justify-between")
      divElement.innerHTML = /*html */ `
        <div class="contain_img w-1/6">
          <img src="${item.thumbnail}" class=""/>
        </div>  
        <div class="w-[60%]">
          <h3>${item.title}</h3>
          <p>${star}</p>
          <ul class="list-disc list-inside text-[#666666] text-xs my-3">
            <li class="py-1">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam dolorem blanditiis nesciunt! 
            </li>
            <li class="py-1">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam dolorem blanditiis nesciunt! 
            </li>
            <li class="py-1">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam dolorem blanditiis nesciunt! 
            </li>
            <li class="py-1">
            ${item.description}
            </li>
          </ul>
        </div>    
        <div>
        <p class="flex items-center gap-2"><span class="line-through text-sm">$${(
          item.price /
          (1 - item.discountPercentage / 100)
        ).toFixed(2)}</span>
        <span class="text-[#F5912C] text-xl font-semibold">$${item.price}</span></p>
        <button class="font-semibold rounded-md bg-[#fcb800] py-2 px-5 mt-3">Chi tiết sản phẩm</button>
        </div>
        <span class="bg-[#f14705] block px-3 w-max rounded text-white font-bold absolute left-1 top-1">-${item.discountPercentage}%</span>
      `
    }

    mainMenu.appendChild(divElement);

    updatePagination(data, perPage);
  });
}

function updatePagination(data, perPage) {
  const pagination = document.querySelector(".pagination");
  pagination.innerHTML = "";

  const totalPages = Math.ceil(data.length / perPage);

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
