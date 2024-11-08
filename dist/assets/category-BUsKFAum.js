import{g as a}from"./service-Ccry4lSF.js";import{g as r}from"./utils-ev9IYk3T.js";const o=document.querySelector(".path");(async()=>{const e=await a(`products/category/${r("category")}`);n(e),renderInformartion(e),renderRating(e),renderReviews(e),renderSameProduct(e)})();function n(e){o.innerHTML=`
          <a href="../index.html" class="text-[#09c] hover:text-[#fcb800] transition-colors">Home</a> /
          <span class="capitalize">${r("category").split("-").join(" ")}</span>
      `,e.products.forEach(t=>{console.log(t)})}
