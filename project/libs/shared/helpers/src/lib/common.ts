import { plainToClass, ClassConstructor, ClassTransformOptions } from 'class-transformer';

type PlainObject<T> = Partial<Record<keyof T, unknown>>;

export function fillDTO<T, O>(
  DtoClass: ClassConstructor<T>,
  plainObject: O,
  options?: ClassTransformOptions,
): T;

export function fillDTO<T, O extends []>(
  DtoClass: ClassConstructor<T>,
  plainObject: 0,
  options?: ClassTransformOptions,
): T[];

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

export function getDate(): string {
  return new Date().toISOString();
}

export function getMongoConnectionString({ username, password, host, port, dbName, authDatabase }): string {
  // https://www.mongodb.com/docs/manual/reference/connection-string/#standard-connection-string-format
  return `mongodb://${username}:${password}@${host}:${port}/${dbName}?authSource=${authDatabase}`
}

export function getRabbitMQConnectionString({username, password, host, port}): string {
  return `amqp://${username}:${password}@${host}:${port}`;
}
