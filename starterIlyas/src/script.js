
const searhInput = document.querySelector('#search-input')
const searchBtn = document.querySelector('#search-btn')
const searchSvg = document.querySelector('#search-svg')
const searchCard = document.querySelector('#search-card')

searchBtn.addEventListener('onclick', () => {
    if (searhInput.style.display === "none") {
        searhInput.style.display = "block";
      } else {
        searhInput.style.display = "none";
      }
})

searchCard.addEventListener('onclick', () => {
    if (searchCard.style.display === "none") {
        searchCard.style.display = "block";
      } else {
        searchCard.style.display = "none";
      }
})
// searchBtn.addEventListener('onmouseout', () => {
    
//     searhInput.style.display = 'none'

// })

console.log("js loaded");