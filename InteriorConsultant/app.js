const menu = document.querySelector(".menu");
const menuClose = document.querySelector(".close-menu");
const overlay = document.querySelector(".overlay");

function openMenu() {
  overlay.style.display = "flex";
}

function closeMenu() {
  overlay.style.display = "none";
}
menu.addEventListener("click", openMenu);
menuClose.addEventListener("click", closeMenu);
