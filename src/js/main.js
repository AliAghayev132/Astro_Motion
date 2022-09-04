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
const toggleBtn = qS("#toggle__btn"),
  navbar__items = qS(".navbar__items"),
  section = {
    home: qS(".section__home"),
    gallery: qS(".section__gallery"),
    about: qS(".section__about"),
    contact: qS(".section__contact")
  };
let currentid = "home";
// #endregion
// #region Adding Events
document.addEventListener("click", (e) => {
  let id = e.target.getAttribute("id");
  id = (id === "gallery--2" ? "gallery" : id);
  if (
    (id === "home" || id === "gallery" || id === "about" || id === "contact") &&
    currentid !== id
  )
    updatePage(id);

});
toggleBtn.addEventListener("click", (e) => {
  navbar__items.classList.toggle("position__abs__menu");
});
//#endregion
// #region UpdatePage
function updatePage(page) {
  let lastItem = qS("#" + currentid),
    currentItem = qS("#" + page);

  classRemove(section[currentid], "display--block");
  classAdd(section[page], "display--block");

  currentid = page;

  classRemove(lastItem, "color--green");
  classAdd(currentItem, "color--green");

  classRemove(lastItem.nextElementSibling, "bg_color--green");
  classAdd(currentItem.nextElementSibling, "bg_color--green");

}
// #endregion


//#region Carousel 
{
  let content = qS(".gallery__content"),
    main = qS(".gallery__main"),
    cards = content.children,
    margin_right = 25,
    width = main.getBoundingClientRect().width,
    card_width = (width - margin_right * 4) / 5;
  for (let i of cards) {
    i.style.width = card_width + 'px';
  }
  content.style.width = (cards.length * card_width) + (margin_right * cards.length) + 'px';
  window.addEventListener('resize', () => {
    let width = main.getBoundingClientRect().width;
    let card_width = (width - (margin_right * 4)) / 5;
    for (let i of cards) {
      i.style.width = card_width + 'px';
    }

  })
}
//#endregion