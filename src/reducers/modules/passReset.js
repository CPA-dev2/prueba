import { handleActions } from 'redux-actions';
import { api } from "../../utils/api";
import { actions as loginActions } from "./login";

const LOADER = "RESET_LOADER";
const SUBMIT = 'RESET_SUBMIT';
const SUBMIT_ERROR = "LOGIN_SUBMIT_ERROR";

export const constants = {
  LOADER,
};

// ------------------------------------
// Actions
// ------------------------------------
export const onSubmit = (data = {}) => (dispatch, getStore) => {
   dispatch({ type: LOADER, loader: true });
  const store = getStore();
  const body = {current_password: data.currentPassword, password: data.password};
  api.post('/users/changepass', body, {}, {dispatch, store}).catch((error) => {
    dispatch({ type: SUBMIT_ERROR, submitError: true });
    dispatch({ type: LOADER, loader: false });
  }).then((data) => {
    if (data){
      dispatch(loginActions.setToken(null));
      dispatch({ type: SUBMIT, autenticado: true });
      dispatch({ type: LOADER, loader: false });
    }
  });
};

// ------------------------------------
// Pure Actions
// ------------------------------------

// export const setToken = token => ({
//   type: TOKEN,
//   token,
// });

export const actions = {
  onSubmit
};

// ------------------------------------
// REDUCERS
// ------------------------------------

export const reducers = {
  [LOADER]: (state, { loader }) => {
    return {
      ...state,
      loader,
    };
  },
  [SUBMIT]: (state, { autenticado }) => {
    return {
      ...state,
      autenticado,
    };
  },
  [SUBMIT_ERROR]: (state, { submitError }) => {
    return {
      ...state,
      submitError,
    };
  },
};

const initialState = {
  loader: false,
  autenticado:false,
  submitError: false,
};


export default handleActions(reducers, initialState);
