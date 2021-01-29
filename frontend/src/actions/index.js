import axios from "axios";
import jwtDecode from "jwt-decode";
import swal from "sweetalert";
import setAuthToken from "../utils/SetAuthToken";
import {
  USER_AUTHENTICATED,
  SIGN_UP_USER_ERROR,
  GET_ALL_CONTACTS_SUCCESS,
  UPDATE_CONTACT_SUCCESS,
  CREATE_CONTACT_SUCCESS,
  SEARCH_CONTACT_SUCCESS,
} from "./constants";

export const API = "http://localhost:8000";

/**
 *
 *
 * @export
 * @param {any} user
 * @returns {void}
 */
export function setCurrentUser(user) {
  return {
    type: USER_AUTHENTICATED,
    user
  };
}

/**
 *
 *
 * @desc this function register the returned jwt token to
 * localstorage and pass it to axios header
 * @param {object} data
 * @returns {string}
 */
function registerToken(key, { token }, fn) {
  setLocalStore(key, token)
  fn(token);
  return token;
}

const setLocalStore = (key, token) => window.localStorage.setItem(key, token);
/**
 *
 * @desc this function returns a jwt token
 * @param {any} token
 * @returns {void}
 */
function decode(token) {
  return jwtDecode(token);
}
export function signupErros(errors) {
  return {
    type: SIGN_UP_USER_ERROR,
    errors,
  };
}


/**
 * @desc this function signs in a user
 * @param {object} responseData
 * @returns {function}
 */
export function SigninRequest(userData) {
  return dispatch => axios.post(`${API}/v1/signin`, userData)
    .then(({data}) => {
      const token = registerToken('token', data, setAuthToken);
      dispatch(setCurrentUser(decode(token)));
      return decode(token)
    });
}

/**
 * @desc this method signs up a user
 * @param {object} userData
 * @param callback
 * @returns {function}
 */
export function SignupRequest(userData, callback) {
  return dispatch => axios.post(`${API}/v1/signup`, userData)
    .then(res => {
      const token = registerToken("token", res.data, setAuthToken);
      dispatch(setCurrentUser(decode(token)));
      return callback(res);
    })
}
const getAllContactsSuccess = (contacts) => ({
  type: GET_ALL_CONTACTS_SUCCESS,
  payload: contacts,
});

/**
   * @function getAllContacts
   *
   * @returns {object} dispatches an action
   *
   * @description get all user contacts
   */
export const getAllContacts = () => {
  return (dispatch) =>
    axios
      .get(`${API}/v1/contact/list`)
      .then((response) => {
        dispatch(getAllContactsSuccess(response.data));
      })
};

 const updateContactSuccess = (payload) => ({
   type: UPDATE_CONTACT_SUCCESS,
   payload,
 });

 /**
  * @function updateContact
  * 
  * @returns {object} dispatches an action
  *
  * @description update a user contact
  */
 export function updateContact(name, obj) {
   return (dispatch) =>
     axios.patch(`${API}/v1/contact/update/${name}`, obj).then((response) => {
       dispatch(updateContactSuccess(response.data));
     });
 }
 const searchContactSuccess = (payload) => ({
   type: SEARCH_CONTACT_SUCCESS,
   payload,
 });

 /**
  * @function searchContact
  * 
  * @returns {object} dispatches an action
  *
  * @description search a user contact list
  */
 export function searchContact(item) {
   return (dispatch) =>
     axios.get(`${API}/v1/contact?q=${item}`).then((response) => {
       dispatch(searchContactSuccess(response.data));
     });
 }


 const createContactSuccess = (payload) => ({
   type: CREATE_CONTACT_SUCCESS,
   payload,
 });

 /**
  * @function createContact
  *
  * @returns {object} dispatches an action
  *
  * @description create a user contact
  */
 export function createContact(obj) {
   return (dispatch) =>
     axios
       .post(`${API}/v1/contact/add`, obj)
       .then((response) => {
         dispatch(createContactSuccess(response.data));
       })
 }
 /**
 * 
 * 
 * @desc this method logs out a user
 * @returns {void}
 */
export function logout() {
  return dispatch => {
    localStorage.removeItem('token');
    setAuthToken(false);
    dispatch(setCurrentUser({}));
  };
}