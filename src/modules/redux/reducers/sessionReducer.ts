import { initialState } from '../initial';
import { IReduxState, IAction, ISessionReducer } from 'shared/types/app';

const sessionInit = {
  isLoggedIn: false,
};

const sessionReducer = (state: ISessionReducer = sessionInit, action: IAction): ISessionReducer => {
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

export default sessionReducer;
