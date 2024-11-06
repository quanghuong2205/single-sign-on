export const getCookie = (cname: string) => {
  if (!cname) {
    return;
  }
  const name = cname + '';
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length + 1, c.length);
    }
  }
  return '';
};

/**
 * Set cookie
 **/
export const saveCookie = (cookieData: { name: string; value: string; exdays: number }): void => {
  if (!cookieData?.name) {
    return;
  }
  const date = new Date();
  date.setTime(date.getTime() + cookieData.exdays * 24 * 60 * 60 * 1000);
  document.cookie = `${cookieData.name}=${cookieData.value}; expires=${date.toUTCString()}`;
};

/**
 * Del Cookie by name
 **/
export const delCookie = (name: string) => {
  if (!name) {
    return;
  }
  document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};

/**
 * Check Empty data
 **/
export const isEmpty = (value: any): boolean => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === 'string' && value.trim().length === 0) ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'object' && Array.isArray(value) && value.length === 0)
  );
};

export const formatNumber = (value: string | number) => {
  const phoneNumber = value + '';
  const list = phoneNumber.split('.');
  const prefix = list[0].charAt(0) === '-' ? '-' : '';
  let num = prefix ? list[0].slice(1) : list[0];
  let result = '';
  while (num.length > 3) {
    result = `,${num.slice(-3)}${result}`;
    num = num.slice(0, num.length - 3);
  }
  if (num) {
    result = num + result;
  }
  return `${prefix}${result}${list[1] ? `.${list[1]}` : ''}`;
};

export const validationPhone = (value: string, callback: any) => {
  if (/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/.test(value)) {
    return callback();
  }
  return callback('Số điện thoại chưa đúng định dạng');
};

export const getExpirationDate = (jwtToken: string) => {
  if (!jwtToken) {
    return null;
  }

  const jwt = JSON.parse(atob(jwtToken.split('.')[1]));

  // multiply by 1000 to convert seconds into milliseconds
  return (jwt && jwt.exp && jwt.exp * 1000) || null;
};

export const deleteEmptyPropertiesObj = (obj: any) => {
  Object.keys(obj).forEach((k) => obj[k] === '' && delete obj[k]);
};

export const listenEvent = (eventName: string, callback: (e: Event) => void, context: Window | Document = document) => {
  context.addEventListener(eventName, callback);
  return () => context.removeEventListener(eventName, callback);
};

export const generateArrayRange = (start: number, stop: number, step: number = 1): Array<number> => {
  return Array.from({ length: Math.ceil((stop - start) / step) }, (_, i) => start + i * step);
};

export const selectProps = (obj: { [key: string]: any }, selectors: Array<string>): { [key: string]: any } => {
  return Object.keys(obj).reduce<{ [key: string]: any }>((acc, cur) => {
    return selectors.includes(cur) ? { ...acc, [cur]: obj[cur] } : acc;
  }, {});
};

export const hasProps = (obj: { [key: string]: any }, props: Array<string>, type: 'all' | 'some' = 'some'): boolean => {
  const result = Object.keys(obj).reduce<string[]>((acc, cur) => {
    return props.includes(cur) ? [...acc, cur] : acc;
  }, []);

  return type === 'all' ? result.length === props.length : result.length !== 0;
};
