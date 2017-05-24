import Api from 'shared/api/google-tasks-api';
import { IGoogleTasksResponse, ITaskResponse } from 'modules/redux/namespace';
import { IDispatch } from 'shared/types/app';

const api: Api = new Api();

function loadTasks(taskListId: string) {
  return (dispatch: IDispatch) => {
    dispatch({ type: 'TASKS_LOAD' });
    api.listTasks(taskListId)
      .then((data: any) => {
        dispatch({
          type: 'TASKS_LOAD_SUCCESS',
          payload: data.items || [],
        });
      })
      .catch((err: Error) => {
        dispatch({
          type: 'TASKS_LOAD_FAIL',
          payload: err,
        });
      });
  };
}

function updateTaskStatus(params: { taskListId: string; taskId: string; isCompleted: boolean; }) {
  return (dispatch: IDispatch) => {
    dispatch({ type: 'TASK_UPDATE_STATUS' });
    api.updateTask({
      taskListId: params.taskListId,
      taskId: params.taskId,
      status: params.isCompleted ? 'completed' : 'needsAction',
    })
      .then((data: ITaskResponse) => {
        dispatch({
          type: 'TASK_UPDATE_STATUS_SUCCESS',
          payload: { id: params.taskId, data },
        });
      })
      .catch((err: Error) => {
        dispatch({
          type: 'TASK_UPDATE_STATUS_FAIL',
          payload: err,
        });
      });
  };
}

function updateTask(params: { taskListId: string; taskId: string; text: string; }) {
  return (dispatch: IDispatch) => {
    dispatch({ type: 'TASK_UPDATE' });
    api.updateTask({
      taskListId: params.taskListId,
      taskId: params.taskId,
      title: params.text,
    })
      .then((data: ITaskResponse) => {
        dispatch({
          type: 'TASK_UPDATE_SUCCESS',
          payload: { id: params.taskId, data },
        });
      })
      .catch((err: Error) => {
        dispatch({
          type: 'TASK_UPDATE_FAIL',
          payload: err,
        });
      });
  };
}

function createTask(params: { taskListId: string; text: string; }) {
  return (dispatch: IDispatch) => {
    dispatch({ type: 'TASK_CREATE' });
    api.insertTask({
      taskListId: params.taskListId,
      title: params.text,
    })
      .then((data: ITaskResponse) => {
        dispatch({
          type: 'TASK_CREATE_SUCCESS',
          payload: data,
        });
      })
      .catch((err: Error) => {
        dispatch({
          type: 'TASK_CREATE_FAIL',
          payload: err,
        });
      });
  };
}

function deleteTask(params: { taskListId: string; taskId: string; }) {
  return (dispatch: IDispatch) => {
    dispatch({ type: 'TASK_DELETE' });
    api.deleteTask({
      taskListId: params.taskListId,
      taskId: params.taskId,
    })
      .then((data: ITaskResponse) => {
        dispatch({
          type: 'TASK_DELETE_SUCCESS',
          payload: { id: params.taskId, data },
        });
      })
      .catch((err: Error) => {
        dispatch({
          type: 'TASK_DELETE_FAIL',
          payload: err,
        });
      });
  };
}
export {
  loadTasks,
  updateTaskStatus,
  updateTask,
  createTask,
  deleteTask,
};
