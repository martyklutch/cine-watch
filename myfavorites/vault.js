'use strict';

import { loadList} from "../storage.js";
import { displayMovies } from "../ui.js"


const vaultContainer = document.querySelector("#searchResults");
const vault = loadList('vault');
displayMovies(vault, vaultContainer, "Vault is empty.");
