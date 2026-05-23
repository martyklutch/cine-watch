import { toggleList, syncListButton } from "/movies.js";
import { loadList, saveList } from "../../storage.js";
import { displayMovies } from "../ui.js"

const queueContainer = document.querySelector("#searchResults");
const queue = loadList('queue');
displayMovies(queue, queueContainer, "Your queue is empty.");
