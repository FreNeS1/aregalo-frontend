export function to<T, U = Error>(
  promise: Promise<T>,
  errorExt?: Record<string, unknown>
): Promise<[T | undefined, U | null]> {
  return promise
    .then<[T, null]>((data: T) => [data, null])
    .catch<[undefined, U]>((err: U) => {
      if (errorExt) {
        Object.assign(err, errorExt);
      }
      return [undefined, err];
    });
}
