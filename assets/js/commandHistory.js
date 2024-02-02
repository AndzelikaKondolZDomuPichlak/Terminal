// Eksportowanie zmiennej przechowującej historię wprowadzonych komend
export let commandHistory = [];
// Eksportowanie indeksu aktualnie przeglądanej komendy w historii
export let historyIndex = -1;

// Funkcja dodająca wprowadzoną komendę do historii
export function addCommandToHistory(command) {
  // Dodanie komendy do tablicy historii
  commandHistory.push(command);
  // Resetowanie indeksu historii, aby wskazywał na koniec historii
  historyIndex = -1;
}

// Funkcja zwracająca poprzednią komendę z historii
export function getPreviousCommand() {
  // Jeśli jesteśmy na końcu historii, ustawiamy indeks na jej koniec
  if (historyIndex === -1) {
    historyIndex = commandHistory.length;
  }
  // Przesunięcie indeksu o jeden wstecz, z zachowaniem ograniczenia do pierwszego elementu
  historyIndex = Math.max(0, historyIndex - 1);
  // Zwrócenie komendy znajdującej się na aktualnym indeksie
  return commandHistory[historyIndex] || "";
}

// Funkcja zwracająca następną komendę z historii
export function getNextCommand() {
  // Sprawdzenie, czy nie jesteśmy na końcu historii
  if (historyIndex !== -1 && historyIndex < commandHistory.length - 1) {
    historyIndex++; // Przesunięcie indeksu o jeden do przodu
    return commandHistory[historyIndex]; // Zwrócenie komendy na aktualnym indeksie
  } else {
    // Resetowanie indeksu, gdy dojdziemy do końca historii
    historyIndex = -1;
    return ""; // Zwrócenie pustego stringa, oznaczającego brak dalszych komend w historii
  }
}
