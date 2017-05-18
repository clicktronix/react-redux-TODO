import Api from 'shared/api/google-tasks-api';
import { IDispatch } from 'shared/types/app';

const api: Api = new Api();

function authorize(immediate: boolean = false) {
  return (dispatch: IDispatch) => {
      dispatch({ type: 'SESSION_ATHORIZE' });
      api.authorize({ immediate })
      .then(() => {
        dispatch({
          type: 'SESSION_ATHORIZE_SUCCESS',
        });
      })
      .catch((err) => {
        dispatch({
          type: 'SESSION_ATHORIZE_FAIL',
          payload: err,
        });
      });
  };
}

export { authorize };
