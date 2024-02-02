// Funkcja pomocnicza do aktualizacji stanu i wyświetlania odpowiednich informacji w elemencie output
function updateState(state, outputElement, data = {}) {
  switch (state) {
    case "success":
      // Tworzenie i dodawanie elementu z cytatem w przypadku sukcesu
      const quoteElem = document.createElement("div");
      quoteElem.textContent = `terminal: ${data.quote}`;
      quoteElem.classList.add("terminal__message");
      outputElement.appendChild(quoteElem);
      break;
    case "error":
      // Tworzenie i dodawanie elementu z informacją o błędzie w przypadku niepowodzenia
      const errorElem = document.createElement("div");
      errorElem.textContent = "terminal: Failed to fetch quote.";
      errorElem.classList.add("terminal__message");
      outputElement.appendChild(errorElem);
      break;
  }

  // Przewijanie do dolnej części elementu output, aby pokazać najnowszą wiadomość
  outputElement.scrollTop = outputElement.scrollHeight;
}

// Eksportowanie funkcji fetchQuote do pobierania losowego cytatu
export function fetchQuote(outputElement) {
  fetch("https://dummyjson.com/quotes/random")
    .then((response) => response.json()) // Przetwarzanie odpowiedzi jako JSON
    .then((data) => {
      updateState("success", outputElement, data); // Obsługa sukcesu
    })
    .catch(() => {
      updateState("error", outputElement); // Obsługa błędu
    });
}
