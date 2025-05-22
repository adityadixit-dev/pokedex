import { State } from "./state.js";

export function commandHelp(state: State) {
  const commands = state.commands;

  console.log();
  console.log("Welcome to the Pokedex!");
  console.log("Usage:");
  console.log();

  for (const command in commands) {
    const currCommand = commands[command];
    console.log(`${currCommand.name}: ${currCommand.description}`);
  }

  console.log();
}
