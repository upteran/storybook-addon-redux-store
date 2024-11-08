type PartialObject<T> = {
  [K in keyof T]?: T[K] extends object ? PartialObject<T[K]> : T[K];
};

/**
 * Утилита для получения ограниченного объекта
 * @param source - исходный объект
 * @param template - шаблон объекта, который определяет, какие поля брать из исходного объекта
 * @returns ограниченный объект
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
        typeof source[key as keyof T] === "object"
      ) {
        // Рекурсивно копируем вложенные объекты, делаем приведение типа
        result[key as keyof T] = getRestrictedObject(
          source[key as keyof T],
          template[key] as PartialObject<T[keyof T]>,
        ) as T[keyof T] extends object ? PartialObject<T[keyof T]> : T[keyof T];
      } else {
        // Копируем значение
        result[key as keyof T] = source[key as keyof T];
      }
    }
  }

  return result;
};
