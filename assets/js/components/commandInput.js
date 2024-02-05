import { executeCommand } from "../components/commandOutput.js";
import { createCommandHistoryManager } from "../commandHistory.js";

export function setupCommandInput(
  inputElement,
  outputElement,
  customCommands,
  suggestionsElement
) {
  const commandHistoryManager = createCommandHistoryManager();

  const handleEnterKey = async () => {
    await executeCommand(
      inputElement.value,
      inputElement,
      outputElement,
      customCommands
    );
    suggestionsElement.textContent = "";
    suggestionsElement.classList.remove("terminal__suggestions--visible");
    commandHistoryManager.addCommandToHistory(inputElement.value);
    inputElement.value = "";
  };

  const handleArrowUpKey = () => {
    inputElement.value = commandHistoryManager.getPreviousCommand();
  };

  const handleArrowDownKey = () => {
    inputElement.value = commandHistoryManager.getNextCommand();
  };

  inputElement.addEventListener("keydown", (e) => {
    switch (e.key) {
      case "Enter":
        handleEnterKey();
        break;
      case "ArrowUp":
        handleArrowUpKey();
        e.preventDefault();
        break;
      case "ArrowDown":
        handleArrowDownKey();
        break;
    }
  });
}
