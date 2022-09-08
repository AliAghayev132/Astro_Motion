class Carousel {
  constructor(par) {
    this.content = qS((par.content));
    this.main = qS(par.main);
    this.cards = this.content.children;
    this.system = par.system;
    this.totalScroll = this.system.perView;
  }
  updateCarousel() {
    const screens = this.system.screens,
      cards = this.system.cardsPerView;
    for (let i in cards) {
      if (this.main.offsetWidth > screens[i]) {
        this.content.style.setProperty("--per-view", cards[i]);
        break;
      }
    }
    this.balanceCarousel();
  }
  moveCarouselRight() {
    this.content.style.transition = '.3s';
    this.content.style.left = '0px';
    ++this.totalScroll;
    if (this.totalScroll == this.cards.length - this.system.perView + 1) {
      this.totalScroll = this.system.perView + 1;
      this.content.style.transition = '0s';
      this.content.style.left = `-${(this.cards[0].offsetWidth + this.system.gap) * (this.totalScroll - 1)}px`;
    }
    this.content.style.left = `-${(this.cards[0].offsetWidth + this.system.gap) * this.totalScroll}px`;
    this.content.style.transition = '.3s';
  }
  moveCarouselLeft() {
    this.content.style.transition = '.3s';
    this.content.style.left = '0px';
    --this.totalScroll;
    if (this.totalScroll == -1) {
      this.content.style.transition = '0s';
      this.totalScroll = this.cards.length - 2 * this.system.perView - 1;
      this.content.style.left = `-${(this.cards[0].offsetWidth + this.system.gap) * (this.totalScroll + 1)}px`;
    }
    this.content.style.left = `-${(this.cards[0].offsetWidth + this.system.gap) * this.totalScroll}px`;
    this.content.style.transition = '.3s';
    console.log(this.totalScroll);
  }
  balanceCarousel() {
    for (let i = 0; i < this.system.perView; ++i) {
      this.content.insertAdjacentHTML("beforeend", this.cards[i].outerHTML);
    }
    for (let i = 0; i < this.system.perView; ++i) {
      this.content.insertAdjacentHTML("afterbegin", this.cards[this.cards.length - i - 1 - this.system.perView].outerHTML);
    }
    this.content.style.left = `-${(this.cards[0].offsetWidth + this.system.gap) * this.totalScroll}px`;
  }
  resetCarousel() {
    const screens = this.system.screens,
      cards = this.system.cardsPerView;
    for (let i in cards) {
      if (this.main.offsetWidth > screens[i]) {
        this.content.style.setProperty("--per-view", cards[i]);
        break;
      }
    }
    this.totalScroll = this.system.perView;
    this.content.style.left = `-${(this.cards[0].offsetWidth + this.system.gap) * this.totalScroll}px`;
  }
}
const carousel = new Carousel(
  {
    content: ".gallery__content",
    main: ".gallery__main",
    system: {
      cardsPerView: [5, 4, 3, 2, 1],
      screens: [1200, 800, 600, 400, 300],
      gap: 25,
      perView: 5,
    }
  }
);
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
  contact: qS(".section__contact"),
  load:qS("#loadscreen")
},
  video = qS("#video");
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
      carousel.moveCarouselLeft();
    } else if (id === "arrow__right") {
      carousel.moveCarouselRight();
    }
  });
  window.addEventListener('resize', () => carousel.resetCarousel());

  video.addEventListener('loadeddata', e => {
    if (video.readyState >= 3) {
      section.load.classList.add("removeload");
    }
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

  if (page === "gallery" && currentid !== page) {
    carousel.updateCarousel();
  }
  currentid = page;

  classRemove(lastItem.children[0], "color--green");
  classAdd(currentItem.children[0], "color--green");

  classRemove(lastItem.children[1], "bg_color--green");
  classAdd(currentItem.children[1], "bg_color--green");

}
// #endregion
addEventListeners();
