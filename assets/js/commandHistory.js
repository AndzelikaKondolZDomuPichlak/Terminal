export const createCommandHistoryManager = () => {
  let commandHistory = []; // Historia wprowadzonych komend
  let historyIndex = -1; // Indeks aktualnie przeglądanej komendy

  return {
    // Dodaje komendę do historii i resetuje indeks
    addCommandToHistory(command) {
      commandHistory.push(command);
      historyIndex = -1; // Powrót do "nowej" pozycji
    },

    // Zwraca poprzednią komendę i aktualizuje indeks
    getPreviousCommand() {
      if (historyIndex === -1) historyIndex = commandHistory.length;
      historyIndex = Math.max(0, historyIndex - 1);
      return commandHistory[historyIndex] || "";
    },

    // Zwraca następną komendę i aktualizuje indeks
    getNextCommand() {
      if (historyIndex < commandHistory.length - 1) {
        historyIndex++;
        return commandHistory[historyIndex];
      } else {
        historyIndex = -1; // Reset na koniec historii
        return "";
      }
    },
  };
};
