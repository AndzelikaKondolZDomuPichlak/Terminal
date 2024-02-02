import { formatLoginTime } from "./helpers/formatTime";
import { setupCommandInput } from "./components/commandInput";
import { updateSuggestions } from "./components/commandSuggestions";
import { CUSTOM_COMMANDS } from "./customCommands";

const output = document.getElementById("output");
const input = document.getElementById("input");
const suggestions = document.getElementById("suggestions");
const lastLoginTimeElement = document.getElementById("lastLoginTime");

// Odczytanie ostatniego czasu logowania z lokalnej pamięci przeglądarki (localStorage)
let lastLoginTime = localStorage.getItem("lastLoginTime");
// Jeśli nie ma zapisanego czasu, ustaw bieżący czas jako ostatni czas logowania
if (!lastLoginTime) {
  lastLoginTime = new Date().toISOString();
  localStorage.setItem("lastLoginTime", lastLoginTime); // Zapisanie w localStorage
}
// Wyświetlenie sformatowanego czasu ostatniego logowania
lastLoginTimeElement.textContent = formatLoginTime(lastLoginTime);

// Inicjalizacja obsługi wprowadzania poleceń przez użytkownika
setupCommandInput(input, output, CUSTOM_COMMANDS, suggestions);

// Inicjalizacja obsługi wyświetlania sugestii poleceń
updateSuggestions(input, suggestions, CUSTOM_COMMANDS);
