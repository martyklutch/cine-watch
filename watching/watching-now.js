import { toggleList, syncListButton } from "/movies.js";
import { loadList, saveList } from "../../storage.js";
import { displayMovies } from "../ui.js"

const watchContainer = document.querySelector("#searchResults");
const watch = loadList('watching');
displayMovies(watch, watchContainer, "You're not watching anything at the moment.");
