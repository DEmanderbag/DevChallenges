const menuOpen = document.querySelector(".nav__menu");
const menuClose = document.querySelector(".nav__menu--close");
const menu = document.querySelector("nav");

console.log(menu);
menuOpen.addEventListener("click", () => {
  menu.classList.toggle("open");
});

menuClose.addEventListener("click", () => {
  menu.classList.toggle("open");
});