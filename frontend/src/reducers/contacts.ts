import * as types from "../actions/constants";
const initialState = {
  contacts: [],
};

const contacts = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ALL_CONTACTS_SUCCESS:
      return {
        ...state,
        contacts: [...action.payload],
      };
    case types.CREATE_CONTACT_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };

    case types.UPDATE_CONTACT_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case types.SEARCH_CONTACT_SUCCESS:
      return {
        ...state,
        contacts: [...action.payload],

      }      

    default:
      return state;
  }
};

export default contacts;
