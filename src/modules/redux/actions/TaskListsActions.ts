import Api from 'shared/api/google-tasks-api';
import { IGoogleTasksResponse } from 'modules/redux/namespace';
import { IDispatch } from 'shared/types/app';

const api: Api = new Api();

function loadTasksLists(immediate: boolean = false) {
  return (dispatch: IDispatch) => {
      dispatch({ type: 'TASK_LIST_LOAD' });
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

function createTasksList({ title }: { title: string; }) {
  return (dispatch: IDispatch) => {
      dispatch({ type: 'TASK_LIST_CREATE' });
      api.insertTaskList({ title })
      .then((data) => {
        dispatch({
          type : 'TASK_LIST_CREATE_SUCCESS',
          payload : data,
        });
      })
      .catch((err: Error) => {
        dispatch({
          type : 'TASK_LIST_CREATE_FAIL',
          payload : err,
        });
      });
  };
}

export { loadTasksLists, createTasksList };
