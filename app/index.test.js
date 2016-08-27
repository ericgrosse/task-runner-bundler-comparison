import expect from 'expect';

describe('Array', () => {
  it('should return -1 when the value is not present', () => {
    expect(-1).toEqual([1,2,3].indexOf(4));
  });
});