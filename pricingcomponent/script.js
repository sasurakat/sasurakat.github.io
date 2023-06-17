"use strict";

const toggleBtn = document.querySelector(".toggle-btn");
const toggleArea = document.querySelector(".toggle-area");
const basicPrice = document.querySelector(".price-1");
const profPrice = document.querySelector(".price-2");
const masterPrice = document.querySelector(".price-3");

toggleArea.addEventListener("click", function (e) {
    e.preventDefault();
    toggleArea.classList.toggle("monthly");
    toggleArea.classList.toggle("annually");
  
    basicPrice.innerHTML = toggleArea.classList.contains("monthly")
      ? `<p class="price-1"> <span class="dollar-sign">&dollar;</span>19.99</p>`
      : `<p class="price-1"> <span class="dollar-sign">&dollar;</span>199.99</p>`;
  
    profPrice.innerHTML = toggleArea.classList.contains("monthly")
      ? `<p class="price-2"> <span class="dollar-sign">&dollar;</span>24.99</p>`
      : `<p class="price-2"> <span class="dollar-sign">&dollar;</span>249.99</p>`;
  
    masterPrice.innerHTML = toggleArea.classList.contains("monthly")
      ? `<p class="price-3"> <span class="dollar-sign">&dollar;</span>39.99</p>`
      : `<p class="price-3"> <span class="dollar-sign">&dollar;</span>399.99</p>`;
  });
  