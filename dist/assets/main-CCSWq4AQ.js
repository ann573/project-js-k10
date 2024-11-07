import"./modulepreload-polyfill-B5Qt9EMX.js";import{g as r}from"./service-CGqyXxcI.js";function b(e){$(e).slick({dots:!0,infinite:!0,speed:500,slidesToShow:1,slidesToScroll:1,autoplay:!0,autoplaySpeed:1500})}const T=document.querySelector(".category-left"),w=document.querySelector(".category-right"),M=document.querySelector(".sale-product"),h=document.getElementById("search-input"),o=document.getElementById("search-results"),m=document.getElementById("overlay"),y=document.querySelector(".select-clothes"),v=document.querySelector(".select-tech"),x=['<i class="ri-brush-line"></i>','<i class="ri-store-2-line"></i>','<i class="ri-sofa-line"></i>','<i class="ri-shopping-basket-line"></i>','<i class="ri-home-line"></i>','<i class="ri-bowl-line"></i>','<i class="ri-macbook-line"></i>','<i class="ri-shirt-line"></i>','<i class="ri-footprint-line"></i>','<i class="ri-time-line"></i>','<i class="ri-phone-line"></i>','<i class="ri-motorbike-line"></i>','<i class="ri-creative-commons-by-line"></i>','<i class="ri-smartphone-line"></i>','<i class="ri-football-line"></i>','<i class="ri-glasses-2-line"></i>','<i class="ri-tablet-line"></i>','<i class="ri-t-shirt-line"></i>','<i class="ri-car-line"></i>','<i class="ri-handbag-line"></i>','<i class="ri-t-shirt-2-line"></i>','<i class="ri-vip-diamond-line"></i>','<i class="ri-women-line"></i>','<i class="ri-timer-2-line"></i>'],g=10;let u=1;(async()=>{const e=await r("products/category-list"),s=await r("products");S(e),C(s.products),E(u,s),L(await r("products/category/mens-shirts"),await r("products/category/womens-dresses"),".product-clothes",".product_list"),L(await r("products/category/smartphones?limit=5"),await r("products/category/laptops?limit=5"),".product-mobile",".product_list_tech")})();function S(e){e.forEach((s,c)=>{const i=document.createElement("li");i.innerHTML=`
		<a class="flex" href="/pages/category.html?category=${s}">
			${x[c]}
			<span>${s.split("-").join(" ")}</span>
		</a>
		`,c<e.length/2?T.appendChild(i):w.appendChild(i)})}function C(e){const s=[],c=e.length-1,i=0;for(let t=0;t<5;t++){let a=Math.floor(Math.random()*(c-i)+i);s.push(a)}s.forEach(t=>{const a=document.createElement("a");a.setAttribute("href",`./pages/product-detail.html?id=${e[t].id}`),a.classList.add("item_sale"),a.innerHTML=`
            <div class='contain_img'>
                <img src="${e[t].thumbnail}"/>
            </div>
            <div class='contain_desc'>
                <h4>${e[t].title.slice(0,20)}</h4>
                <p><span>$${(e[t].price/(1-e[t].discountPercentage/100)).toFixed(2)}</span>
                <span>$${e[t].price}</span></p>
            </div>
            
        `,M.appendChild(a)})}function E(e,s){const c=document.querySelector(".hot_item");c.innerHTML="";const i=(e-1)*g,t=i+g;s.products.slice(i,t).forEach(n=>{const l=document.createElement("a");l.setAttribute("href",`./pages/product-detail.html?id=${n.id}`),l.innerHTML=`
        <div class='contain_img'>
          <img src="${n.thumbnail}"/>
        </div>
        <div class='content_box'>
          <h3 class="font-semibold text-xl">${n.title}</h3>
          <div class="price flex justify-between items-center">
            <span>$${n.price}</span>
            <div class="rating">
              <span class="text-[gold] text-xl">★</span>
              <span>${n.rating} (${n.reviews.length})</span>
            </div>
          </div>
        </div>
      `,c.appendChild(l)}),H(s)}function H(e){const s=document.querySelector(".pagination");s.innerHTML="";const c=Math.ceil(e.products.length/g);for(let i=1;i<=c;i++){const t=document.createElement("button");t.innerHTML=i===u?`<span>${i}</span>`:`${i}`,t.className="page-btn",t.addEventListener("click",()=>{u=i,E(u,e)}),s.appendChild(t)}}h.addEventListener("input",q(async()=>{const e=h.value.toLowerCase();o.classList.remove("hidden"),m.classList.remove("hidden");const c=(await r("products")).products;if(o.innerHTML="",e){const i=c.filter(t=>t.title.toLowerCase().includes(e));if(i.length>0)i.forEach(t=>{const a=document.createElement("a");a.setAttribute("href",`./pages/product-detail.html?id=${t.id}`),a.className="result-item flex items-center",a.innerHTML=`
          <img src="${t.thumbnail}" alt="${t.title}"/>
          <span>${t.title}</span>
        `,o.appendChild(a)});else{const t=document.createElement("div");t.className="text-center p-4",t.style.paddingBlock="10px",t.innerHTML="<span>Không có kết quả</span>",o.appendChild(t)}}else m.classList.add("hidden")},300));function q(e,s){let c;return function(...i){c&&clearTimeout(c),c=setTimeout(()=>{e.apply(this,i)},s)}}m.addEventListener("click",()=>{h.value="",o.innerHTML="",m.classList.add("hidden")});async function L(e,s,c,i){const t=document.querySelector(c);e.products.forEach(n=>{let l="";const d=document.createElement("a");d.setAttribute("href",`./pages/product-detail.html?id=${n.id}`),d.classList.add("clothes_item");for(let p=1;p<=n.rating;p++)l+='<span class="text-[gold] text-xl">★</span>';if(n.rating<5){const p=5-Math.floor(n.rating);for(let f=1;f<=p;f++)l+='<span class="text-xl">★</span>'}d.innerHTML=`
      <img src="${n.thumbnail}"/>
      <h3>${n.title}</h3>
      <p>${l}</p>
      <p>$${n.price}</p>
    `,t.appendChild(d)});const a=document.querySelector(i);s.products.forEach(n=>{const l=document.createElement("a");l.setAttribute("href",`./pages/product-detail.html?id=${n.id}`),l.classList.add("flex","cursor-pointer","contain-sug"),l.innerHTML=`
      <div class="wrap-img-sug">
        <img src="${n.thumbnail}" class="object-cover"/>
      </div>
      <div>
        <h5>${n.title}</h5>
        <p>$${n.price}</p>
      </div>
    `,a.appendChild(l)})}Array.from(y.children).forEach(e=>{e.addEventListener("click",()=>{Array.from(y.children).forEach(s=>{console.log(s),s.classList.remove("opacity-100"),s.classList.add("opacity-45")}),e.classList.add("opacity-100"),console.log(e)})});Array.from(v.children).forEach(e=>{e.addEventListener("click",()=>{Array.from(v.children).forEach(s=>{s.classList.remove("opacity-100"),s.classList.add("opacity-45")}),e.classList.add("opacity-100")})});$(document).ready(function(){b(".slider")});
