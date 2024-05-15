import { plainToClass, ClassConstructor, ClassTransformOptions } from 'class-transformer';

export type DateTimeUnit = 's' | 'h' | 'd' | 'm' | 'y';
export type TimeAndUnit = { value: number; unit: DateTimeUnit };

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

// Exclude keys from object
export function excludeKeys<T, Key extends keyof T>(
  object: T,
  keys: Key[]
): Omit<T, Key> {
  const excludedKeysObject = Object.fromEntries(
    Object.entries(object).filter(([key]) => !keys.includes(key as Key))
  );
  return excludedKeysObject as Omit<T, Key>;
}

export function getDate(): string {
  return new Date().toISOString();
}

export function parseTime(time: string): TimeAndUnit {
  const regex = /^(\d+)([shdmy])/;
  const match = regex.exec(time);

  if (!match) {
    throw new Error(`[parseTime] Incorrect time string: ${time}`);
  }

  const [, valueRaw, unitRaw] = match;
  const value = parseInt(valueRaw, 10);
  const unit = unitRaw as DateTimeUnit;

  if (isNaN(value)) {
    throw new Error(`[parseTime] Can't parse value count. Result is NaN.`);
  }

  return { value, unit }
}

export function getMongoConnectionString({ username, password, host, port, dbName, authDatabase }): string {
  // https://www.mongodb.com/docs/manual/reference/connection-string/#standard-connection-string-format
  return `mongodb://${username}:${password}@${host}:${port}/${dbName}?authSource=${authDatabase}`
}

export function getRabbitMQConnectionString({username, password, host, port}): string {
  return `amqp://${username}:${password}@${host}:${port}`;
}
