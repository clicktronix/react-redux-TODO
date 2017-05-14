import initialState from './initial';
import { IReduxState, IAction } from 'shared/types/app';

const rootReducer = (state: IReduxState = initialState, action: IAction) => {
  console.log(action.type, action);
  switch (action.type) {
    case 'SESSION_ATHORIZE_SUCCESS':
      return {
        ...state,
        isLoggedIn: true,
      };
    case 'SESSION_ATHORIZE_FAIL':
      return {
        ...state,
        isLoggedIn: false,
      };
    default:
      return state;
  }
};

export default rootReducer;
