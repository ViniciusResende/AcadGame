/**
 * @category Library
 * @module Utilities
 */

/** Types */
import { GenericCallbackFunction } from '../data/types/CommonTypes';

/** Enums */
import { UtilitiesEvents } from './UtilitiesEnums';

/** Interfaces */
import { IClass, ILibConfiguration } from '../data/interfaces/CommonInterfaces';

/** Classes */
import { PubSub } from './classes/pubsub/PubSub';
import { Security } from './classes/security/Security';

/**
 * Bus to provide access to all utility services.
 */
class Utilities extends PubSub {
  #config: ILibConfiguration;

  EVENTS: typeof UtilitiesEvents;
  pubSub: IClass<PubSub>;

  constructor() {
    super();
    this.#config = {};
    this.EVENTS = UtilitiesEvents;
    this.pubSub = PubSub;
  }

  /**
   * Returns the current state for the library configuration.
   *
   * @returns Library configuration object
   */
  get configuration(): ILibConfiguration {
    return JSON.parse(JSON.stringify(this.#config));
  }

  /**
   * Extends the current library configuration with the provided attributes.
   *
   * @param config - Attributes to extend the current library configuration
   */
  setConfiguration(config: ILibConfiguration): void {
    Object.assign(this.#config, config);
    this.publish(UtilitiesEvents.CONFIGURATION_CHANGED, this.configuration);
  }

  /**
   * Prevents the return of a NaN value for numbers, parsing invalid numbers as
   * zero.
   *
   * @param value - Value to be parsed as a number
   * @returns The number parsed from the given value
   */
  getNumber(value: unknown) {
    return Number(value) || 0;
  }

  /**
   * Returns a value from a nested object by resolving the provided path.
   *
   * @param object - Object to resolve the path
   * @param path - Path for the desired value
   * @param defaultValue - Default value when path is not resolved
   * @returns The value for the path or the default value if not found
   */
  resolvePath<T>(object: unknown, path: string, defaultValue?: T) {
    type ObjectNode = Record<string, unknown> | undefined;
    return path
      .split('.')
      .reduce(
        (o: unknown, p: string) => (o as ObjectNode)?.[p] ?? defaultValue,
        object
      ) as T;
  }

  /**
   * Method responsible for subscribing a callback function to all security class
   * fail authentication events
   *
   * @param callback - The callback function to be executed in case of authentication
   * fail event dispatch.
   */
  subscribeSecurityFailEvents(callback: GenericCallbackFunction) {
    Security.subscribeSecurityFailEvents(callback);
  }

  /**
   * Method responsible for unsubscribing a callback function to all security class
   * fail authentication events
   *
   * @param callback - The subscribe callback function to be unsubscribed.
   */
  unsubscribeSecurityFailEvents(callback: GenericCallbackFunction) {
    Security.unsubscribeSecurityFailEvents(callback);
  }
}

/** Singleton for Utilities class */
const utilities = new Utilities();

export { Utilities as UtilitiesClass, utilities as Utilities };
