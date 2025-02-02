import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import iziToast from "izitoast";

const gallery = document.querySelector(".gallery");
const lightbox = new SimpleLightbox(".gallery a", {
  captionsData: "alt",
  captionDelay: 250,
});

export function clearGallery() {
  gallery.innerHTML = "";
}

export function renderGallery(images) {
  if (images.length === 0) {
    iziToast.error({
      title: "Error",
      message: "Sorry, there are no images matching your search query. Please, try again",
    });
    return;
  }

  const markup = images
    .map(
      ({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
      <a href="${largeImageURL}" class="gallery-item">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" />
        <div class="info">
          <p><br>Likes:</br> ${likes}</p>
          <p><br>Views:</br> ${views}</p>
          <p><br>Comments:</br> ${comments}</p>
          <p><br>Downloads:</br> ${downloads}</p>
        </div>
      </a>
    `
    )
    .join("");

  gallery.insertAdjacentHTML("beforeend", markup);
  lightbox.refresh();
}
