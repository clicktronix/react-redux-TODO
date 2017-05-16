import Api from 'shared/api/google-tasks-api';
import { IGoogleTasksResponse } from 'modules/redux/namespace';

const api: Api = new Api();

function loadTasks(immediate: boolean = false) {
  return (dispatch: any) => {
      api.getTaskLists()
      .then((data: IGoogleTasksResponse) => {
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
