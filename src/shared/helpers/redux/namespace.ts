import { Reducer } from 'redux';

export interface ICommunicationState<T = string> {
  isRequesting: boolean;
  error: T;
}

export interface IReduxField<T = any, E = string> {
  value: T;
  error: E;
}

export type ReducersMap<T> = {
  [key in keyof T]: Reducer<T[key]>;
};
