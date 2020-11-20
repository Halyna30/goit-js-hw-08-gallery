import galleryItems from "./gallery-items.js";

// {/* <li class="gallery__item">
//     <a
//         class="gallery__link"
//         href="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg"
//     >
//         <img
//             class="gallery__image"
//             src="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546__340.jpg"
//             data-source="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg"
//             alt="Tulips"
//         />
//     </a>
// </li> */}

const refs = {
  gallery: document.querySelector(".js-gallery"),
  divLightbox: document.querySelector(".js-lightbox"),
  imgRef: document.querySelector(".gallery__image"),
  imgModal: document.querySelector(".lightbox__image"),
  divOverlay: document.querySelector(".lightbox__overlay"),
};
const gallery = document.querySelector(".js-gallery");

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

gallery.append(...newItems);

const divLightbox = document.querySelector(".js-lightbox");
const imgModal = document.querySelector(".lightbox__image");
const imgRef = document.querySelector(".gallery__image");

gallery.addEventListener("click", onImageClick);
divLightbox.addEventListener("click", onBtnClick);

function onImageClick(event) {
  event.preventDefault();

  if (event.target.nodeName !== "IMG") {
    return;
  }
  imgModal.src = event.target.dataset.source;
  divLightbox.classList.add("is-open");
}

function onBtnClick(event) {
  event.preventDefault();
  if (event.target.nodeName !== "BUTTON") {
    return;
  }
  imgModal.src = "";
  divLightbox.classList.remove("is-open");
}
