import { IReduxState, IAction, ISessionState } from 'shared/types/app';

const sessionInitialState = {
  isLoggedIn: false,
};

const sessionReducer = (state: ISessionState = sessionInitialState, action: IAction): ISessionState => {
  switch (action.type) {
    case 'SESSION_AUTHORIZE_SUCCESS':
      return {
        ...state,
        isLoggedIn: true,
      };
    case 'SESSION_AUTHORIZE_FAIL':
      return {
        ...state,
        isLoggedIn: false,
      };
    case 'SESSION_SIGNOUT':
      return {
        ...state,
        isLoggedIn: false,
      };
    default:
      return state;
  }
};

export default sessionReducer;