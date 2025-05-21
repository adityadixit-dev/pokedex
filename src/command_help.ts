import type { CLICommand } from "./commands.js";

export function commandHelp(commands: Record<string, CLICommand>) {
  console.log();
  console.log("Welcome to the Pokedex!");
  console.log("Usage:");
  console.log();
  for (const command in commands) {
    const currCommand = commands[command];
    console.log(`${currCommand.name}: ${currCommand.description}`);
  }
}
