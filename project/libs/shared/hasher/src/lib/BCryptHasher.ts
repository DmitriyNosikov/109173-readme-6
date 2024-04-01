import { HasherInterface } from './hasher.interfase';
import { genSalt, hash, compare } from 'bcrypt';


const SALT_ROUNDS = 10;

export class BCryptHasher implements HasherInterface {
  getHash(value: string): string {
    const salt = genSalt(SALT_ROUNDS);

    return hash(value, salt);
  }

  checkHash(value: string, hashedValue: string) {
    return compare(value, hashedValue);
  }
}
