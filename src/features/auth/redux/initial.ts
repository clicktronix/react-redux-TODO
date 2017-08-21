import { IReduxState } from 'features/auth/namespace';

export const initial: IReduxState = {
  data: {
    isLoggedIn: false,
  },
  communication: {
    logging: {
      error: '',
      isRequesting: false,
    },
  },
};
