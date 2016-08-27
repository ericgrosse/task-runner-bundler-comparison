import expect from 'expect';

describe('Array', () => {
  it('should return -1 when the value is not present', () => {
    expect(-1).toBe([1,2,3].indexOf(4));
  });
  it('should correctly filter elements in an array', () => {
    const arr = [1,2,3,4,5];
    const newArr = arr.filter(el => el > 3);
    expect(newArr.length).toBe(2);
  });
  it('should correctly map elements in an array', () => {
    const arr = [1,2,3,4,5];
    const newArr = arr.map(el => el * 2);
    expect(newArr).toEqual([2,4,6,8,10]);
  });
});

describe('Object', () => {
  it('should convert an int to a string with the toString method', () => {
    const val = 5;
    const valToString = val.toString();
    expect(val).toNotBe(valToString);
    expect(valToString).toBe('5');
  });
  it('should correctly test whether an object has a certain property', () => {
    const obj = {a: 1, b: 2};
    expect(obj.hasOwnProperty('a')).toBe(true);
    expect(obj.hasOwnProperty('c')).toBe(false);
  });
});

describe('String', () => {
  it('should convert a string to lowercase', () => {
    const str = 'HELLO';
    const strLower = str.toLowerCase();
    expect(strLower).toBe('hello');
  });
  it('should convert a string to uppercase', () => {
    const str = 'hello';
    const strLower = str.toUpperCase();
    expect(strLower).toBe('HELLO');
  });
  it('should remove spaces from both ends of a string', () => {
    const str = ' hello there ';
    const strTrimmed = str.trim();
    expect(strTrimmed).toBe('hello there');
  });
  it('should split the string into an array of strings based on the provided delimiter', () => {
    const str = 'she-sells-seashells-down-by-the-seashore';
    const strSplit = str.split('-');
    expect(Array.isArray(strSplit)).toBe(true);
    expect(strSplit.length).toBe(7);
  });
});