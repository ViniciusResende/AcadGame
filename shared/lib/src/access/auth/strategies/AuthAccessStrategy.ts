/**
 * @category Access
 * @module AuthAccess
 */

/** Utilities */
import { Utilities } from '../../../utils/Utilities';

/** Interfaces */
import { IApiAcadAuthResponse } from '../../../resource/api/acad/ApiAcadInterfaces';

/** Classes */
import { ApiAcad } from '../../../resource/api/acad/ApiAcad';

/**
 * Class that enables the creation of custom Auth access strategies for various
 * Auth types.
 */
export abstract class AuthAccessStrategy {
  #apiAcad: ApiAcad;

  constructor() {
    this.#apiAcad = this.#getApiAcadInstance();
    this.#addEventListeners();
  }

  /**
   * Adds the event listener for configuration changes.
   */
  #addEventListeners() {
    const onConfigurationChanged = this.#onConfigurationChanged.bind(this);
    Utilities.subscribe(
      Utilities.EVENTS.CONFIGURATION_CHANGED,
      onConfigurationChanged
    );
  }

  /**
   * Returns a new ApiAcad instance with the current configuration from Utilities.
   *
   * @returns The ApiAcad instance with updated configuration
   */
  #getApiAcadInstance(): ApiAcad {
    const { baseApiUrl } = Utilities.configuration;
    const apiAcad = new ApiAcad(baseApiUrl || '');
    return apiAcad;
  }

  /**
   * Event handler to deal with configuration changes.
   * It will update the strategy's ApiAcad instance with the new configuration.
   */
  #onConfigurationChanged() {
    this.#apiAcad = this.#getApiAcadInstance();
  }

  /**
   * Retrieves an payload containing a message and token using the authentication
   * method for retrieving it.
   *
   * @param authBody - An body object containing the necessary info for authenticate
   * in a given method
   * @returns The response payload containing message and token
   */
  abstract auth(authBody: unknown): Promise<IApiAcadAuthResponse>;

  /**
   * Getter for the API to be used for doing the authentication.
   *
   * @returns The API class instance
   */
  get api(): ApiAcad {
    return this.#apiAcad;
  }
}
