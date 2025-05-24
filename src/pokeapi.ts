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
    const locationURL = `${PokeAPI.baseURL}/location-area/${locationName}}`;

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
