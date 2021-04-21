import { takeLatest, call, put, all, fork } from 'redux-saga/effects';
import { firebaseAuthRequest } from '../../services/firebase';
import { AuthActionTypes, AuthRequestAction, FirebaseAuthServiceResponse } from "../../types/auth";
import { authRequestSuccess } from './actions';

function* authRequestFetch(action: AuthRequestAction) {
  const {email, password} = action.payload;
  const res: FirebaseAuthServiceResponse  = yield call(firebaseAuthRequest, email, password);
  if (!res.error && res.data) {
    yield put(authRequestSuccess(res.data))
  }
}

function* watchAuthRequestFetch() {
  yield takeLatest(AuthActionTypes.AUTH_REQUEST, authRequestFetch)
}

export default function* authSaga() {
  yield all([fork(watchAuthRequestFetch)]);
}