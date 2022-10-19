/**
 * @category Utility Class
 * @module Api
 */

/**
 * Type to be used for URL parameters object.
 *
 * Example of URL string and URL parameters object:
 * ```typescript
 * const url = 'http://base.url/user/${userId}/addresses/${addressId}';
 * const urlParams = {
 *   userId: '123',
 *   addressId: 'work',
 * };
 * ```
 */
export type UrlParams = Record<string, string>;
