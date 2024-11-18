// Probably deprecated

type PartialObject<T> = {
  [K in keyof T]?: T[K] extends object ? PartialObject<T[K]> : T[K];
};

/**
 * A utility for replacing values ​​in a source object with values ​​from a template
 * @param source - source object
 * @param replacements - template with new values ​​that replace the corresponding fields in the original object
 * @returns new object with replaced values
 */

export const replaceValuesIteratively = <T>(
  source: T,
  replacements: PartialObject<T>,
): T => {
  // Copying source object
  const result = JSON.parse(JSON.stringify(source));

  // Stack for traversing objects, each element is a tuple [currentResult, currentSource, currentReplacements]
  const stack: Array<[any, any, PartialObject<any>]> = [
    [result, source, replacements],
  ];

  while (stack.length > 0) {
    const [currentResult, currentSource, currentReplacements] = stack.pop()!;

    for (const key in currentReplacements) {
      if (
        currentReplacements[key] !== undefined &&
        currentSource[key] !== undefined
      ) {
        if (
          typeof currentReplacements[key] === "object" &&
          typeof currentSource[key] === "object"
        ) {
          // If the values ​​are objects, add them to the stack for further processing
          currentResult[key] = structuredClone(currentSource[key]); // Copying a nested object
          stack.push([
            currentResult[key],
            currentSource[key],
            currentReplacements[key] as PartialObject<any>,
          ]);
        } else {
          // Otherwise replace the value
          currentResult[key] = currentReplacements[key];
        }
      }
    }
  }

  return result;
};
