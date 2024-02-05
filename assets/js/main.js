import { formatLoginTime } from "./helpers/formatTime";
import { setupCommandInput } from "./components/commandInput";
import { updateSuggestions } from "./components/commandSuggestions";
import { CUSTOM_COMMANDS } from "./customCommands";

const initializeTerminal = (terminalId) => {
  const terminalComponent = document.getElementById(terminalId);
  if (!terminalComponent) {
    console.error("Terminal initialization failed: Wrapper not found.");
    return;
  }

  const output = terminalComponent.querySelector(".terminal__output");
  const input = terminalComponent.querySelector(".terminal__input");
  const suggestions = terminalComponent.querySelector(".terminal__suggestions");
  const lastLoginTimeElement = terminalComponent.querySelector(
    ".terminal__message span"
  );

  if (!output || !input || !suggestions || !lastLoginTimeElement) {
    console.error(
      "Terminal initialization failed: One or more internal elements not found."
    );
    return;
  }

  let lastLoginTime = localStorage.getItem("lastLoginTime");
  if (!lastLoginTime) {
    lastLoginTime = new Date().toISOString();
    localStorage.setItem("lastLoginTime", lastLoginTime);
  }
  lastLoginTimeElement.textContent = formatLoginTime(lastLoginTime);

  setupCommandInput(input, output, CUSTOM_COMMANDS, suggestions);
  updateSuggestions(input, suggestions, CUSTOM_COMMANDS);
};

initializeTerminal("terminal");
