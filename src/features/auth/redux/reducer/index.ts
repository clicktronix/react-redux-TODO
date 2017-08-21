import { combineReducers } from 'redux';
import * as NS from '../../namespace';
import { initial } from '../initial';
import { ReducersMap, makeCommunicationReducer } from 'shared/helpers/redux';

const sessionReducer = (
  state: NS.IReduxState['data'] = initial.data,
  action: NS.Action,
): NS.IReduxState['data'] => {
  switch (action.type) {
    case 'AUTH:SIGN_IN_SUCCESS':
      return {
        ...state,
        isLoggedIn: true,
      };
    case 'AUTH:SIGN_IN_FAIL':
      return {
        ...state,
        isLoggedIn: false,
      };
    case 'AUTH:SIGN_OUT':
      return {
        ...state,
        isLoggedIn: false,
      };
    default:
      return state;
  }
};

const reducer = combineReducers<NS.IReduxState>({
  data: sessionReducer,
  communication: combineReducers<NS.IReduxState['communication']>({
    logging: makeCommunicationReducer<NS.IAuth, NS.IAuthSuccess, NS.IAuthFail>(
      'AUTH:SIGN_IN',
      'AUTH:SIGN_IN_SUCCESS',
      'AUTH:SIGN_IN_FAIL',
      initial.communication.logging,
    ),
  } as ReducersMap<NS.IReduxState['communication']>),
} as ReducersMap<NS.IReduxState>);

export default reducer;
