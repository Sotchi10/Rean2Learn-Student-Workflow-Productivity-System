const hamburger = document.querySelector(".hamburger");
const navDrop = document.querySelector(".navDrop");

hamburger.addEventListener("click", () => {
    navDrop.classList.toggle("open");
});
