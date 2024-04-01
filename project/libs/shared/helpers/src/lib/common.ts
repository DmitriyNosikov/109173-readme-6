import { plainToClass, ClassConstructor, ClassTransformOptions } from 'class-transformer';
import { PlainObject } from '../../../core/src/index'

export function fillDTO<T, O extends PlainObject | PlainObject[]> (
  DTOClass: ClassConstructor<T>,
  plainObject: O,
  options: ClassTransformOptions = { excludeExtraneousValues: true }
): T | T[] {
  return plainToClass(DTOClass, plainObject, options);
}
