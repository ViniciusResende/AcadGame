/**
 * @category Type
 * @module CommonTypes
 */

/**
 * Type for generic callback functions.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type GenericCallbackFunction = (...args: any[]) => any;

/**
 * Type for callbacks' map.
 */
export type CallbackMap = Map<string, GenericCallbackFunction>;

/**
 * Type for error handling functions.
 */
export type ErrorHandlerFunction = (error: Error) => void;

/**
 * Type for lists' filtering objects.
 */
export type ListFilter = Record<string, string>;

/**
 * Type for lists' sorting order.
 */
export type ListOrderBy = string[];
