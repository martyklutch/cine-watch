'use strict';

import { toggleList, syncListButton } from "/cinemawatch-react/src/movies.js";
import { loadList, saveList } from "../../storage.js";
import { displayMovies } from "../ui.js"

const vaultContainer = document.querySelector("#searchResults");
const vault = loadList('vault');
displayMovies(vault, vaultContainer, "Vault is empty.");

