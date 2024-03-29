import { hasher } from './hasher';

describe('hasher', () => {
  it('should work', () => {
    expect(hasher()).toEqual('hasher');
  });
});
