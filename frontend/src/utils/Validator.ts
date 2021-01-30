import Validator from "validator";
import isEmpty from "lodash/isEmpty";

/**
 *
 * @desc this functtion handles validation for signin form
 *
 * @param {any} inputData
 * @returns {Object}
 */
export const validateInput = ({ password }: any): any => {
  const errors = {password: ''};
 
  if (Validator.isEmpty(password)) {
    errors.password = "Password field is required";
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};


