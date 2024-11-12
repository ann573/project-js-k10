import { getAll, getById} from "./service.js";
import { getParams } from "./utils.js";

const searchInput = document.getElementById("search-input");
const searchResults = document.getElementById("search-results");
const titleProduct = document.querySelector(".title_product");

const overlay = document.getElementById("overlay");
const path = document.querySelector(".path");

(async () => {
  const data = await getById("products", getParams("id"));
  renderpath(data);
  renderInformartion(data);
  renderRating(data);
  renderReviews(data);
  renderSameProduct(data);
})();

function renderpath(data) {
  path.innerHTML = /*html*/ `
        <a href="../index.html" class="text-[#09c] hover:text-[#fcb800] transition-colors">Home</a> /
        <a href="./category.html?category=${data.category}" class="text-[#09c] hover:text-[#fcb800] transition-colors capitalize">${data.category}</a> /
        <span>${data.title}</span>

    `;
}

function renderInformartion(data) {
  const main = document.querySelector(".main");
  const titleProduct = document.querySelector(".title_product"); // Đảm bảo xác định phần tử này
  let star = renderStar(data)

  titleProduct.innerHTML = /*html*/ `
    <h1 class="text-2xl mb-1">${data.title}</h1>
    <div class="flex items-center">
      <span class="text-sm">${star}</span>
      <a href="#" class="relative text-[#666] text-sm ml-1 mr-10 after:absolute after:-right-5 after:top-[3px] after:h-3/4 after:w-px after:bg-[#66666669] after:content-['']"> ( ${data.reviews.length} reviews )
      </a>
      <span class="text-[#666] text-sm">SKU: ${data.sku}</span>
    </div>
  `;

  // Thêm ảnh dự phòng nếu cần
  while (data.images.length < 3) {
    data.images.push("https://placehold.co/300");
  }

  // Tạo slider
  let slideElement = document.createElement("div");
  slideElement.classList.add("my-slider", "col-span-2");
  let wrap = "";
  data.images.forEach((item) => {
    wrap += `
      <div><img src="${item}" class="size-[504px] object-contain transition-transform hover:scale-110" alt="Slide 1"></div>
    `;
  });
  slideElement.innerHTML = wrap;
  main.appendChild(slideElement);

  $(".my-slider").slick({
    dots: true,
    arrows: false,
    customPaging: function (slider, i) {
      return '<img src="' + data.images[i] + '" alt="Slide ' + (i + 1) + '" />';
    },
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  });

  let containImage = document.querySelectorAll(".slick-dots li img");
  containImage[0].style.outline = "1px solid #fcb800";
  containImage.forEach((item) => {
    item.addEventListener("click", function () {
      containImage.forEach(
        (img) => (img.style.outline = "1px solid #66666642")
      );
      this.style.outline = "1px solid #fcb800";
    });
  });

  const information = document.createElement("div");
  information.classList.add("col-span-3");
  information.innerHTML = /*html */ `
  <p class="flex items-center mt-5 gap-2"><span class="line-through text-sm">$${(
    data.price /
    (1 - data.discountPercentage / 100)
  ).toFixed(2)}</span>
  <span class="font-semibold text-2xl">$${data.price}</span>
  <span class="text-sm text-gray-800 font-light">(${
    data.discountPercentage
  }%)</span></p>
  <p class="text-[15px] my-3">
  Status: ${data.availabilityStatus === "In Stock" 
    ? `<span class="text-green-800 font-semibold">${data.availabilityStatus}</span>`
    : `<span class="text-red-500 font-semibold">${data.availabilityStatus}</span>`
  }
</p>

  <hr/>
  <ul class="list-disc list-inside text-[#666666] text-[14px] my-3">
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
    ${data.description}
    </li>
  </ul>
  <hr/>
  <p class="text-[15px] my-3">Tags: <span class="text-[#666666]">${data.tags.join(
    ", "
  )}</span></p>
  <form method="#">
  <div class="flex gap-1 border box-border w-[5.5rem]">
  <button id="minus" class="bg-gray-200 text-gray-700 p-2 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500">
  -
</button>
  <input type="number" min="1" max="${data.stock}" value="0" class="remove-arrow w-full text-center focus:outline-none"/>
<button id="plus" class="bg-gray-200 text-gray-700 p-2  hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500">
  +
</button>
  </div>
  
  <div class="flex gap-2 mt-5">
  <input type="submit" class="w-1/4 border rounded-md py-2 px-5 font-semibold bg-red-600 text-white cursor-pointer hover:opacity-80" value="Thêm vào giỏ hàng"/>
  <input type="submit" class="w-1/3 border rounded-md py-2 px-5 font-semibold bg-[#fcb800] cursor-pointer hover:opacity-80" value="Mua ngay"/>
  </div>
  </form>
  `;

  main.appendChild(information);
  const plusBtn = document.querySelector("#plus")
  const minusBtn = document.querySelector("#minus")
  const quantity = document.querySelector("input[type='number']")
  plusBtn.addEventListener("click", ()=>{
    event.preventDefault()
    quantity.value++
    if (quantity.value >= data.stock){
      quantity.value = data.stock
    }
  })
  minusBtn.addEventListener("click", ()=>{
    event.preventDefault()
    quantity.value--
    if(quantity.value < 1){
      quantity.value = 1
    }
  })
}

