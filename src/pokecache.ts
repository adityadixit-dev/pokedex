type CacheEntry<T> = {
  createdAt: number;
  val: T;
};

export class Cache {
  #cache: Map<string, CacheEntry<any>>;
  // #cache = new Map<string, CacheEntry<any>>();
  #reapIntervalId: NodeJS.Timeout | undefined;
  #interval: number;

  constructor(interval: number) {
    this.#cache = new Map();
    this.#reapIntervalId = undefined;
    this.#interval = interval;
    this.#startReapLoop();
  }

  #startReapLoop() {
    // I Implemeted the one in quotes.. the one from BD is using arrow functions
    // this.#reapIntervalId = setInterval(this.#reap.bind(this), this.#interval);
    this.#reapIntervalId = setInterval(() => {
      this.#reap();
    }, this.#interval);
  }

  stopReapLoop() {
    if (this.#reapIntervalId) {
      clearInterval(this.#reapIntervalId);
      this.#reapIntervalId = undefined;
    }
  }

  #reap() {
    // if createdAt < Date.now()-this.#interval then remove the property
    // const keysToRemove: string[] = [];
    for (const [key, cacheVal] of this.#cache) {
      if (cacheVal.createdAt < Date.now() - this.#interval) {
        // keysToRemove.push(key);
        this.#cache.delete(key);
      }
    }
    // for (const key of keysToRemove) {
    //   this.#cache.delete(key);
    // }
  }

  add<T>(key: string, val: T) {
    this.#cache.set(key, {
      createdAt: Date.now(),
      val: val,
    });
  }

  get<T>(key: string): T | undefined {
    return this.#cache.get(key)?.val;
  }
}
