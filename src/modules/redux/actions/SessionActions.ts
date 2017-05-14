import Api from 'shared/api/google-tasks-api';

const api: Api = new Api();

function authorize(immediate: boolean = false) {
  return (dispatch: any) => {
      api.authorize({ immediate })
      .then(() => {
        dispatch({
          type: 'SESSION_ATHORIZE_SUCCESS',
        });
      })
      .catch((err) => {
        dispatch({
          type: 'SESSION_ATHORIZE_FAIL',
          error: err,
        });
      });
  };
}

export { authorize };
