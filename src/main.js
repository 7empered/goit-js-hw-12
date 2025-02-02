import { fetchImages } from "./js/pixabay-api.js";
import { renderGallery, clearGallery } from "./js/render-functions.js";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector("#search-form");
const loader = document.querySelector(".loader");
const gallery = document.querySelector(".gallery");
const loadMoreBtn = document.querySelector(".more");

let query = "";
let page = 1;
let totalHits = 0;
const perPage = 15; 


form.addEventListener("submit", async (event) => {
  event.preventDefault();
  query = form.querySelector("input").value.trim();

  if (!query) {
    iziToast.warning({ title: "Warning", message: "Please enter a search term" });
    return;
  }

  page = 1;
  clearGallery();
  loadMoreBtn.style.display = "none"; 
  loader.style.display = "block";

  try {
    const data = await fetchImages(query, page, perPage);
    loader.style.display = "none"; 

    if (data.hits.length === 0) {
      renderGallery([]); 
      return;
    }
    
    totalHits = data.totalHits;
    renderGallery(data.hits);

    if (page * perPage < totalHits) {
      loadMoreBtn.style.display = "block";
    }
  } catch (error) {
    console.error("Error fetching images:", error);
    iziToast.error({ title: "Error", message: "Failed to load images. Try again later." });
    loader.style.display = "none";
  }
});

loadMoreBtn.addEventListener("click", async () => {
  page++;
  loadMoreBtn.style.display = "none"; 
  loader.style.display = "block"; 

  try {
    const data = await fetchImages(query, page, perPage);
    loader.style.display = "none"; 

    if (data.hits.length === 0) {
      iziToast.info({ message: "No more images available." });
      return;
    }

    renderGallery(data.hits);

    if (page * perPage >= totalHits) {
      loadMoreBtn.style.display = "none";
      iziToast.info({ message: "We're sorry, but you've reached the end of search results." });
    } else {
      loadMoreBtn.style.display = "block"; 
    }

    scrollSmoothly();
  } catch (error) {
    console.error("Error fetching more images:", error);
    iziToast.error({ title: "Error", message: "Failed to load more images. Try again later." });
    loader.style.display = "none";
    loadMoreBtn.style.display = "block"; 
  }
});

function scrollSmoothly() {
  const cardHeight = document.querySelector(".gallery-item")?.getBoundingClientRect().height || 200;
  window.scrollBy({ top: cardHeight * 2, behavior: "smooth" });
}