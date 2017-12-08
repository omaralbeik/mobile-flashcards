/**
 * Create a random id
 */
export function generateId(date = new Date()) {
  return `${date.getTime()}`;
}

/**
 * Create an object from a given array
 */
export function objectFromArray(arr, key = 'id') {
  if (arr && arr.length) {
    return arr.reduce((v, i) => {
      v[i[key]] = i;
      return v;
    }, {});
  } else {
    return {};
  }

}

/**
 * Create an array from a given object
 */
export function arrayFromObject(obj, key = 'id') {
  if (!obj) {
    return [];
  }
  return Object.keys(obj).map(key => (obj[key]));
}
