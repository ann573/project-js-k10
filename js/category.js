import { getParams } from "./utils.js";
import { getAll, getById } from "./service.js";

const path = document.querySelector(".path");
const fillByRating = document.querySelector(".fillRating");
const checkPrice = document.querySelectorAll(".square_price");
(async () => {
  const data = await getAll(`products/category/${getParams("category")}`);
  console.log(data);
  renderpath();
  checkboxPrice(data);
  renderFillByRating();
  renderInformartion(data);
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

function checkboxPrice(data){
  checkPrice.forEach((item)=>{
    item.addEventListener("click", function(){
      checkPrice.forEach((box)=>{
        box.children[0].style.display = "none"
      })
      this.children[0].style.display = "block"
    })
  })
}

function renderFillByRating() {
  for (let i = 1; i <= 5; i++) {
    let star = "";
    const divElement = document.createElement("div");
    divElement.classList.add("cursor-pointer", "flex", "items-center", "mb-2");

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

    // Thêm sự kiện click cho ô checkbox
    const checkbox = divElement.querySelector('.square');
    checkbox.addEventListener("click", function() {
      const icon = checkbox.querySelector('.ri-check-line');
      if (icon.style.display === "none") {
        icon.style.display = "block"; 
      } else {
        icon.style.display = "none"; 
      }
    });

    fillByRating.appendChild(divElement);
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
