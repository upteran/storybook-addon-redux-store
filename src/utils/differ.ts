export const differ = (prev: any, next: any): any => {
  if (prev === next) return undefined; // Значения одинаковые, изменений нет

  // Если один из них null, а другой объект — сравниваем их содержимое
  if (prev === null && typeof next === "object" && next !== null) prev = {};
  if (next === null && typeof prev === "object" && prev !== null) next = {};

  // Если один из них не объект или массив — фиксируем изменение
  if (typeof prev !== "object" || typeof next !== "object") return next;

  let diff: Record<string, any> = {};
  let hasChanges = false;

  // Проверяем старые ключи (удаление/изменение)
  for (const key in prev) {
    if (!(key in next)) {
      diff[key] = undefined; // Поле удалено
      hasChanges = true;
    } else {
      const subDiff = differ(prev[key], next[key]);
      if (subDiff !== undefined) {
        diff[key] = subDiff;
        hasChanges = true;
      }
    }
  }

  // Проверяем новые ключи (добавление)
  for (const key in next) {
    if (!(key in prev)) {
      diff[key] = next[key];
      hasChanges = true;
    }
  }

  return hasChanges ? diff : undefined;
};
