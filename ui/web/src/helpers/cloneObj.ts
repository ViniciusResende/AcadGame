export function cloneObj<T>(obj: T): T {
  if (obj == null || typeof cloneObj !== 'object') return obj;
  let copy = obj.constructor();
  for (const attr in obj) if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];

  return copy;
}
