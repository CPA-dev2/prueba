import { handleActions } from "redux-actions";
import { api } from "../../utils/api";
import { actions as comunActions } from "./comun";

const LOADER = "LOGIN_LOADER";
const TOKEN = "LOGIN_TOKEN";
const SUCURSAL = "LOGIN_SUCURSAL";
const USER = "LOGIN_USER";

const SUBMIT_ERROR = "LOGIN_SUBMIT_ERROR";
const SMS_ERROR = "SMS_ERROR";
const PHONE_NUMBER = "PHONE_NUMBER";
const USER_ID = "USER_ID";
const PASS_RESET1 = "PASS_RESET1";
const VERIFY_LOADER = "VERIFY_LOADER";
const SMS_FAIL = "SMS_FAIL";

export const constants = {
  LOADER,
  SUCURSAL,
};

// ------------------------------------
// Actions
// ------------------------------------
export const login = (body, navigation) => (dispatch, getStore) => {
  const store = getStore();

  dispatch(setLoader(true));
  api
    .post("/users/token", body, {}, { dispatch, store })
    .catch((error) => {
      dispatch(setLoader(false));
      if (error) {
        const tipo = error.error;
        if (tipo === 0 || tipo === 3 || tipo === 5) {
          dispatch({ type: SUBMIT_ERROR, submitError: true });
        } else if (error.error === 20) {
          // dispatch({ type: PASS_RESET, passReset: true });
          navigation.navigate("PassReset");
        } else if (error.error === 10) {
          // dispatch({ type: BLOCKED, blocked: true });
          navigation.navigate("Blocked");
        } else if (error.error === 30) {
          console.log('here');
          dispatch(setSMSError(true));
        }
      }
    })
    .then((data) => {
      dispatch(setLoader(false));
      if (data) {
        if (data.redirect) {
          dispatch(setPhoneNumber(data.telefono));
          dispatch(setUserId(data.user_id));
          dispatch(setPassReset1(data.pass_reset));
        } else {
          dispatch(setToken(data.token));
          if (data.error === 20) {
            navigation.navigate("PassReset");
          } else {
            const newStore = getStore();
            api
              .get("users/me", {}, { dispatch, store: newStore })
              .catch((err) => {})
              .then((user) => {
                dispatch({ type: USER, user });
                if (user && user.perfil.rol.id !== 17) {
                  api
                    .get(
                      `liquidaciones/${user.perfil.id}`,
                      {},
                      { dispatch, store: newStore }
                    )
                    .catch((err) => {})
                    .then((pago) => {
                      if (pago) {
                        user.total_dia = pago.liquidacion;
                      }
                    })
                    .finally(() => {
                      dispatch({ type: USER, user });
                    });
                }
                if (user && user.perfil.rol.id === 17) {
                  dispatch(getCobroDia(user));
                }
              });
            dispatch(comunActions.getPlanes());
            navigation.navigate("Home");
          }
        }
      }
    });
};

export const verifyCode = (data = {}, navigation) => (dispatch, getStore) => {
  const store = getStore();
  dispatch(setVerifyLoader(true));
  api
    .post("/users/verify_sms", data, {}, { dispatch, store })
    .then((res) => {
      dispatch(setVerifyLoader(false));
      dispatch(setToken(res.token));
      if (data.pass_reset === true) {
        navigation.navigate("PassReset");
      } else {
        const newStore = getStore();
        api
          .get("users/me", {}, { dispatch, store: newStore })
          .catch((err) => {})
          .then((user) => {
            dispatch({ type: USER, user });
            if (user && user.perfil.rol.id !== 17) {
              api
                .get(
                  `liquidaciones/${user.perfil.id}`,
                  {},
                  { dispatch, store: newStore }
                )
                .catch((err) => {})
                .then((pago) => {
                  if (pago) {
                    user.total_dia = pago.liquidacion;
                  }
                })
                .finally(() => {
                  dispatch({ type: USER, user });
                });
            }
            if (user && user.perfil.rol.id === 17) {
              dispatch(getCobroDia(user));
            }
          });
        dispatch(comunActions.getPlanes());
        navigation.navigate("Home");
      }
    })
    .catch(() => {
      dispatch(setSMSFail(true));
      dispatch(setVerifyLoader(false));
    });
};

export const getCobroDia = (user) => (dispatch, getStore) => {
  api
    .get(
      "cobranza_dificil_gestion/get_cobros_dia",
      { asesor_cobranza_dificil__id: user.perfil.id },
      { dispatch, store: getStore() }
    )
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.log(error);
    })
    .then((data) => {
      if (data) {
        user.total_dia = data.total_del_dia;
        dispatch({ type: USER, user });
      }
    });
};

export const initialLoad = () => (dispatch, getStore) => {
  dispatch({ type: SUBMIT_ERROR, submitError: false });
  dispatch(setSMSError(false));
  dispatch(setPhoneNumber(""));
  dispatch(setUserId(0));
  dispatch(setPassReset1(false));
  dispatch(setVerifyLoader(false));
  dispatch(setSMSFail(false));
};

export const logout = () => (dispatch, getStore) => {
  dispatch(setToken(null));
};

// ------------------------------------
// Pure Actions
// ------------------------------------

export const setToken = (token) => ({
  type: TOKEN,
  token,
});

export const setLoader = (loader) => ({
  type: LOADER,
  loader,
});

export const setPhoneNumber = (phone_number) => ({
  type: PHONE_NUMBER,
  phone_number,
});

export const setUserId = (user_id) => ({
  type: USER_ID,
  user_id,
});

export const setPassReset1 = (pass_reset1) => ({
  type: PASS_RESET1,
  pass_reset1,
});

export const setVerifyLoader = (verify_loader) => ({
  type: VERIFY_LOADER,
  verify_loader,
});

export const setSMSFail = (sms_fail) => ({
  type: SMS_FAIL,
  sms_fail,
});

export const setSMSError = (smsError) => ({
  type: SMS_ERROR,
  smsError,
});

export const actions = {
  login,
  logout,
  initialLoad,
  setToken,
  getCobroDia,
  verifyCode,
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
  [TOKEN]: (state, { token }) => {
    return {
      ...state,
      token,
    };
  },
  [SUCURSAL]: (state, { sucursal }) => {
    return {
      ...state,
      sucursal,
    };
  },
  [SUBMIT_ERROR]: (state, { submitError }) => {
    return {
      ...state,
      submitError,
    };
  },
  [SMS_ERROR]: (state, { smsError }) => {
    return {
      ...state,
      smsError,
    };
  },
  [PHONE_NUMBER]: (state, { phone_number }) => {
    return {
      ...state,
      phone_number,
    };
  },
  [USER_ID]: (state, { user_id }) => {
    return {
      ...state,
      user_id,
    };
  },
  [PASS_RESET1]: (state, { pass_reset1 }) => {
    return {
      ...state,
      pass_reset1,
    };
  },
  [VERIFY_LOADER]: (state, { verify_loader }) => {
    return {
      ...state,
      verify_loader,
    };
  },
  [SMS_FAIL]: (state, { sms_fail }) => {
    return {
      ...state,
      sms_fail,
    };
  },
  [USER]: (state, { user }) => {
    return {
      ...state,
      user,
    };
  },
};

const initialState = {
  loader: false,
  token: null,
  sucursal: null,
  submitError: false,
  smsError: false,
  phone_number: "",
  user_id: 0,
  pass_reset1: false,
  verify_loader: false,
  sms_fail: false,
  user: { perfil: {} },
};

export default handleActions(reducers, initialState);
