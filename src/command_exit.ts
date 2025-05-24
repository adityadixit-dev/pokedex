import { State } from "./state.js";

export async function commandExit(state: State) {
  console.log("Closing the Pokedex... Goodbye!");
  state.pokeapi.closeCache();
  state.rl.close();
  process.exit(0);
}
