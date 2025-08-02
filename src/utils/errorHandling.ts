import ErrorConstant from './ErrorConstant';
import { isEmpty } from './validation';
export function ErrorObject(errorCode: any, success: any) {
  const ErrorConstants: any = ErrorConstant;
  var errorObject: any = {};
  errorObject.success = success;
  errorObject.code = errorCode;
  errorObject.message = ErrorConstants.ErrorMessages[errorCode];
  return errorObject;
}

export function updateErrorObject(errorObject: any) {
  if (errorObject) {
    if (errorObject.data) {
      errorObject = errorObject.data;
    }
    var customMsg = '';
    if (isEmpty(customMsg)) {
      if (isEmpty(errorObject.message)) {
        customMsg = errorObject.error;
      } else {
        customMsg = errorObject.message;
      }
    }
    errorObject.message = customMsg;
  } else {
    errorObject = ErrorObject(ErrorConstant.ErrorCodes.UNKNOWN_ERROR, false);
  }
  errorObject.success = false;
  return errorObject;
}
