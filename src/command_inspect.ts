import { Pokemon } from "./pokeapi.js";
import { State } from "./state.js";

export async function commandInspect(
  state: State,
  ...args: string[]
): Promise<void> {
  if (args.length !== 1) {
    console.log("Please use inspect <pokemon name> to inspect");
    throw new Error("Incorrect Arguements for inspect");
  }

  const pokemonName = args[0];
  if (!(pokemonName in state.pokedex)) {
    console.log(`${pokemonName} is not in the pokedox`);
    return;
  }
  const pokemon = state.pokedex[pokemonName];
  displayPokemonStats(pokemon);
}

function displayPokemonStats(pokemon: Pokemon): void {
  console.log(`Name: ${pokemon.name}`);
  console.log(`Height: ${pokemon.height}`);
  return;
}
