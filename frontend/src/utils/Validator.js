import Validator from "validator";
import isEmpty from "lodash/isEmpty";

/**
 *
 * @desc this functtion handles validation for signin form
 *
 * @param {any} inputData
 * @returns {Object}
 */
export const validateInput = ({ email, password }) => {
  const errors = {};
 
  if (Validator.isEmpty(password)) {
    errors.password = "Password field is required";
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};

/**
 *
 * @desc this functtion handles validation for signup form
 *
 * @param {Object} input
 * @returns {Object}
 */
export const signupValidation = (input) => {
  const errors = {}
  if (Validator.isEmpty(input.password)) {
    errors.password = "Password field is required";
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export const checkIfEmpty = (obj) => {
  for (const key in obj) {
    if (obj[key] === "") return true;
  }
  return false;
};
