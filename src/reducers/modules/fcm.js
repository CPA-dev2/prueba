import { handleActions } from 'redux-actions';
import { api } from "../../utils/api";

const LOADER = 'FCM_LOADER';
export const constants = {
  LOADER,
};
// ------------------------------------
// Actions
// ------------------------------------

export const newToken = (token) => (dispatch, getStore) => {
   const store = getStore();
  const body = {token};
  api.post('fcm/nuevo', body, {}, {dispatch, store}).catch((error) => {}).then((data) => {
    }
  );
};

export const actions = {
  newToken,
};

export const reducers = {
};

export const initialState = {
};

export default handleActions(reducers, initialState);
