/**
 * @category Utility Class
 * @module LocalStorage
 */

/**
 * Class that helps interactions with web client Local Storage.
 */
export class LocalStorage {
  #localStorage: Storage;

  constructor() {
    this.#localStorage = window.localStorage;
  }

  getLocalStorageItem(key: string): string | null {
    return this.#localStorage.getItem(key);
  }

  setLocalStorageItem(key: string, item: string) {
    this.#localStorage.setItem(key, item);
  }

  removeLocalStorageItem(key: string) {
    this.#localStorage.removeItem(key);
  }
}
