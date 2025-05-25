import { State } from "./state";

export async function commandPokedex(state: State): Promise<void> {
  if (!state.pokedex) {
    console.log(`You have not caught any pokemon`);
    return;
  }
  console.log("Your Pokemon:");
  for (const pokemon in state.pokedex) {
    console.log(` - ${pokemon}`);
  }
  return;
}
