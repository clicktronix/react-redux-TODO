import Api from 'shared/api/google-tasks-api';

const api: Api = new Api();

function loadTasks(immediate: boolean = false) {
  return (dispatch: any) => {
      api.getTaskLists()
      .then((data: any) => {
        dispatch({
          type: 'TASK_LIST_LOAD_SUCCESS',
          payload: data.items,
        });
      })
      .catch((err) => {
        dispatch({
          type: 'TASK_LIST_LOAD_FAIL',
          payload: err,
        });
      });
  };
}

export { loadTasks };
