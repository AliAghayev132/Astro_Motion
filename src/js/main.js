// #region Custom Js
function qS(par) {
  return document.querySelector(par);
}
function classAdd(par, class_name) {
  par.classList.add(class_name);
}
function classRemove(par, class_name) {
  par.classList.remove(class_name);
}
//#endregion
// #region Initializing Sections and Variables
const section = {
  home: qS(".section__home"),
  gallery: qS(".section__gallery"),
  about: qS(".section__about"),
  contact: qS(".section__contact")
},
SIZES = {
  cards:[5, 4, 3, 2, 1],
  screens:[1200, 800, 600, 400, 300],
  margin:25,
};
let currentid = "home";
// #endregion
// #region Adding Events
function addEventListeners() {
  document.addEventListener("click", (e) => {
    let id = e.target.getAttribute('id');
    if (e.target.classList.contains("nav__item")) {
      updatePage(id);
    } else if (id === "toggle__btn") {
      qS(".navbar__items").classList.toggle("position__abs__menu");
    } else if (id === "arrow__left") {
      cardMove(-1);
    } else if (id === "arrow__right") {
      cardMove(1);
    }
  });
  window.addEventListener("resize", () => {
    console.log("Salam");
    updateCarousel(SIZES.cards,SIZES.screens,SIZES.margin);
  })
}
//#endregion
// #region UpdatePage
function updatePage(page) {
  page = (page === "gallery--2" ? "gallery" : page);

  let lastItem = qS("#" + currentid),
    currentItem = qS("#" + page);

  classRemove(section[currentid], "display--block");
  classAdd(section[page], "display--block");

  if (page === "gallery")
    updateCarousel(SIZES.cards,SIZES.screens,SIZES.margin);

  currentid = page;

  classRemove(lastItem.children[0], "color--green");
  classAdd(currentItem.children[0], "color--green");

  classRemove(lastItem.children[1], "bg_color--green");
  classAdd(currentItem.children[1], "bg_color--green");

}
// #endregion


//!Sonrada Marginidə qoş avto
//#region Carousel 
function updateCarousel(visible_cards, widths, margin) {
  const main = document.querySelector('.gallery__main').getBoundingClientRect().width,
  content = document.querySelector('.gallery__content');
  for(let i in visible_cards){
    if(main > widths[i]){
      content.style.setProperty("--per-view",visible_cards[i]);
      break;
    }
  }
}
//#endregion
function cardMove(par) {
  let nextposition;
  if (par === -1) {
    startCard -= 3;
    if (startCard < 0) {
      startCard = 0;
      nextposition = (startCard * card_width);
      content.style.transform = `translateX(${-nextposition}px)`;
    } else {
      nextposition = (startCard * card_width) + (startCard) * card_margin;
      content.style.transform = `translateX(${-nextposition}px)`;
    }
  } else {
    let temp = cards.length - visible_card;
    startCard = startCard + 3 > temp ? temp : startCard + 3;
    nextposition = (startCard * card_width) + (startCard - 1) * card_margin;
    content.style.transform = `translateX(${-nextposition}px)`;
  }
}
addEventListeners();
