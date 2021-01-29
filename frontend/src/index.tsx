import React from "react";
import ReactDOM from "react-dom";
import thunk from "redux-thunk";
import jwt from "jsonwebtoken";
import { Provider } from "react-redux";
import { applyMiddleware, createStore, compose } from "redux";
import { setCurrentUser } from "./actions";
import setAuthToken from "./utils/SetAuthToken";
import rootReducer from "./reducers";
import "./index.scss";
import "font-awesome/css/font-awesome.min.css";

import App from "./App";
declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = applyMiddleware(thunk);
const configureStore = (state = {}) =>
  createStore(rootReducer, state, compose(middleware, composeEnhancers()));
const store = configureStore();
const { localStorage } = window;
const jwtToken = localStorage && localStorage.getItem("token");
const decodedToken = jwt.decode(jwtToken);

if (decodedToken) {
  const hasExpired = decodedToken.exp - Date.now() / 1000 < 0;
  if (!hasExpired) {
    setAuthToken(jwtToken);
    store.dispatch(setCurrentUser(jwt.decode(jwtToken)));
  } else {
    localStorage.removeItem("token");
  }
}
ReactDOM.render(
<Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
