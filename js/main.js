import { getAll, getById, removeById, updateById } from "./service.js";
import { getParams } from "./utils.js";
import initializeSlider from "./slide.js";

const categoryLeft = document.querySelector(".category-left");
const categoryRight = document.querySelector(".category-right");
const saleProduct = document.querySelector(".sale-product");
const category = await getAll("products/category-list");
const data = await getAll("products");
console.log(data.products);
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

function renderCategory() {
  category.forEach((e, index) => {
    const liElement = document.createElement("li");
    // liElement.classList.add("m-3")
    liElement.innerHTML = /*html */ `
		<a class="flex">
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
    alcorElement.setAttribute("href","google.com");
    alcorElement.classList.add("item_sale")
    alcorElement.innerHTML = /*html */ `
            <div class='contain_img'>
                <img src="${data[index].thumbnail}"/>
            </div>
            <div class='contain_desc pl-2'>
                <h4>${data[index].title.slice(0,20)}</h4>
                <p><span>$${(
                data[index].price /
                (1 - data[index].discountPercentage /100)
                ).toFixed(2)}</span>
                <span>$${data[index].price}</span></p>
            </div>
            
        `;
    saleProduct.appendChild(alcorElement);
  });
}
$(document).ready(function () {
  initializeSlider(".slider");
});
renderCategory();
renderHotSale(data.products);
