import{g as a}from"./service-Ccry4lSF.js";import{g as o}from"./utils-ev9IYk3T.js";const l=document.querySelector(".path"),d=document.querySelector(".fillRating"),i=document.querySelectorAll(".square_price");(async()=>{const e=await a(`products/category/${o("category")}`);console.log(e),p(),y(),h(),renderInformartion(e),renderReviews(e),renderSameProduct(e)})();function p(){l.innerHTML=`
          <a href="../index.html" class="text-[#09c] hover:text-[#fcb800] transition-colors">Home</a> /
          <span class="capitalize">${o("category").split("-").join(" ")}</span>
      `}function y(e){i.forEach(n=>{n.addEventListener("click",function(){i.forEach(c=>{c.children[0].style.display="none"}),this.children[0].style.display="block"})})}function h(){for(let e=1;e<=5;e++){let n="";const c=document.createElement("div");c.classList.add("cursor-pointer","flex","items-center","mb-2");const s=`
      <div class="square size-4 bg-white flex items-center border border-[#666666] text-[#fcb800] cursor-pointer mr-3" id="check-${e}">
        <i class="ri-check-line hidden"></i> <!-- Thêm icon check với style display: none ban đầu -->
      </div>
    `;for(let t=1;t<=e;t++)n+='<span class="text-[gold] mr-1">★</span>';for(let t=5;t>e;t--)n+='<span class="text-gray-400 mr-1">★</span>';c.innerHTML=s+n;const r=c.querySelector(".square");r.addEventListener("click",function(){const t=r.querySelector(".ri-check-line");t.style.display==="none"?t.style.display="block":t.style.display="none"}),d.appendChild(c)}}
