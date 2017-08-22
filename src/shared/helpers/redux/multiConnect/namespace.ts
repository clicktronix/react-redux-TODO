import { Dispatch } from 'react-redux';
import { IReduxState as IAppReduxState } from 'shared/types/app';

export interface IMultiInstanceState<TReduxState> {
  [instanceKey: string]: TReduxState;
}

export interface IMultiAction {
  _instanceKey?: number;
  type: any;
}

export interface IAddInstance {
  type: '@@MULTI_CONNECT:ADD_INSTANCE';
  payload: {
    instanceKey: number,
    initialState: any,
    keyPathToState: string[],
  };
}

export interface IRemoveInstance {
  type: '@@MULTI_CONNECT:REMOVE_INSTANCE';
  payload: {
    instanceKey: number,
    keyPathToState: string[],
  };
}

export type Action = IAddInstance | IRemoveInstance;

export type ReactComponent<TProps> = React.ComponentClass<TProps> | React.StatelessComponent<TProps>;

export type MapToState<TReduxState> = (state: any) => IMultiInstanceState<TReduxState>;

// tslint:disable-next-line:max-line-length
export type MapStateToProps<TReduxState, TStateProps, TOwnProps> = (state: TReduxState, appState?: IAppReduxState, ownProps?: TOwnProps) => TStateProps;

// tslint:disable-next-line:max-line-length
export type MapDispatchToProps<TDispatchProps, TOwnProps> = (dispatch: Dispatch<any>, ownProps?: TOwnProps) => TDispatchProps;
