import { ICommunicationState } from 'shared/helpers/redux/namespace';

export interface IReduxState {
  data: {
    isLoggedIn: boolean;
  };
  communication: {
    logging: ICommunicationState;
  };
}

export interface IAuth {
  type: 'AUTH:SIGN_IN';
  payload: boolean;
}

export interface IAuthSuccess {
  type: 'AUTH:SIGN_IN_SUCCESS';
}

export interface IAuthFail {
  type: 'AUTH:SIGN_IN_FAIL';
  error: string;
}

export interface ISignOut {
  type: 'AUTH:SIGN_OUT';
}

export type Action = IAuth | IAuthSuccess | IAuthFail | ISignOut;
