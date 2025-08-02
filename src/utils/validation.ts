export function isValidEmail(email: string) {
  var emailPattern =
    // eslint-disable-next-line no-useless-escape
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email) {
    return emailPattern.test(email);
  } else {
    return false;
  }
}

export function isValidPhoneNumber(phoneNumber: string) {
  var digitsPattern = /^\d+$/;
  if (phoneNumber) {
    return digitsPattern.test(phoneNumber); // returns a boolean
  } else {
    return false;
  }
}

export function isValidPassword(password: string) {
  if (password && password.length >= 6 && password.length <= 20) {
    return true;
  } else {
    return false;
  }
}

export function isEmpty(stringObj: any) {
  if (!stringObj || stringObj == null || stringObj === '') {
    return true;
  } else {
    return false;
  }
}

export function instanceOf(object: any, constructor: any) {
  return object instanceof constructor;
}

export function isOfTypeString(obj: any) {
  if (obj && (typeof obj === 'string' || obj instanceof String)) {
    return true;
  } else {
    return false;
  }
}

export function isInteger(num: any) {
  let isInt = false;

  if (!containsAlphabetsAndSpecialCharacters(num)) {
    // eslint-disable-next-line radix
    let toInt = parseInt(num);
    isInt = Number.isInteger(toInt);
  }

  return isInt;
}

export function containsAlphabetsAndSpecialCharacters(str: string) {
  // eslint-disable-next-line no-useless-escape
  const format = /[ A-Za-z`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  let contains = format.test(str);
  return contains;
}

export function getSearchType(text: string) {
  let type = 'name';
  if (isValidEmail(text)) {
    type = 'email';
  } else if (isValidPhoneNumber(text)) {
    type = 'phone_number';
  }
  return type;
}
