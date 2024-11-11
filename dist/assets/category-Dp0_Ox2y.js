import{g as S}from"./service-Ccry4lSF.js";import{g as E}from"./utils-ev9IYk3T.js";const M=document.querySelector(".path"),m=document.querySelector(".increase"),y=document.querySelector(".desc"),q=document.querySelector(".fillRating"),T=document.querySelector("#number_product"),f=document.querySelector(".main"),h=document.querySelector(".gallery"),g=document.querySelector(".list"),C=document.querySelector("input[name='search_product']");let l=!1,d=!1,p=!1,o=1,k;(async()=>{const e=await S(`products/category/${E("category")}`);console.log(e),T.textContent=e.products.length,H(),D(e),F(e),b(e)})();const b=e=>{C.value="",l=!l,h.classList.toggle("text-[#292828]",l),g.classList.toggle("text-[#807b7b]",l),h.classList.toggle("text-[#807b7b]",!l),g.classList.toggle("text-[#292828]",!l),p?L(e.products):d?x(e.products):r(o,e.products),h.addEventListener("click",()=>b(e)),g.addEventListener("click",()=>b(e))};C.addEventListener("input",function(e){const s=data.products.filter(t=>t.title.toLowerCase().includes(e.target.value.toLowerCase()));r(o,s)});function H(){M.innerHTML=`
          <a href="../index.html" class="text-[#09c] hover:text-[#fcb800] transition-colors">Home</a> /
          <span class="capitalize">${E("category").split("-").join(" ")}</span>
      `}function D(e){m.addEventListener("click",()=>$(e,m)),y.addEventListener("click",()=>$(e,y))}function $(e,s){s.children[0].children[0].style.display==="block"?s.children[0].children[0].style.display="none":(m.children[0].children[0].style.display="none",y.children[0].children[0].style.display="none",s.children[0].children[0].style.display="block"),s.classList[0]==="increase"?(d=!d,p&&(p=!1),d?x(e.products):r(o,e.products)):(p=!p,d&&(d=!1),p?L(e.products):r(o,e.products))}function x(e){const s=[...e];console.log(s),s.sort((t,n)=>t.price-n.price),r(o,s)}function L(e){const s=[...e];s.sort((t,n)=>n.price-t.price),r(o,s)}function F(e){for(let t=1;t<=5;t++){let n="";const i=document.createElement("div");i.classList.add("check_star","cursor-pointer","flex","items-center","mb-2","w-max","select-none");const a=`
      <div class="square size-4 bg-white flex items-center border border-[#666666] text-[#fcb800] cursor-pointer mr-3" id="check-${t}">
        <i class="ri-check-line hidden"></i> 
      </div>
    `;for(let c=1;c<=t;c++)n+='<span class="text-[gold] mr-1">★</span>';for(let c=5;c>t;c--)n+='<span class="text-gray-400 mr-1">★</span>';i.innerHTML=a+n,q.appendChild(i)}const s=document.getElementsByClassName("check_star");Array.from(s).forEach((t,n)=>{t.addEventListener("click",()=>_(t,n,e))})}function _(e,s,t){const n=e.querySelector(".ri-check-line");if(n.classList.contains("hidden"))n.classList.remove("hidden"),n.classList.add("block");else{n.classList.remove("block"),n.classList.add("hidden"),w(-1,t);return}w(s,t)}function w(e,s){let t;e===-1?t=[...s.products]:(k=e,t=s.products.filter(n=>Math.floor(n.rating)===k+1)),p?L(t):d?x(t):r(o,t)}function r(e,s){if(s.length===0){f.innerHTML="<p class='text-center text-xl col-span-4 font-semibold'>Không tìm thấy sản phẩm nào 😞</p>",P(s,0);return}const t=l?8:4;f.classList.toggle("grid-cols-1",!l),f.classList.toggle("grid-cols-4",l),f.innerHTML="";const n=(e-1)*t,i=n+t;s.slice(n,i).forEach(c=>{let v=j(c);const u=document.createElement("a");u.setAttribute("href",`./product-detail.html?id=${c.id}`),u.classList.add("p-3","hover:outline","hover:outline-[1px]","hover:outline-[#c0c0c0]","relative"),l?u.innerHTML=`
      <img src="${c.thumbnail}"/>
      <h3 class="min-h-12">${c.title}</h3>
      <p>${v}</p>
      <p class="flex items-center gap-2"><span class="line-through text-sm">$${(c.price/(1-c.discountPercentage/100)).toFixed(2)}</span>
      <span class="text-[#F5912C] font-semibold">$${c.price}</span></p>
      <span class="bg-[#f14705] block px-3 w-max rounded text-white font-bold absolute left-1 top-1">-${c.discountPercentage}%</span>
    `:(u.classList.add("flex","items-start","justify-between"),u.innerHTML=`
        <div class="contain_img w-1/6">
          <img src="${c.thumbnail}" class=""/>
        </div>  
        <div class="w-[60%]">
          <h3>${c.title}</h3>
          <p>${v}</p>
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
            ${c.description}
            </li>
          </ul>
        </div>    
        <div>
        <p class="flex items-center gap-2"><span class="line-through text-sm">$${(c.price/(1-c.discountPercentage/100)).toFixed(2)}</span>
        <span class="text-[#F5912C] text-xl font-semibold">$${c.price}</span></p>
        <button class="font-semibold rounded-md bg-[#fcb800] py-2 px-5 mt-3">Chi tiết sản phẩm</button>
        </div>
        <span class="bg-[#f14705] block px-3 w-max rounded text-white font-bold absolute left-1 top-1">-${c.discountPercentage}%</span>
      `),f.appendChild(u),P(s,t)})}function P(e,s){const t=document.querySelector(".pagination");t.innerHTML="";const n=Math.ceil(e.length/s);for(let i=1;i<=n;i++){const a=document.createElement("button");a.classList.add("page-btn","mx-2","hover:opacity-80"),a.innerHTML=i===o?`<span class="flex justify-center items-center w-5 h-5 rounded-full bg-[#F5912C] text-white">${i}</span>`:`${i}`,a.addEventListener("click",()=>{o=i,r(o,e),window.scrollTo({top:123,left:0,behavior:"smooth"})}),t.appendChild(a)}}function j(e){let s="";for(let t=1;t<=e.rating;t++)s+='<span class="text-[gold] mr-1">★</span>';if(e.rating<5){const t=5-Math.floor(e.rating);for(let n=1;n<=t;n++)s+='<span class="text-gray-400 mr-1">★</span>'}return s}
