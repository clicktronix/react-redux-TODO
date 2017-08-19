import Api from 'shared/api/google-tasks-api';
import { IDispatch } from 'shared/types/app';

const api: Api = new Api();

function authorize(immediate: boolean = false) {
  return (dispatch: IDispatch) => {
      dispatch({ type: 'SESSION_AUTHORIZE' });
      api.authorize({ immediate })
      .then(() => {
        dispatch({
          type: 'SESSION_AUTHORIZE_SUCCESS',
        });
      })
      .catch((err) => {
        dispatch({
          type: 'SESSION_AUTHORIZE_FAIL',
          payload: err,
        });
      });
  };
}

function signOut() {
  return (dispatch: IDispatch) => {
      api.signOut();
      dispatch({ type: 'SESSION_SIGNOUT' });
  };
}

export { authorize, signOut };
