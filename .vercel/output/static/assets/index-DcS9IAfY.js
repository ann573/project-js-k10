(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const n of e)if(n.type==="childList")for(const c of n.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&i(c)}).observe(document,{childList:!0,subtree:!0});function r(e){const n={};return e.integrity&&(n.integrity=e.integrity),e.referrerPolicy&&(n.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?n.credentials="include":e.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(e){if(e.ep)return;e.ep=!0;const n=r(e);fetch(e.href,n)}})();const b="https://dummyjson.com";async function a(t){try{return await(await fetch(`${b}/${t}`)).json()}catch(s){console.log(s)}}function w(t){$(t).slick({dots:!0,infinite:!0,speed:500,slidesToShow:1,slidesToScroll:1,autoplay:!0,autoplaySpeed:1500})}const T=document.querySelector(".category-left"),M=document.querySelector(".category-right"),S=document.querySelector(".sale-product"),h=document.getElementById("search-input"),l=document.getElementById("search-results"),m=document.getElementById("overlay"),y=document.querySelector(".select-clothes"),v=document.querySelector(".select-tech"),x=['<i class="ri-brush-line"></i>','<i class="ri-store-2-line"></i>','<i class="ri-sofa-line"></i>','<i class="ri-shopping-basket-line"></i>','<i class="ri-home-line"></i>','<i class="ri-bowl-line"></i>','<i class="ri-macbook-line"></i>','<i class="ri-shirt-line"></i>','<i class="ri-footprint-line"></i>','<i class="ri-time-line"></i>','<i class="ri-phone-line"></i>','<i class="ri-motorbike-line"></i>','<i class="ri-creative-commons-by-line"></i>','<i class="ri-smartphone-line"></i>','<i class="ri-football-line"></i>','<i class="ri-glasses-2-line"></i>','<i class="ri-tablet-line"></i>','<i class="ri-t-shirt-line"></i>','<i class="ri-car-line"></i>','<i class="ri-handbag-line"></i>','<i class="ri-t-shirt-2-line"></i>','<i class="ri-vip-diamond-line"></i>','<i class="ri-women-line"></i>','<i class="ri-timer-2-line"></i>'],f=10;let p=1;(async()=>{const t=await a("products/category-list"),s=await a("products");C(t),H(s.products),E(p,s),L(await a("products/category/mens-shirts"),await a("products/category/womens-dresses"),".product-clothes",".product_list"),L(await a("products/category/smartphones?limit=5"),await a("products/category/laptops?limit=5"),".product-mobile",".product_list_tech")})();function C(t){t.forEach((s,r)=>{const i=document.createElement("li");i.innerHTML=`
		<a class="flex" href="/pages/category.html?category=${s}">
			${x[r]}
			<span>${s.split("-").join(" ")}</span>
		</a>
		`,r<t.length/2?T.appendChild(i):M.appendChild(i)})}function H(t){const s=[],r=t.length-1,i=0;for(let e=0;e<5;e++){let n=Math.floor(Math.random()*(r-i)+i);s.push(n)}s.forEach(e=>{const n=document.createElement("a");n.setAttribute("href",`./pages/product-detail.html?id=${t[e].id}`),n.classList.add("item_sale"),n.innerHTML=`
            <div class='contain_img'>
                <img src="${t[e].thumbnail}"/>
            </div>
            <div class='contain_desc'>
                <h4>${t[e].title.slice(0,20)}</h4>
                <p><span>$${(t[e].price/(1-t[e].discountPercentage/100)).toFixed(2)}</span>
                <span>$${t[e].price}</span></p>
            </div>
            
        `,S.appendChild(n)})}function E(t,s){const r=document.querySelector(".hot_item");r.innerHTML="";const i=(t-1)*f,e=i+f;s.products.slice(i,e).forEach(c=>{const o=document.createElement("a");o.setAttribute("href",`./pages/product-detail.html?id=${c.id}`),o.innerHTML=`
        <div class='contain_img'>
          <img src="${c.thumbnail}"/>
        </div>
        <div class='content_box'>
          <h3 class="font-semibold text-xl">${c.title}</h3>
          <div class="price flex justify-between items-center">
            <span>$${c.price}</span>
            <div class="rating">
              <span class="text-[gold] text-xl">★</span>
              <span>${c.rating} (${c.reviews.length})</span>
            </div>
          </div>
        </div>
      `,r.appendChild(o)}),q(s)}function q(t){const s=document.querySelector(".pagination");s.innerHTML="";const r=Math.ceil(t.products.length/f);for(let i=1;i<=r;i++){const e=document.createElement("button");e.innerHTML=i===p?`<span>${i}</span>`:`${i}`,e.className="page-btn",e.addEventListener("click",()=>{p=i,E(p,t)}),s.appendChild(e)}}h.addEventListener("input",P(async()=>{const t=h.value.toLowerCase();l.classList.remove("hidden"),m.classList.remove("hidden");const r=(await a("products")).products;if(l.innerHTML="",t){const i=r.filter(e=>e.title.toLowerCase().includes(t));if(i.length>0)i.forEach(e=>{const n=document.createElement("a");n.setAttribute("href",`./pages/product-detail.html?id=${e.id}`),n.className="result-item flex items-center",n.innerHTML=`
          <img src="${e.thumbnail}" alt="${e.title}"/>
          <span>${e.title}</span>
        `,l.appendChild(n)});else{const e=document.createElement("div");e.className="text-center p-4",e.style.paddingBlock="10px",e.innerHTML="<span>Không có kết quả</span>",l.appendChild(e)}}else m.classList.add("hidden")},300));function P(t,s){let r;return function(...i){r&&clearTimeout(r),r=setTimeout(()=>{t.apply(this,i)},s)}}m.addEventListener("click",()=>{h.value="",l.innerHTML="",m.classList.add("hidden")});async function L(t,s,r,i){const e=document.querySelector(r);t.products.forEach(c=>{let o="";const d=document.createElement("a");d.setAttribute("href",`./pages/product-detail.html?id=${c.id}`),d.classList.add("clothes_item");for(let u=1;u<=c.rating;u++)o+='<span class="text-[gold] text-xl">★</span>';if(c.rating<5){const u=5-Math.floor(c.rating);for(let g=1;g<=u;g++)o+='<span class="text-xl">★</span>'}d.innerHTML=`
      <img src="${c.thumbnail}"/>
      <h3>${c.title}</h3>
      <p>${o}</p>
      <p>$${c.price}</p>
    `,e.appendChild(d)});const n=document.querySelector(i);s.products.forEach(c=>{const o=document.createElement("a");o.setAttribute("href",`./pages/product-detail.html?id=${c.id}`),o.classList.add("flex","cursor-pointer","contain-sug"),o.innerHTML=`
      <div class="wrap-img-sug">
        <img src="${c.thumbnail}" class="object-cover"/>
      </div>
      <div>
        <h5>${c.title}</h5>
        <p>$${c.price}</p>
      </div>
    `,n.appendChild(o)})}Array.from(y.children).forEach(t=>{t.addEventListener("click",()=>{Array.from(y.children).forEach(s=>{console.log(s),s.classList.remove("opacity-100"),s.classList.add("opacity-45")}),t.classList.add("opacity-100"),console.log(t)})});Array.from(v.children).forEach(t=>{t.addEventListener("click",()=>{Array.from(v.children).forEach(s=>{s.classList.remove("opacity-100"),s.classList.add("opacity-45")}),t.classList.add("opacity-100")})});$(document).ready(function(){w(".slider")});
