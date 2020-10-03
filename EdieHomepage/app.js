const menuBlock = document.querySelector(".menu");
const openMenuBlock = document.querySelector(".menu__open");
const menuClose = document.querySelector(".menu__close");

function openMenu() {
  openMenuBlock.style.display = "flex";
}

function closeMenu() {
  openMenuBlock.style.display = "none";
}

menuBlock.addEventListener("click", openMenu);
menuClose.addEventListener("click", closeMenu);
