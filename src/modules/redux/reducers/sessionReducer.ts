import initialState from '../initial';
import { IReduxState, IAction } from 'shared/types/app';

const sessionReducer = (state: IReduxState = initialState, action: IAction) => {
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

export { sessionReducer };
