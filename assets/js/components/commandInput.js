import { executeCommand } from "../components/commandOutput.js";
import {
  addCommandToHistory,
  getPreviousCommand,
  getNextCommand,
} from "../commandHistory.js";

export function setupCommandInput(
  inputElement,
  outputElement,
  customCommands,
  suggestionsElement
) {
  inputElement.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      executeCommand(inputElement.value, outputElement, customCommands);

      // Czyszczenie sugestii i ukrycie elementu po wykonaniu komendy
      suggestionsElement.textContent = "";
      suggestionsElement.classList.remove("terminal__suggestions--visible");

      // Dodanie wprowadzonej komendy do historii komend
      addCommandToHistory(inputElement.value);

      // Wyczyszczenie pola input, aby przygotować miejsce na nową komendę
      inputElement.value = "";
    } else if (e.key === "ArrowUp") {
      // Jeśli naciśnięto strzałkę w górę, przejdź do poprzedniej komendy w historii
      const previousCommand = getPreviousCommand();
      if (previousCommand !== null) {
        inputElement.value = previousCommand;
        e.preventDefault(); // Zapobiegaj domyślnemu zachowaniu, aby kursor nie przemieszczał się na początek pola
      }
    } else if (e.key === "ArrowDown") {
      // Jeśli naciśnięto strzałkę w dół, przejdź do następnej komendy w historii
      inputElement.value = getNextCommand();
    }
  });
}
