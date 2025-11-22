// utils/debounceAsync.ts
export function debounceAsync<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  delay = 300
) {
  let timer: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>) =>
    new Promise<ReturnType<T>>((resolve) => {
      clearTimeout(timer);

      timer = setTimeout(async () => {
        const result = await fn(...args);
        resolve(result);
      }, delay);
    });
}

