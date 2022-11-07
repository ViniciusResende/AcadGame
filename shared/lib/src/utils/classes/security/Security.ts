/**
 * @category Utility Class
 * @module Security
 */

/** Classes */
import { LocalStorage } from '../local-storage/LocalStorage';
import { PubSub } from '../pubsub/PubSub';

/** Types */
import { GenericCallbackFunction } from '../../../data/types/CommonTypes';

/** Interfaces */
import {
  IClass,
  ILibGeneralErrorPayload,
} from '../../../data/interfaces/CommonInterfaces';

/** Enums */
import { LocalStorageKeysEnum } from '../local-storage/LocalStorageEnums';
import { SecurityEvents } from './SecurityEnums';

/**
 * Class that helps use auth token and subscribe to auth related events.
 */
class Security extends PubSub {
  #localStorage: LocalStorage;

  EVENTS: typeof SecurityEvents;
  pubSub: IClass<PubSub>;

  constructor() {
    super();
    this.#localStorage = new LocalStorage();

    this.EVENTS = SecurityEvents;
    this.pubSub = PubSub;
  }

  /**
   * Private method responsible for storing a auth token in the local storage.
   *
   * @param token - Token to be stored
   */
  #persistAuthToken(token: string) {
    this.#localStorage.setLocalStorageItem(
      LocalStorageKeysEnum.AUTH_TOKEN,
      token
    );
  }

  /**
   * Private method responsible for removing the stored auth token in the local
   * storage.
   *
   */
  #removeAuthToken() {
    this.#localStorage.removeLocalStorageItem(LocalStorageKeysEnum.AUTH_TOKEN);
  }

  /**
   * Returns the current stored token for the security class.
   *
   * @returns Current stored token
   */
  get authToken(): string | null {
    return this.#localStorage.getLocalStorageItem(
      LocalStorageKeysEnum.AUTH_TOKEN
    );
  }

  /**
   * Method responsible for storing a new auth token and publishing a NEW_AUTH_TOKEN_OBTAINED
   * event.
   *
   * @param token - Token to be stored
   */
  setNewAuthToken(token: string): void {
    this.#persistAuthToken(token);
    this.publish(SecurityEvents.NEW_AUTH_TOKEN_OBTAINED, this.authToken);
  }

  /**
   * Method responsible for removing a auth token and publishing a EXCLUDE_AUTH_TOKEN
   * event.
   *
   */
  excludeAuthToken(): void {
    this.#removeAuthToken();
    this.publish(SecurityEvents.EXCLUDE_AUTH_TOKEN, null);
  }

  /**
   * Method responsible for retrieve a stored auth token, in the case witch there
   * is no token stored, will publish a NO_AUTH_TOKEN_STORED event.
   *
   * @returns The stored token if there is any or null otherwise.
   */
  getTokenStored(): string | null {
    const authToken = this.authToken;

    if (authToken) return authToken;

    this.publish(SecurityEvents.NO_AUTH_TOKEN_STORED, authToken);
    return null;
  }

  /**
   * Method responsible for publishing a API_REQUEST_UNAUTHORIZED with a given
   * error payload.
   *
   * @param errorPayload - The error in the LibGeneralErrorPayload format.
   */
  publishApiRequestUnauthorized(errorPayload: ILibGeneralErrorPayload) {
    this.publish(SecurityEvents.API_REQUEST_UNAUTHORIZED, errorPayload);
  }

  /**
   * Method responsible for subscribing a callback function to all security class
   * fail authentication events
   *
   * @param callback - The callback function to be executed in case of authentication
   * fail event dispatch.
   */
  subscribeSecurityFailEvents(callback: GenericCallbackFunction) {
    this.subscribe(SecurityEvents.API_REQUEST_UNAUTHORIZED, callback);
    this.subscribe(SecurityEvents.NO_AUTH_TOKEN_STORED, callback);
  }

  /**
   * Method responsible for unsubscribing a callback function to all security class
   * fail authentication events
   *
   * @param callback - The subscribe callback function to be unsubscribed.
   */
  unsubscribeSecurityFailEvents(callback: GenericCallbackFunction) {
    this.unsubscribe(SecurityEvents.API_REQUEST_UNAUTHORIZED, callback);
    this.unsubscribe(SecurityEvents.NO_AUTH_TOKEN_STORED, callback);
  }
}

/** Singleton for Security class */
const security = new Security();

export { Security as SecurityClass, security as Security };
