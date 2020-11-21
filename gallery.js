import galleryItems from "./gallery-items.js";

const refs = {
  gallery: document.querySelector(".js-gallery"),
  divLightbox: document.querySelector(".js-lightbox"),
  imgRef: document.querySelector(".gallery__image"),
  imgModal: document.querySelector(".lightbox__image"),
  divOverlay: document.querySelector(".lightbox__overlay"),
};

function createLi() {
  const li = document.createElement("li");
  li.classList.add("gallery__item");
  return li;
}

function createA(item) {
  const a = document.createElement("a");
  a.classList.add("gallery__link");
  a.setAttribute("href", item.original);
  return a;
}

function createImg(item) {
  const img = document.createElement("img");
  img.classList.add("gallery__image");
  img.setAttribute("src", item.preview);
  img.setAttribute("data-source", item.original);
  img.setAttribute("alt", item.description);
  return img;
}

const newItems = galleryItems.map((item) => {
  const itemLi = createLi();
  const itemA = createA(item);
  itemLi.appendChild(itemA);

  const itemImg = createImg(item);
  itemA.appendChild(itemImg);
  return itemLi;
});

refs.gallery.append(...newItems);

refs.gallery.addEventListener("click", onOpenModal);
refs.divLightbox.addEventListener("click", onBtnClick);
refs.divOverlay.addEventListener("click", onCloseModal);

function onCloseModal() {
  refs.imgModal.src = "";
  refs.divLightbox.classList.remove("is-open");
}

function onOpenModal(event) {
  event.preventDefault();
  window.addEventListener("keydown", (event) => {
    if (event.code === "Escape") {
      onCloseModal();
    }
  });

  if (event.target.nodeName !== "IMG") {
    return;
  }
  refs.imgModal.src = event.target.dataset.source;
  refs.divLightbox.classList.add("is-open");
}

function onBtnClick(event) {
  event.preventDefault();
  if (event.target.nodeName !== "BUTTON" && event.target.nodeName !== "DIV") {
    return;
  }
  onCloseModal();
}
