type PartialObject<T> = {
  [K in keyof T]?: T[K] extends object ? PartialObject<T[K]> : T[K];
};

/**
 * Утилита для замены значений в исходном объекте на значения из шаблона, поддерживающая большую вложенность
 * @param source - исходный объект
 * @param replacements - шаблон с новыми значениями, которые заменяют соответствующие поля в исходном объекте
 * @returns новый объект с замененными значениями
 */

export const replaceValuesIteratively = <T>(
  source: T,
  replacements: PartialObject<T>,
): T => {
  // Копируем исходный объект
  const result = JSON.parse(JSON.stringify(source));

  // Стек для обхода объектов, каждый элемент — кортеж [currentResult, currentSource, currentReplacements]
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
          // Если значения — объекты, добавляем их в стек для дальнейшей обработки
          currentResult[key] = structuredClone(currentSource[key]); // Копируем вложенный объект
          stack.push([
            currentResult[key],
            currentSource[key],
            currentReplacements[key] as PartialObject<any>,
          ]);
        } else {
          // Иначе просто заменяем значение
          currentResult[key] = currentReplacements[key];
        }
      }
    }
  }

  return result;
};
