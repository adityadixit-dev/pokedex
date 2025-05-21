import { createInterface } from "readline";
import { getCommands } from "./commands.js";

export function cleanInput(input: string): string[] {
  return input
    .trim()
    .toLowerCase()
    .split(" ")
    .filter((word) => word);
}

export function startREPL() {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > ",
  });

  rl.prompt();

  rl.on("line", (input) => {
    const words = cleanInput(input);

    if (words.length === 0) {
      rl.prompt();
      return;
    }

    const allCommands = getCommands();
    const inputCommand = allCommands[words[0]];

    if (!inputCommand) {
      console.log("Unknown Command");
      console.log("Type 'help' for a list of commands");
      rl.prompt();
      return;
    }

    inputCommand.callback(allCommands);

    rl.prompt();
  });
}
