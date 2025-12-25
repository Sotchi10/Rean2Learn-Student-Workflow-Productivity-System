const hamburger = document.querySelector(".hamburger");
const navDrop = document.querySelector(".navDrop");

hamburger.addEventListener("click", () => {
    navDrop.classList.toggle("open");
});

const menu = document.getElementById("menu");
const sidebar = document.getElementById("sidebar");

menu.addEventListener("click", () => {
    sidebar.classList.toggle("-translate-x-full");
});







