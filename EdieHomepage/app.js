const menuBlock = document.querySelector(".menu");
const navLinks = document.querySelector(".nav__links");
const links = document.querySelectorAll("nav__links li");

menuBlock.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

navLinks.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});
