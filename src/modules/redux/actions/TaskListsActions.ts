import Api from 'shared/api/google-tasks-api';
import { IGoogleTasksResponse } from 'modules/redux/namespace';
import { IDispatch } from 'shared/types/app';

const api: Api = new Api();

function loadTaskLists(immediate: boolean = false) {
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

function createTaskList({ title }: { title: string; }) {
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

function deleteTaskList(taskListId: string) {
  return (dispatch: IDispatch) => {
    dispatch({ type: 'TASK_LIST_DELETE' });
    api.deleteTaskList(taskListId)
      .then((data) => {
        dispatch({
          type: 'TASK_LIST_DELETE_SUCCESS',
          payload: { id: taskListId, data },
        });
      })
      .catch((err: Error) => {
        dispatch({
          type: 'TASK_LIST_DELETE_FAIL',
          payload: err,
        });
      });
  };
}

function updateTaskList({ taskListId, title }: { taskListId: string; title: string; }) {
  return (dispatch: IDispatch) => {
    dispatch({ type: 'TASK_LIST_UPDATE' });
    api.updateTaskList({ taskListId, title })
      .then((data) => {
        dispatch({
          type: 'TASK_LIST_UPDATE_SUCCESS',
          payload: { id: taskListId, data },
        });
      })
      .catch((err: Error) => {
        dispatch({
          type: 'TASK_LIST_UPDATE_FAIL',
          payload: err,
        });
      });
  };
}

export {
  loadTaskLists,
  createTaskList,
  deleteTaskList,
  updateTaskList,
};
