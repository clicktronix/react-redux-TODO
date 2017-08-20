import { ICommunicationState, IReduxField } from './namespace';

interface IAction {
  type: string;
}

interface IFailAction<T = any> extends IAction {
  error: T;
}

interface IProtect {
  type: '';
  error: any;
}

interface IEditFieldAction<T = any, E = any> {
  type: string;
  payload: IReduxField<T, E>;
}

/** Docs for helper https://gitlab.com/documents-project/order-form/blob/master/docs/ReduxHelpers.md */
export function makeCommunicationReducer<
  E extends IAction = IProtect,
  C extends IAction = IProtect,
  F extends IFailAction = IProtect
>(
  executeType: E['type'],
  completedType: C['type'],
  failedType: F['type'],
  initial: ICommunicationState<F['error']>,
): (state: ICommunicationState<F['error']>, action: IAction) => ICommunicationState<F['error']> {
  return (state: ICommunicationState<F['error']> = initial, action: IAction) => {
    switch (action.type) {
      case executeType: return { error: '', isRequesting: true };
      case completedType: return { error: '', isRequesting: false };
      case failedType: return { error: (action as F).error, isRequesting: false };
      default: return state;
    }
  };
}

export function makeIdentityReducer<T = ''>(initial: T) {
  return (state: T = initial) => state;
}

export function makeFieldReducer<A extends IEditFieldAction>(type: A['type'], initial: A['payload']) {
  return (state: A['payload'] = initial, action: A) => action.type === type ? action.payload : state;
}
