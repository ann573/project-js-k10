import"./modulepreload-polyfill-B5Qt9EMX.js";import{a as x,g as v}from"./service-CGqyXxcI.js";import{g as y}from"./utils-D9frBmc6.js";const f=document.getElementById("search-input"),c=document.getElementById("search-results");document.querySelector(".title_product");const p=document.getElementById("overlay"),b=document.querySelector(".path");(async()=>{const e=await x("products",y("id"));w(e),L(e),S(e),E(e),T(e)})();function w(e){b.innerHTML=`
        <a href="../index.html" class="text-[#09c] hover:text-[#fcb800] transition-colors">Home</a> /
        <a href="../pages/category.html?category=${e.category}" class="text-[#09c] hover:text-[#fcb800] transition-colors capitalize">${e.category}</a> /
        <span>${e.title}</span>

    `}function L(e){const i=document.querySelector(".main"),n=document.querySelector(".title_product");let s=h(e);for(n.innerHTML=`
    <h1 class="text-2xl mb-1">${e.title}</h1>
    <div class="flex items-center">
      <span class="text-sm">${s}</span>
      <a href="#" class="relative text-[#666] text-sm ml-1 mr-10 after:absolute after:-right-5 after:top-[3px] after:h-3/4 after:w-px after:bg-[#66666669] after:content-['']"> ( ${e.reviews.length} reviews )
      </a>
      <span class="text-[#666] text-sm">SKU: ${e.sku}</span>
    </div>
  `;e.images.length<3;)e.images.push("https://placehold.co/300");let t=document.createElement("div");t.classList.add("my-slider","col-span-2");let l="";e.images.forEach(d=>{l+=`
      <div><img src="${d}" class="w-full transition-transform hover:scale-110" alt="Slide 1"></div>
    `}),t.innerHTML=l,i.appendChild(t),$(".my-slider").slick({dots:!0,arrows:!1,customPaging:function(d,u){return'<img src="'+e.images[u]+'" alt="Slide '+(u+1)+'" />'},speed:500,slidesToShow:1,slidesToScroll:1});let r=document.querySelectorAll(".slick-dots li img");r[0].style.outline="1px solid #fcb800",r.forEach(d=>{d.addEventListener("click",function(){r.forEach(u=>u.style.outline="1px solid #66666642"),this.style.outline="1px solid #fcb800"})});const o=document.createElement("div");o.classList.add("col-span-3"),o.innerHTML=`
  <p class="flex items-center mt-5 gap-2"><span class="line-through text-sm">$${(e.price/(1-e.discountPercentage/100)).toFixed(2)}</span>
  <span class="font-semibold text-2xl">$${e.price}</span>
  <span class="text-sm text-gray-800 font-light">(${e.discountPercentage}%)</span></p>
  <p class="text-[15px] my-3">Status: <span class="text-green-800 font-semibold">${e.availabilityStatus}</span></p> 
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
    ${e.description}
    </li>
  </ul>
  <hr/>
  <p class="text-[15px] my-3">Tags: <span class="text-[#666666]">${e.tags.join(", ")}</span></p>
  <form method="#">
  <div class="flex space-x-4 border box-border w-[5.5rem]">
  <button id="minus" class="bg-gray-200 text-gray-700 p-2 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500">
  -
</button>
  <input type="tel" min="1" value="1" class="w-full" />
<button id="plus" class="bg-gray-200 text-gray-700 p-2  hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500">
  +
</button>
  </div>
  
  <div class="flex gap-2 mt-5">
  <input type="submit" class="w-1/4 border rounded-md py-2 px-5 font-semibold bg-red-600 text-white cursor-pointer hover:opacity-80" value="Thêm vào giỏ hàng"/>
  <input type="submit" class="w-1/3 border rounded-md py-2 px-5 font-semibold bg-[#fcb800] cursor-pointer hover:opacity-80" value="Mua ngay"/>
  </div>
  </form>
  `,i.appendChild(o);const m=document.querySelector("#plus"),g=document.querySelector("#minus"),a=document.querySelector("input[type='tel']");m.addEventListener("click",()=>{event.preventDefault(),a.value++}),g.addEventListener("click",()=>{event.preventDefault(),a.value--,a.value<1&&(a.value=1)})}function S(e){const i=document.querySelector(".number_rating");let n="",s=h(e);const t=M(e);n+=`  
    <h5 class="text-xl">Average Rating</h5>
    <p class="text-[#669900] text-6xl my-3">${e.rating}</p>
    <span class="text-2xl">${s}</span>
    <p class="text-sm text-[#666666] mb-5">${e.reviews.length} Reviews</p>
    <div class="max-w-full">
      ${t}
    </div>
  `,i.innerHTML=n}function E(e){const i=document.querySelector(".total_reviews"),n=document.querySelector(".user-review");i.textContent=`Có ${e.reviews.length} lượt đánh giá cho sản phẩm này`;let s="";e.reviews.forEach(t=>{const l=new Date(t.date),r=l.getDate(),o=l.getMonth()+1,m=l.getFullYear(),g=`${r<10?"0"+r:r}/${o<10?"0"+o:o}/${m}`;s+=`
      <div class="my-10 flex gap-7 max-h-[410px] scroll-auto">
        <div>
        <img src="../assests/img/user.png" class="w-16 bg-white rounded-full object-cover"/>
        </div>
        <div>
          <p>${h(t)}</p>
          <div class="flex my-5">
            <p class="text-sm text-[#666666]">By ${t.reviewerName} | <span class="ml-3">${g}</span></p>
          </div>
          <p>${t.comment}</p>
        </div>
      </div>
    `}),n.innerHTML=s}async function T(e){const i=document.querySelector(".same_products");(await v(`products/category/${e.category}`)).products.slice(0,5).forEach(s=>{const t=document.createElement("a");t.setAttribute("href",`./product-detail.html?id=${s.id}`),t.classList.add("item_sale"),t.innerHTML=`
            <div class='contain_img'>
                <img src="${s.thumbnail}"/>
            </div>
            <div class='contain_desc'>
                <h4 class="text-xl font-semibold my-2">${s.title.slice(0,20)}</h4>
                <p><span class="line-through text-sm">$${(s.price/(1-s.discountPercentage/100)).toFixed(2)}</span>
                <span class="text-[#f5912c] font-semibold text-xl">$${s.price}</span></p>
            </div>
            
        `,i.appendChild(t)})}f.addEventListener("input",q(async()=>{const e=f.value.toLowerCase();c.classList.remove("hidden"),p.classList.remove("hidden");const n=(await v("products")).products;if(c.innerHTML="",e){const s=n.filter(t=>t.title.toLowerCase().includes(e));if(s.length>0)s.forEach(t=>{const l=document.createElement("a");l.setAttribute("href",`./product-detail.html?id=${t.id}`),l.className="result-item flex items-center",l.innerHTML=`
            <img src="${t.thumbnail}" alt="${t.title}"/>
            <span>${t.title}</span>
          `,c.appendChild(l)});else{const t=document.createElement("div");t.className="text-center p-4",t.style.paddingBlock="10px",t.innerHTML="<span>Không có kết quả</span>",c.appendChild(t)}}else p.classList.add("hidden")},300));function q(e,i){let n;return function(...s){n&&clearTimeout(n),n=setTimeout(()=>{e.apply(this,s)},i)}}p.addEventListener("click",()=>{f.value="",c.innerHTML="",p.classList.add("hidden")});function h(e){let i="";for(let n=1;n<=e.rating;n++)i+='<span class="text-[gold] mr-1">★</span>';if(e.rating<5){const n=5-Math.floor(e.rating);for(let s=1;s<=n;s++)i+='<span class="text-gray-400 mr-1">★</span>'}return i}function M(e){const i=[0,0,0,0,0];e.reviews.forEach(r=>{r.rating>=1&&r.rating<=5&&i[r.rating-1]++});const n=e.reviews.length,s=i.map(r=>(r/n*100).toFixed(2));function t(r,o){return`
      <div class="flex items-center gap-4 text-[#666666] text-sm my-2">${o} Star
        <div class="w-1/3 h-2 bg-[#f1f1f1] relative rounded-md">
          <span class="absolute top-0 inline-block h-2 bg-green-500 rounded-md" style="width: ${r}%;"></span>
        </div>
        ${r}%
      </div>
    `}return s.map((r,o)=>t(r,o+1)).join("")}
