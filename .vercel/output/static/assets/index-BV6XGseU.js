(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const c of t)if(c.type==="childList")for(const r of c.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function n(t){const c={};return t.integrity&&(c.integrity=t.integrity),t.referrerPolicy&&(c.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?c.credentials="include":t.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function i(t){if(t.ep)return;t.ep=!0;const c=n(t);fetch(t.href,c)}})();const w="https://dummyjson.com";async function l(s){try{return await(await fetch(`${w}/${s}`)).json()}catch(e){console.log(e)}}function E(s){$(s).slick({dots:!0,infinite:!0,speed:500,slidesToShow:1,slidesToScroll:1,autoplay:!0,autoplaySpeed:1500})}const M=document.querySelector(".category-left"),T=document.querySelector(".category-right"),x=document.querySelector(".sale-product"),h=document.getElementById("search-input"),a=document.getElementById("search-results"),p=document.getElementById("overlay"),y=document.querySelector(".select-clothes"),v=document.querySelector(".select-tech"),S=['<i class="ri-brush-line"></i>','<i class="ri-store-2-line"></i>','<i class="ri-sofa-line"></i>','<i class="ri-shopping-basket-line"></i>','<i class="ri-home-line"></i>','<i class="ri-bowl-line"></i>','<i class="ri-macbook-line"></i>','<i class="ri-shirt-line"></i>','<i class="ri-footprint-line"></i>','<i class="ri-time-line"></i>','<i class="ri-phone-line"></i>','<i class="ri-motorbike-line"></i>','<i class="ri-creative-commons-by-line"></i>','<i class="ri-smartphone-line"></i>','<i class="ri-football-line"></i>','<i class="ri-glasses-2-line"></i>','<i class="ri-tablet-line"></i>','<i class="ri-t-shirt-line"></i>','<i class="ri-car-line"></i>','<i class="ri-handbag-line"></i>','<i class="ri-t-shirt-2-line"></i>','<i class="ri-vip-diamond-line"></i>','<i class="ri-women-line"></i>','<i class="ri-timer-2-line"></i>'],f=10;let u=1;(async()=>{const s=await l("products/category-list"),e=await l("products");C(s),H(e.products),b(u,e),L(await l("products/category/mens-shirts"),await l("products/category/womens-dresses"),".product-clothes",".product_list"),L(await l("products/category/smartphones?limit=5"),await l("products/category/laptops?limit=5"),".product-mobile",".product_list_tech"),console.log(e)})();function C(s){s.forEach((e,n)=>{const i=document.createElement("li");i.innerHTML=`
		<a class="flex" href="/pages/category.html?category=${e}">
			${S[n]}
			<span>${e.split("-").join(" ")}</span>
		</a>
		`,n<s.length/2?M.appendChild(i):T.appendChild(i)})}function H(s){const e=[],n=s.length-1,i=0;for(let t=0;t<5;t++){let c=Math.floor(Math.random()*(n-i)+i);e.push(c)}e.forEach(t=>{const c=document.createElement("a");c.setAttribute("href","google.com"),c.classList.add("item_sale"),c.innerHTML=`
            <div class='contain_img'>
                <img src="${s[t].thumbnail}"/>
            </div>
            <div class='contain_desc'>
                <h4>${s[t].title.slice(0,20)}</h4>
                <p><span>$${(s[t].price/(1-s[t].discountPercentage/100)).toFixed(2)}</span>
                <span>$${s[t].price}</span></p>
            </div>
            
        `,x.appendChild(c)})}function b(s,e){const n=document.querySelector(".hot_item");n.innerHTML="";const i=(s-1)*f,t=i+f;e.products.slice(i,t).forEach(r=>{const o=document.createElement("div");o.innerHTML=`
        <div class='contain_img'>
          <img src="${r.thumbnail}"/>
        </div>
        <div class='content_box'>
          <h3 class="font-semibold text-xl">${r.title}</h3>
          <div class="price flex justify-between items-center">
            <span>$${r.price}</span>
            <div class="rating">
              <span class="text-[gold] text-xl">★</span>
              <span>${r.rating} (${r.reviews.length})</span>
            </div>
          </div>
        </div>
      `,n.appendChild(o)}),q(e)}function q(s){const e=document.querySelector(".pagination");e.innerHTML="";const n=Math.ceil(s.products.length/f);for(let i=1;i<=n;i++){const t=document.createElement("button");t.innerHTML=i===u?`<span>${i}</span>`:`${i}`,t.className="page-btn",t.addEventListener("click",()=>{u=i,b(u)}),e.appendChild(t)}}h.addEventListener("input",()=>{const s=h.value.toLowerCase();if(a.innerHTML="<i class='ri-triangle-fill'></i>",a.classList.remove("hidden"),p.classList.remove("hidden"),s){const e=products.filter(n=>n.title.toLowerCase().includes(s));if(e.length>0)e.forEach(n=>{const i=document.createElement("div");i.className="result-item flex items-center",i.innerHTML=`
                  <img src="${n.thumbnail}" alt="${n.title}"/>
                  <span>${n.title}</span>
              `,i.addEventListener("click",()=>{console.log("hello")}),a.appendChild(i)});else{const n=document.createElement("div");n.className="text-center p-4",n.style.paddingBlock="10px",n.innerHTML="<span>Không có kết quả</span>",a.appendChild(n)}}else p.classList.add("hidden")});p.addEventListener("click",()=>{h.value="",a.innerHTML="",p.classList.add("hidden")});async function L(s,e,n,i){const t=document.querySelector(n);s.products.forEach(r=>{let o="";const m=document.createElement("a");m.classList.add("clothes_item");for(let d=1;d<=r.rating;d++)o+='<span class="text-[gold] text-xl">★</span>';if(r.rating<5){const d=5-Math.floor(r.rating);for(let g=1;g<=d;g++)o+='<span class="text-xl">★</span>'}m.innerHTML=`
      <img src="${r.thumbnail}"/>
      <h3>${r.title}</h3>
      <p>${o}</p>
      <p>$${r.price}</p>
    `,t.appendChild(m)});const c=document.querySelector(i);e.products.forEach(r=>{const o=document.createElement("div");o.classList.add("flex","cursor-pointer","contain-sug"),o.innerHTML=`
      <div class="wrap-img-sug">
        <img src="${r.thumbnail}" class="object-cover"/>
      </div>
      <div>
        <h5>${r.title}</h5>
        <p>$${r.price}</p>
      </div>
    `,c.appendChild(o)})}Array.from(y.children).forEach(s=>{s.addEventListener("click",()=>{Array.from(y.children).forEach(e=>{e.classList.remove("opacity-100"),e.classList.add("opacity-45")}),s.classList.add("opacity-100")})});$(document).ready(function(){E(".slider")});Array.from(v.children).forEach(s=>{s.addEventListener("click",()=>{Array.from(v.children).forEach(e=>{e.classList.remove("opacity-100"),e.classList.add("opacity-45")}),s.classList.add("opacity-100")})});$(document).ready(function(){E(".slider")});
