const toggleBtn = document.querySelector("#toggle__btn"),
  navbar__items = document.querySelector(".navbar__items"),
  section = {
    home: document.querySelector(".section__home"),
    gallery: document.querySelector(".section__gallery"),
    about: document.querySelector(".section__about"),
    contact: document.querySelector(".section__contact"),
  };
let currentid = "home";
document.addEventListener("click", (e) => {
  const id = e.target.getAttribute("id");
  if (
    (id === "home" || id === "gallery" || id === "about" || id === "contact") &&
    currentid !== id
  ) {
    updatePage(id);
  }
});
toggleBtn.addEventListener("click", (e) => {
  navbar__items.classList.toggle("position__abs__menu");
});
function updatePage(page) {
  section[currentid].classList.remove("display--block");
  section[page].classList.add("display--block");
  let lastItem = document.querySelector("#" + currentid),
    currentItem = document.querySelector("#" + page);
  lastItem.classList.remove("color--green");
  currentItem.classList.add("color--green");
  lastItem.nextElementSibling.classList.remove("bg_color--green");
  currentItem.nextElementSibling.classList.add("bg_color--green");

  currentid = page;
}
