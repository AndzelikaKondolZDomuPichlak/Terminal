import { fetchQuote } from "../helpers/fetchQuote.js";

function appendResponse(outputElement, text, isError = false) {
  const elem = document.createElement("div");
  elem.textContent = text;
  elem.classList.add("terminal__message");
  if (isError) {
    // Oznaczanie wiadomości jako błąd, aby wyróżnić ją kolorem lub stylem
    elem.classList.add("terminal__message--error");
  }
  outputElement.appendChild(elem);
}

export function executeCommand(command, outputElement, customCommands) {
  // Bezpośrednie wyświetlenie wprowadzonej komendy na ekranie terminala
  appendResponse(outputElement, `you: ${command}`);

  if (command === "clear") {
    // Wyczyszczenie zawartości terminala, jeśli komendą jest "clear"
    outputElement.innerHTML = "";
    return; // Zakończenie funkcji, by nie wykonywać dalszych operacji
  }

  // Sprawdzanie pierwszego słowa komendy, by zdecydować, jaką akcję wykonać
  switch (command.split(" ")[0]) {
    case "help":
      // Wyświetlenie listy dostępnych komend
      appendResponse(outputElement, "terminal: Your available options are:");
      [
        ...Object.keys(customCommands),
        "clear",
        "help",
        "quote",
        "double [number]",
      ].forEach((cmd) => appendResponse(outputElement, cmd));
      break;
    case "quote":
      // Wywołanie funkcji fetchQuote, by pobrać i wyświetlić losowy cytat
      fetchQuote(outputElement);
      break;
    case "double":
      // Próba podwojenia liczby podanej w komendzie
      const number = parseInt(command.split(" ")[1], 10);
      if (!isNaN(number)) {
        appendResponse(outputElement, `terminal: ${number * 2}`);
      } else {
        appendResponse(
          outputElement,
          "terminal: Error: 'double' command expects a number.",
          true
        );
      }
      break;
    default:
      // Sprawdzenie, czy komenda nie istnieje wśród zdefiniowanych komend
      const isCommandNotFound = !customCommands[command.split(" ")[0]];
      const responseText = isCommandNotFound
        ? `terminal: Command not found: ${command}`
        : `terminal: ${customCommands[command.split(" ")[0]].msg}`;
      appendResponse(outputElement, responseText, isCommandNotFound);
  }

  // Przewijanie terminala, by najnowsza wiadomość była widoczna
  outputElement.scrollTop = outputElement.scrollHeight;
}
