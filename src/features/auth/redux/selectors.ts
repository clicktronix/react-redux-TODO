import { IAppReduxState } from 'shared/types/app';
import { IReduxState } from '../namespace';

export function selectState(state: IAppReduxState): IReduxState {
  return state.auth;
}

export function selectAuthState(state: IAppReduxState): boolean {
  return selectState(state).data.isLoggedIn;
}
