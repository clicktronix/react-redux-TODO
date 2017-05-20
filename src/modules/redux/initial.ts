import { IReduxState } from 'shared/types/app';

const initialState: IReduxState = {
  isLoggedIn: false,
  taskLists: [],
  tasks: [],
};

export default initialState;
