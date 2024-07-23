export const arrayToObject = (array: any[]) =>
  array.reduce((obj, item) => {
    obj[item.key] = item.value;
    return obj;
  }, {});
