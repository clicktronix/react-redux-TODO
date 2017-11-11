import { IReduxState } from 'modules/App/namespace';

export const initial: IReduxState = {
  data: {
    taskLists: [],
  },
  communication: {
    taskListsLoading: {
      error: '',
      isRequesting: false,
    },
    taskListUpdating: {
      error: '',
      isRequesting: false,
    },
    taskListDeleting: {
      error: '',
      isRequesting: false,
    },
    taskListCreating: {
      error: '',
      isRequesting: false,
    },
  },
};
