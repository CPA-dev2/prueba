// @flow
// import devTools from "remote-redux-devtools";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { persistStore } from "redux-persist";
import reducer from "../reducers";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const composeEnhancers = compose;

export default function configureStore() {
  const enhancer = composeEnhancers(
    applyMiddleware(thunk)
  );

  const store = createStore(reducer, enhancer);
  const persistor = persistStore(store);

  return { store, persistor };
}
