import { ShallowLocations } from "./pokeapi.js";
import { State } from "./state.js";

export async function commandMapForward(state: State) {
  const locations: ShallowLocations = await state.pokeapi.fetchLocations(
    state.nextLocationsURL,
  );

  for (const location of Object.values(locations.results)) {
    console.log(location.name);
  }
  state.nextLocationsURL = locations.next;
  state.prevLocationsURL = locations.previous ?? "";
}

export async function commandMapBackward(state: State) {
  if (!state.prevLocationsURL) {
    console.log("You are already on the first page");
    return;
  }

  const locations: ShallowLocations = await state.pokeapi.fetchLocations(
    state.prevLocationsURL,
  );

  for (const location of Object.values(locations.results)) {
    console.log(location.name);
  }
  state.nextLocationsURL = locations.next;
  state.prevLocationsURL = locations.previous;
}

// TODO: Combine the displaying so only one function is used to display locations
