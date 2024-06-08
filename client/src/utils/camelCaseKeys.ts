const toCamelCase = (str: string): string => {
  return str.replace(/([-_][a-z])/gi, (match) => {
    return match.toUpperCase().replace('-', '').replace('_', '');
  });
};

const isPlainObject = (obj: any): obj is Record<string, any> => {
  return Object.prototype.toString.call(obj) === '[object Object]';
};

export const camelCaseKeys = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map((item) => camelCaseKeys(item));
  } else if (isPlainObject(obj)) {
    return Object.keys(obj).reduce((acc: Record<string, any>, key: string) => {
      const camelCasedKey = toCamelCase(key);
      acc[camelCasedKey] = camelCaseKeys(obj[key]);
      return acc;
    }, {});
  } else {
    return obj;
  }
};
