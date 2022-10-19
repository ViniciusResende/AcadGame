/**
 * @category Utility Class
 * @module PubSub
 */

/** Types */
import {
  GenericCallbackFunction,
  CallbackMap,
} from '../../../data/types/CommonTypes';

/** Errors */
import { PubSubError } from './PubSubErrors';

/**
 * Class that enables implementation of publish/subscribe design pattern.
 */
export class PubSub {
  #subscriptions: Map<string, CallbackMap>;
  #lastSubscriptionId: number;

  constructor() {
    this.#subscriptions = new Map<string, CallbackMap>();
    this.#lastSubscriptionId = 0;
  }

  /**
   * Checks if the provided event name is valid and throws PubSubError if it is
   * invalid.
   *
   * @param eventName - Event name to be checked
   *
   * @throws {@link PubSubError}
   */
  #checkEventName(eventName: string): void {
    if (eventName.length === 0) {
      throw new PubSubError('Invalid event name');
    }
  }

  /**
   * Checks if the provided callback function is valid and throws PubSubError if
   * it is invalid.
   *
   * @param callback - Function to be checked
   *
   * @throws {@link PubSubError}
   */
  #checkCallbackFunction(callback: GenericCallbackFunction): void {
    if (typeof callback !== 'function') {
      throw new PubSubError('Invalid callback function');
    }
  }

  /**
   * Handles unsubscription for the provided event name and callback function.
   *
   * @param eventName - Event name for the registered callback
   * @param callback - Function to have its subscription removed
   */
  #unsubscribeCallback(
    eventName: string,
    callback: GenericCallbackFunction
  ): void {
    const callbacks: CallbackMap | undefined =
      this.#subscriptions.get(eventName);
    if (callbacks) {
      callbacks.forEach((subscriptionCallback, subscriptionId) => {
        if (subscriptionCallback === callback) {
          callbacks.delete(subscriptionId);
        }
      });
    }
  }

  /**
   * Adds a subscription callback for the provided event name.
   *
   * @sealed
   * @param eventName - Event name that will trigger the callback
   * @param callback - Function to be executed when event is published
   */
  subscribe(eventName: string, callback: GenericCallbackFunction): void {
    this.#checkEventName(eventName);
    this.#checkCallbackFunction(callback);
    const subscriptionId = `subscription_${this.#lastSubscriptionId++}`;
    const callbacks: CallbackMap =
      this.#subscriptions.get(eventName) ||
      new Map<string, GenericCallbackFunction>();
    callbacks.set(subscriptionId, callback);
    this.#subscriptions.set(eventName, callbacks);
  }

  /**
   * Removes subscription callback(s) for the provided event name.
   *
   * If callback not provided, all the callbacks for the provided event name
   * will be removed.
   *
   * @sealed
   * @param eventName - Event name for the registered callback
   * @param callback - Function to have its subscription removed
   */
  unsubscribe(eventName: string): void;
  unsubscribe(eventName: string, callback: GenericCallbackFunction): void;
  unsubscribe(eventName: string, callback?: GenericCallbackFunction): void {
    if (!callback) {
      this.#subscriptions.delete(eventName);
    } else {
      this.#unsubscribeCallback(eventName, callback);
    }
  }

  /**
   * Trigger all registered subscription callbacks for a specific event name.
   *
   * @sealed
   * @param eventName - Event name to trigger subscriptions from
   * @param payload - Payload to be passed to the callback function
   */
  publish(eventName: string, ...payload: unknown[]): void {
    this.#checkEventName(eventName);
    const callbacks: CallbackMap =
      this.#subscriptions.get(eventName) ||
      new Map<string, GenericCallbackFunction>();
    callbacks.forEach((callback) => {
      callback(...payload);
    });
  }

  /**
   * Clears all subscriptions for this instance.
   *
   * @sealed
   */
  unsubscribeFromAll(): void {
    this.#subscriptions.clear();
  }
}
