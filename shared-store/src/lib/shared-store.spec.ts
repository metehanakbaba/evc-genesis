import { sharedStore } from './shared-store.js';

describe('sharedStore', () => {
  it('should work', () => {
    expect(sharedStore()).toEqual('shared-store');
  })
})
