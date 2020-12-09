// Get elements
const nav = document.querySelector("nav");
const wrapper = document.querySelector(".wrapper");
const wrapperText = wrapper.querySelector(".wrapper__text");
const wrapperList = wrapper.querySelector(".wrapper__list");
const wrapperClose = wrapper.querySelector(".wrapper__text .close--list");
const searchText = nav.querySelector(".search p");

const section = document.querySelector(".places");
console.log(section);

nav.addEventListener("click", toggleNav);

wrapperClose.addEventListener("click", toggleNav);

function toggleNav(){
  if(wrapper.classList.toggle("wrapper--open")){
    nav.classList.toggle("nav--open");
    searchText.style.display = "block";
    wrapperText.style.display = "flex";
    wrapperList.style.display = "block";
    section.classList.toggle("places--open");
  } else {
    nav.classList.toggle("nav--open");
    searchText.style.display = "none";
    wrapperText.style.display = "none";
    wrapperList.style.display = "none";
    section.classList.toggle("places--open");
  }
}
