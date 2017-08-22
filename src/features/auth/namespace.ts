import { ICommunicationState } from 'shared/helpers/redux/namespace';

export interface IReduxState {
  data: {
    isLoggedIn: boolean;
  };
  communication: {
    logging: ICommunicationState;
  };
}

export interface ISignIn {
  type: 'AUTH:SIGN_IN';
  payload: boolean;
}

export interface ISignInSuccess {
  type: 'AUTH:SIGN_IN_SUCCESS';
}

export interface ISignInFail {
  type: 'AUTH:SIGN_IN_FAIL';
  error: string;
}

export interface ISignOut {
  type: 'AUTH:SIGN_OUT';
}

export type Action = ISignIn | ISignInSuccess | ISignInFail | ISignOut;
