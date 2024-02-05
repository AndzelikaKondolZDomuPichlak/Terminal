import { fetchQuote } from "../helpers/fetchQuote";

const appendResponse = (outputElement, text, isError = false) => {
  const elem = document.createElement("div");
  elem.textContent = text;
  elem.classList.add("terminal__message");
  if (isError) {
    elem.classList.add("terminal__message--error");
  }
  outputElement.appendChild(elem);
  outputElement.scrollTop = outputElement.scrollHeight;
};

export const executeCommand = async (
  command,
  inputElement,
  outputElement,
  customCommands
) => {
  appendResponse(outputElement, `you: ${command}`);

  if (command === "clear") {
    outputElement.innerHTML = "";
    return;
  }

  const onSuccess = (data) => {
    appendResponse(outputElement, `terminal: ${data.quote}`);
    inputElement.disabled = false;
  };

  const onError = (error) => {
    appendResponse(
      outputElement,
      `terminal: Nie udało się pobrać cytatu. Błąd: ${error.message}`,
      true
    );
    inputElement.disabled = false;
  };

  switch (command.split(" ")[0]) {
    case "help":
      appendResponse(outputElement, "terminal: Dostępne opcje:");
      [
        ...Object.keys(customCommands),
        "clear",
        "help",
        "quote",
        "double [number]",
      ].forEach((cmd) => appendResponse(outputElement, cmd));
      break;
    case "quote":
      inputElement.disabled = true;
      fetchQuote(onSuccess, onError);
      break;
    case "double":
      const number = parseInt(command.split(" ")[1], 10);
      if (!isNaN(number)) {
        appendResponse(outputElement, `terminal: ${number * 2}`);
      } else {
        appendResponse(
          outputElement,
          "terminal: Błąd: Komenda 'double' oczekuje liczby.",
          true
        );
      }
      break;
    default:
      const isCommandNotFound = !customCommands[command.split(" ")[0]];
      appendResponse(
        outputElement,
        isCommandNotFound
          ? `terminal: Nie znaleziono komendy: ${command}`
          : `terminal: ${customCommands[command.split(" ")[0]].msg}`,
        isCommandNotFound
      );
  }
};
