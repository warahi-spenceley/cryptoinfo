import { get } from 'lodash';

/**@TODO Make file Typescript. Currently lodash is not available in nodemodules when this is a TS file.*/

/**
 * Sort objects in alphabetical order (ascending).
 * @param {Object} objectA The first object to be compared.
 * @param {Object} objectB The second object to be compared.
 * @param {string} propertyPath The name of the property to be compared.
 * @returns Whether or not the property in objectA comes before, after or is the same as property in objectB.
 */
export const sortAlphabetically = (objectA, objectB, propertyPath) => {
  const valueA = get(objectA, propertyPath);
  if (!valueA) return -1;
  
  const valueB = get(objectB, propertyPath);
  if (!valueB) return 1;
  
  return valueA.localeCompare(valueB);
};