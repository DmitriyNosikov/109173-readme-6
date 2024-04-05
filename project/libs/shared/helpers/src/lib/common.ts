import { plainToClass, ClassConstructor, ClassTransformOptions } from 'class-transformer';

type PlainObject<T> = Partial<Record<keyof T, unknown>>;

export function fillDTO<T, O extends PlainObject<T> | PlainObject<T>[]> (
  DTOClass: ClassConstructor<T>,
  plainObject: O,
  options: ClassTransformOptions = { excludeExtraneousValues: true }
): T | T[] {
  return plainToClass(DTOClass, plainObject, options);
}

export function omitUndefined(value: Record<string, unknown>) {
  const entries = Object.entries(value);
  const filteredEntries = entries.filter(([, value]) => value !== undefined);

  return Object.fromEntries(filteredEntries);
}

export function getdate(): string {
  return new Date().toISOString();
}
