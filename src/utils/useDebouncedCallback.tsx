import { useCallback, useRef } from "react";

export function useDebouncedCallback<T>(
  callback: (value: T) => void,
  delay: number,
) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  return useCallback(
    (value: T) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      timeoutRef.current = setTimeout(() => {
        callback(value);
      }, delay);
    },
    [callback, delay],
  );
}
