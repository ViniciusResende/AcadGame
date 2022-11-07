/**
 * @category Utility Class
 * @module Security
 */

/**
 * Enumerated values for Security events.
 */
export enum SecurityEvents {
  API_REQUEST_UNAUTHORIZED = 'api_request_unauthorized',
  EXCLUDE_AUTH_TOKEN = 'exclude_auth_token',
  NEW_AUTH_TOKEN_OBTAINED = 'new_auth_token_obtained',
  NO_AUTH_TOKEN_STORED = 'no_auth_token_stored',
}