function renderRating(data){
  const numberRating = document.querySelector(".number_rating");

  let content ='';
  let star = renderStar(data)
  const barStar = renderBarStar(data);
  content += /* html*/ `  
    <h5 class="text-xl">Average Rating</h5>
    <p class="text-[#669900] text-6xl my-3">${data.rating}</p>
    <span class="text-2xl">${star}</span>
    <p class="text-sm text-[#666666] mb-5">${data.reviews.length} Reviews</p>
    <div class="max-w-full">
      ${barStar}
    </div>
  `
  numberRating.innerHTML = content
}

function renderReviews(data){
  const total = document.querySelector(".total_reviews")
  const reviews = document.querySelector(".user-review")

  total.textContent = `Có ${data.reviews.length} lượt đánh giá cho sản phẩm này`
  let content = '';
  data.reviews.forEach((item)=>{
    const date = new Date(item.date);

const day = date.getDate(); 
const month = date.getMonth() + 1; 
const year = date.getFullYear(); 
const formattedDate = `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year}`;
    content += /*html */ `
      <div class="my-10 flex gap-7 max-h-[410px] scroll-auto">
        <div>
        <img src="../public/assests/img/user.png" class="w-16 bg-white rounded-full object-cover"/>
        </div>
        <div>
          <p>${renderStar(item)}</p>
          <div class="flex mt-1 mb-5">
            <p class="text-sm text-[#666666] ">By <span class="cursor-pointer hover:text-blue-400">${item.reviewerName}</span> | <span class="ml-3">${formattedDate}</span></p>
          </div>
          <p>${item.comment}</p>
        </div>
      </div>
      <hr>
    `
  })
  reviews.innerHTML = content
}

async function renderSameProduct(data) {
  const listSameProducts = document.querySelector(".same_products")
  const sameProduct = await getAll(`products/category/${data.category}`)
  sameProduct.products.slice(0,5).forEach((item) => {
    const alcorElement = document.createElement("a");
    alcorElement.setAttribute("href", `./product-detail.html?id=${item.id}`);
    alcorElement.classList.add("item_sale");
    alcorElement.innerHTML = /*html */ `
            <div class='contain_img'>
                <img src="${item.thumbnail}"/>
            </div>
            <div class='contain_desc'>
                <h4 class="text-xl font-semibold my-2">${item.title.slice(0, 20)}</h4>
                <p><span class="line-through text-sm">$${( 
                  item.price /
                  (1 - item.discountPercentage / 100)
                ).toFixed(2)}</span>
                <span class="text-[#f5912c] font-semibold text-xl">$${item.price}</span></p>
            </div>
            
        `;

       listSameProducts.appendChild(alcorElement);
  });
}

searchInput.addEventListener(
  "input",
  debounce(async () => {
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
            `./product-detail.html?id=${product.id}`
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

function renderStar(data){
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
  return star
}

function renderBarStar(data) {
  const starCount = [0, 0, 0, 0, 0]; 
  
  data.reviews.forEach(item => {
    if (item.rating >= 1 && item.rating <= 5) {
      starCount[item.rating - 1]++;
    }
  });

  const totalReviews = data.reviews.length;
  const percentages = starCount.map(count => ((count / totalReviews) * 100).toFixed(2));


  function renderProgressBar(percentage, label) {
    return `
      <div class="flex items-center gap-4 text-[#666666] text-sm my-2">${label} Star
        <div class="w-1/3 h-2 bg-[#f1f1f1] relative rounded-md">
          <span class="absolute top-0 inline-block h-2 bg-green-500 rounded-md" style="width: ${percentage}%;"></span>
        </div>
        ${percentage}%
      </div>
    `;
  }

  const content = percentages.map((percentage, index) => renderProgressBar(percentage, index+1)).join('');
  
  return content;
}

