/**
 * @category Utility Class
 * @module PubSub
 */

/**
 * Class which extends the base Error and can be identified as a specific error
 * related to publish/subscribe design pattern implementation.
 */
export class PubSubError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'PubSubError';
  }
}
