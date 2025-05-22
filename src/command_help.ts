import { State, type CLICommand } from "./state.js";

export function commandHelp(state: State) {
  console.log();
  console.log("Welcome to the Pokedex!");
  console.log("Usage:");
  const commands = state.commands;
  console.log();
  for (const command in commands) {
    const currCommand = commands[command];
    console.log(`${currCommand.name}: ${currCommand.description}`);
  }
}
