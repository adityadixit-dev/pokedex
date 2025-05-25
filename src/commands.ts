import { commandCatch } from "./command_catch.js";
import { commandExit } from "./command_exit.js";
import { commandExplore } from "./command_explore.js";
import { commandHelp } from "./command_help.js";
import { commandMapBackward, commandMapForward } from "./command_maps.js";
import type { CLICommand } from "./state.js";
import { commandInspect } from "./command_inspect.js";
import { commandPokedex } from "./command_pokedex.js";

export function getCommands(): Record<string, CLICommand> {
  return {
    exit: {
      name: "exit",
      description: "Exits the pokedex",
      callback: commandExit,
    },
    help: {
      name: "help",
      description: "Displays a help message",
      callback: commandHelp,
    },
    map: {
      name: "map",
      description: "Displays next map locations",
      callback: commandMapForward,
    },
    mapb: {
      name: "mapb",
      description: "Displays previous map locations",
      callback: commandMapBackward,
    },
    explore: {
      name: "explore",
      description: "Explore a certain area on the map",
      callback: commandExplore,
    },
    catch: {
      name: "catch",
      description: "Catch a pokemon: Usage: catch <pokemon name>",
      callback: commandCatch,
    },
    inspect: {
      name: "inspect",
      description: "Inspect Pokemons in your collection",
      callback: commandInspect,
    },
    pokedex: {
      name: "pokedex",
      description: "List caught pokemon",
      callback: commandPokedex,
    },
  };
}
