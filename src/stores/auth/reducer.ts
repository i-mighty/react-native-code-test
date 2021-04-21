import { Reducer } from 'redux';
import { User } from 'firebase';
import { AuthAction, AuthActionTypes } from 'src/types/auth';

const initialState: Partial<User> = {}

const authReducer: Reducer<Partial<User>, AuthAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case (AuthActionTypes.AUTH_SUCCESS): {
      return action.payload
    }
    default:
      return state;
  }
}

export default authReducer;