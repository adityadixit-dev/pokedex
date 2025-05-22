import { State } from "./state.js";

export function cleanInput(input: string): string[] {
  return input
    .trim()
    .toLowerCase()
    .split(" ")
    .filter((word) => word);
}

export function startREPL(state: State) {
  const rl = state.rl;
  const allCommands = state.commands;

  rl.prompt();

  rl.on("line", (input) => {
    const words = cleanInput(input);

    if (words.length === 0) {
      rl.prompt();
      return;
    }

    const inputCommand = allCommands[words[0]];

    if (!inputCommand) {
      console.log("Unknown Command");
      console.log("Type 'help' for a list of commands");
      rl.prompt();
      return;
    }

    inputCommand.callback(state);

    rl.prompt();
  });
}
