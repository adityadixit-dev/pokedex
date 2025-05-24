import { Cache } from "./pokecache.js";

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  #pokeCache: Cache;

  constructor(cacheInterval: number) {
    this.#pokeCache = new Cache(cacheInterval);
  }

  closeCache() {
    this.#pokeCache.stopReapLoop();
  }

  async fetchPokemon(pokemonName: string): Promise<Pokemon> {
    const url = `${PokeAPI.baseURL}/pokemon/${pokemonName}`;
    const cachedPokemon = this.#pokeCache.get<Pokemon>(url);
    if (cachedPokemon) {
      console.log();
      console.log("Returning Cached Pokemon");
      console.log();
      return cachedPokemon;
    }
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `Unable to Fetch ${pokemonName}: ${response.status}:${response.statusText}`,
      );
    }
    const pokemon: Pokemon = await response.json();
    this.#pokeCache.add<Pokemon>(url, pokemon);
    return pokemon;
  }

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    if (!pageURL) {
      pageURL = `${PokeAPI.baseURL}/location-area/`;
    }
    /*
     * Solution Files use this
     * const url = pageURL || `${PokeAPI.baseURL}/location-area`;
     */

    const cachedLocations = this.#pokeCache.get<ShallowLocations>(pageURL);
    if (cachedLocations) {
      console.log();
      console.log("returning Cached Value");
      console.log();
      return cachedLocations;
    }

    try {
      const response = await fetch(pageURL);

      if (!response.ok) {
        throw new Error(
          `fetchLocations - ${response.status}: ${response.statusText}`,
        );
      }

      const locations: ShallowLocations = await response.json();
      this.#pokeCache.add(pageURL, locations);
      return locations;
    } catch (e) {
      throw new Error(`Error Fetching Locations: ${(e as Error).message}`);
    }
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const locationURL = `${PokeAPI.baseURL}/location-area/${locationName}`;

    const cachedLocation = this.#pokeCache.get<Location>(locationURL);
    if (cachedLocation) {
      return cachedLocation;
    }

    try {
      const response = await fetch(locationURL);

      if (!response.ok) {
        throw new Error(
          `fetchLocation - ${response.status}: ${response.statusText}`,
        );
      }

      const location: Location = await response.json();
      this.#pokeCache.add(locationURL, location);
      return location;
    } catch (e) {
      throw new Error(
        `Error Fetching Location ${locationName}: ${(e as Error).message}`,
      );
    }
  }
}

export type ShallowLocations = {
  count: number;
  next: string;
  previous: string;
  results: { name: string; url: string }[];
};

export type Location = {
  encounter_method_rates: {
    encounter_method: {
      name: string;
      url: string;
    };
    version_details: {
      rate: number;
      version: {
        name: string;
        url: string;
      };
    }[];
  }[];
  game_index: number;
  id: number;
  location: {
    name: string;
    url: string;
  };
  name: string;
  names: {
    language: {
      name: string;
      url: string;
    };
    name: string;
  }[];
  pokemon_encounters: {
    pokemon: {
      name: string;
      url: string;
    };
    version_details: {
      encounter_details: {
        chance: number;
        condition_values: any[];
        max_level: number;
        method: {
          name: string;
          url: string;
        };
        min_level: number;
      }[];
      max_chance: number;
      version: {
        name: string;
        url: string;
      };
    }[];
  }[];
};

export type Pokemon = {
  abilities: {
    ability: {
      name: string;
      url: string;
    };
    is_hidden: boolean;
    slot: number;
  }[];
  base_experience: number;
  forms: {
    name: string;
    url: string;
  }[];
  game_indices: {
    game_index: number;
    version: {
      name: string;
      url: string;
    };
  }[];
  height: number;
  held_items: any[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: {
    move: {
      name: string;
      url: string;
    };
    version_group_details: {
      level_learned_at: number;
      move_learn_method: {
        name: string;
        url: string;
      };
      version_group: {
        name: string;
        url: string;
      };
    }[];
  }[];
  name: string;
  order: number;
  past_types: any[];
  species: {
    name: string;
    url: string;
  };
  sprites: {
    back_default: string;
    back_female: any;
    back_shiny: string;
    back_shiny_female: any;
    front_default: string;
    front_female: any;
    front_shiny: string;
    front_shiny_female: any;
    other: {
      dream_world: {
        front_default: string;
        front_female: any;
      };
      home: {
        front_default: string;
        front_female: any;
        front_shiny: string;
        front_shiny_female: any;
      };
      official_artwork: {
        front_default: string;
        front_shiny: string;
      };
    };
    versions: {
      [generation: string]: {
        [game: string]: {
          back_default: string;
          back_female?: any;
          back_shiny: string;
          back_shiny_female?: any;
          front_default: string;
          front_female?: any;
          front_shiny: string;
          front_shiny_female?: any;
        };
      };
    };
  };
  stats: {
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }[];
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];
  weight: number;
};
