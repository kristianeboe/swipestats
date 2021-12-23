export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export function omitMultipleKeys<T>(object: T) {
  return <K extends keyof T>(...parts: Array<K>): Omit<T, K> => {
    return (Object.keys(object) as Array<keyof T>).reduce((acc, key) => {
      if (!parts.includes(key as any)) {
        acc[key] = object[key];
      }
      return acc;
    }, {} as T);
  };
}
