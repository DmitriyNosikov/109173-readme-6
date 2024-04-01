export interface HasherInterface {
  getHash(value: string): string;
  checkHash(value: string, hashedValue: string);
}
