import { all, fork } from 'redux-saga/effects';
import { carouselSaga } from './carousel';

export default function* rootSaga() {
  yield all([fork(carouselSaga)]);
}