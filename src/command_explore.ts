import { State } from "./state.js";
import type { Location } from "./pokeapi.js";

export async function commandExplore(state: State, ...args: string[]) {
  if (args.length !== 1) {
    console.log("Please use the Syntax: explore <location-name>");
    throw new Error("Incorrect Arguements for explore");
  }
  const locationName = args[0];
  console.log(`Exploring ${locationName}...`);

  try {
    const locationData: Location =
      await state.pokeapi.fetchLocation(locationName);

    console.log("Found Pokemon:");

    const pokemonEncounters = locationData.pokemon_encounters;
    for (const pokeEnc of pokemonEncounters) {
      console.log(` - ${pokeEnc.pokemon.name}`);
    }

    console.log();
  } catch (e) {
    console.log(`Error: ${(e as Error).message}`);
    throw new Error("Unable to get location data");
  }
}
