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
// #region Initializing Section
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
  console.log(id);
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


