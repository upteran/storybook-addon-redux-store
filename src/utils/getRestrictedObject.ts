type PartialObject<T> = {
  [K in keyof T]?: T[K] extends object ? PartialObject<T[K]> : T[K];
};

/**
 * Utility to get a restricted object
 * @param source - source object
 * @param template - an object template that defines which fields to take from the original object
 * @returns restricted object
 */

export const getRestrictedObject = <T>(
  source: T,
  template: PartialObject<T>,
): PartialObject<T> => {
  const result: PartialObject<T> = {};

  for (const key in template) {
    if (template[key] !== undefined && source[key as keyof T] !== undefined) {
      if (
        typeof template[key] === "object" &&
        template[key] !== null &&
        typeof source[key as keyof T] === "object" &&
        source[key as keyof T] !== null
      ) {
        // Recursively copy nested objects, do a type cast
        result[key as keyof T] = getRestrictedObject(
          source[key as keyof T],
          template[key] as PartialObject<T[keyof T]>,
        ) as T[keyof T] extends object ? PartialObject<T[keyof T]> : T[keyof T];
      } else {
        // Copy value
        result[key as keyof T] = source[key as keyof T];
      }
    }
  }

  return result;
};
