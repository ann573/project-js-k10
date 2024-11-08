import {getParams} from "./utils.js"
import { getAll, getById} from "./service.js";

const path = document.querySelector(".path");

(async () => {
    const data = await getAll(`products/category/${getParams("category")}`);
    renderpath(data);
    renderInformartion(data);
    renderRating(data);
    renderReviews(data);
    renderSameProduct(data);
  })();

  function renderpath(data) {
    path.innerHTML = /*html*/ `
          <a href="../index.html" class="text-[#09c] hover:text-[#fcb800] transition-colors">Home</a> /
          <span class="capitalize">${getParams("category").split("-").join(" ")}</span>
      `;
    data.products.forEach(element => {
        console.log(element)
    });
  }