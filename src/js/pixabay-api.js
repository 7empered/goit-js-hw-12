import axios from "axios";
import iziToast from "izitoast";

const API_KEY = "48568808-b5581b6c1359d9abd76100469";
const BASE_URL = "https://pixabay.com/api/";

export async function fetchImages(query, page = 1) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
        page,
        per_page: 15,
      },
    });
    return response.data;
  } catch (error) {
    iziToast.error({ title: "Error", message: "Failed to fetch images" });
    return { hits: [], totalHits: 0 };
  }
}