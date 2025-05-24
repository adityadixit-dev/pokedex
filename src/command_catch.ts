import { Pokemon } from "./pokeapi.js";
import { State } from "./state.js";

export async function commandCatch(state: State, ...args: string[]) {
  if (args.length !== 1) {
    console.log("Please use the Syntax: catch <pokemon name>");
    throw new Error("Incorrect Arguements to catch Pokemon");
  }
  const pokemonName = args[0];
  const pokemon: Pokemon = await state.pokeapi.fetchPokemon(pokemonName);
  // TODO: Giving pokemon a 50-50 chance of getting caught for now
  console.log(`Throwing a Pokeball at ${pokemonName}...`);
  if (Math.random() < 0.5) {
    //Caught
    console.log(`${pokemonName} was caught!`);
    state.pokedex[pokemonName] = pokemon;
  } else {
    //Not caught
    console.log(`${pokemonName} escaped!`);
  }
}
