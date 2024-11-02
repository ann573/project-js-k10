import { getAll, getById, removeById, updateById } from "./service.js";
import { getParams } from "./utils.js";
import { initializeSlider } from './slide.js';

const categoryLeft = document.querySelector(".category-left")
const categoryRight = document.querySelector(".category-right")
const category = await getAll("products/category-list")

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
	'<i class="ri-timer-2-line"></i>'
];


function renderCategory(){
	category.forEach((e, index) => {
		const liElement = document.createElement("li")
		// liElement.classList.add("m-3")
		liElement.innerHTML = /*html */ `
		<a class="flex">
			${categories[index]}
			<span>${e.split("-").join(" ")}</span>
		</a>
		` 
		index < (category.length / 2) ? categoryLeft.appendChild(liElement) : categoryRight.appendChild(liElement) 
	});
}

$(document).ready(function() {
    initializeSlider('.slider');
});
renderCategory()