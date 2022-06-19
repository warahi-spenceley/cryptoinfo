import * as TableUtils from './TableUtils';

describe('test sortAlphabetically', () => {

  it('should return negative if property in first object should come before property in second object', () => {
    const objectA = { name: "Alpha" };
    const objectB = { name: "Beta" };
    const value = TableUtils.sortAlphabetically(objectA, objectB, "name");
    expect(value).toEqual(-1);
  });

  it('should return 0 if property in first object is same as property in second object', () => {
    const objectA = { name: "Alpha" };
    const objectB = { name: "Alpha" };
    const value = TableUtils.sortAlphabetically(objectA, objectB, "name");
    expect(value).toEqual(0);
  });

  it('should return positive if property in first object should come after property in second object', () => {
    const objectA = { name: "Zulu" };
    const objectB = { name: "Alpha" };
    const value = TableUtils.sortAlphabetically(objectA, objectB, "name");
    expect(value).toEqual(1);
  });

  it('should return negative if property in first object is lower case and should come before property in second object', () => {
    const objectA = { name: "alpha" };
    const objectB = { name: "Beta" };
    const value = TableUtils.sortAlphabetically(objectA, objectB, "name");
    expect(value).toEqual(-1);
  });

  it('should return positive if property in first object is lower case and should come after property in second object', () => {
    const objectA = { name: "zulu" };
    const objectB = { name: "Alpha" };
    const value = TableUtils.sortAlphabetically(objectA, objectB, "name");
    expect(value).toEqual(1);
  });

  it('should return negative if first object is lower case', () => {
    const objectA = { name: "alpha" };
    const objectB = { name: "Alpha" };
    const value = TableUtils.sortAlphabetically(objectA, objectB, "name");
    expect(value).toEqual(-1);
  });

  it('should return negative if first object not provided', () => {
    const objectB = { name: "Alpha" };
    const value = TableUtils.sortAlphabetically(undefined, objectB, "name");
    expect(value).toEqual(-1);
  });

  it('should return positive if second object not provided', () => {
    const objectA = { name: "Alpha" };
    const value = TableUtils.sortAlphabetically(objectA, undefined, "name");
    expect(value).toEqual(1);
  });

  it('should return negative if property in first object not provided', () => {
    const objectA = { id: "Zulu" };
    const objectB = { name: "Alpha" };
    const value = TableUtils.sortAlphabetically(objectA, objectB, "name");
    expect(value).toEqual(-1);
  });

  it('should return positive if property in second object not provided', () => {
    const objectA = { name: "Alpha" };
    const objectB = { id: "zulu" };
    const value = TableUtils.sortAlphabetically(objectA, objectB, "name");
    expect(value).toEqual(1);
  });

  it('should support nested properties', () => {
    const objectA = {
      user: {
        name: "Last"
      }
    };
    const objectB = {
      user: {
        name: "first"
      }
    };
    const value = TableUtils.sortAlphabetically(objectA, objectB, "user.name");
    expect(value).toEqual(1);
  });
});