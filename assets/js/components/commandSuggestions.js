export function updateSuggestions(
  inputElement,
  suggestionsElement,
  customCommands
) {
  inputElement.addEventListener("input", () => {
    const availableCommands = [
      "clear",
      "help",
      "quote",
      "double",
      ...Object.keys(customCommands),
    ];

    const inputVal = inputElement.value.trim();

    // Ukrywanie sugestii, gdy pole tekstowe jest puste
    if (inputVal === "") {
      suggestionsElement.textContent = "";
      suggestionsElement.classList.remove("terminal__suggestions--visible");
      return; // Zakończenie funkcji, by nie wyświetlać sugestii, gdy pole jest puste
    }

    const filteredCommands = availableCommands.filter((cmd) =>
      cmd.startsWith(inputVal)
    );

    // Aktualizacja i wyświetlanie filtrowanych sugestii tylko gdy użytkownik wpisał jakiś tekst
    if (filteredCommands.length > 0) {
      suggestionsElement.textContent = `Available commands are: ${filteredCommands.join(
        ", "
      )}`;
      suggestionsElement.classList.add("terminal__suggestions--visible");
    } else {
      suggestionsElement.textContent = "No matching commands.";
      suggestionsElement.classList.add("terminal__suggestions--visible");
    }
  });
}
