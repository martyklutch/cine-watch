
import { loadList } from "../storage.js";
import { displayMovies } from "../ui.js"

const queueContainer = document.querySelector("#searchResults");
const queue = loadList('queue');
displayMovies(queue, queueContainer, "Your queue is empty.");
