import { TinderProfile } from '@prisma/client';

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

export function getAgeFromBirthdate(birthDate: Date, birthDateString?: string) {
  // const birthDate = new Date(birthDateString);
  const ageDifMs = Date.now() - birthDate.getTime();
  const ageDate = new Date(ageDifMs); // miliseconds from epoch
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

export function getLabelForTinderProfile(tinderProfile: TinderProfile) {
  return tinderProfile.gender + ', ' + getAgeFromBirthdate(new Date(tinderProfile.birthDate));
}

export function getRandomSubarray(arr: any[], size: number) {
  var shuffled = arr.slice(0),
    i = arr.length,
    temp,
    index;
  while (i--) {
    index = Math.floor((i + 1) * Math.random());
    temp = shuffled[index];
    shuffled[index] = shuffled[i];
    shuffled[i] = temp;
  }
  return shuffled.slice(0, size);
}
