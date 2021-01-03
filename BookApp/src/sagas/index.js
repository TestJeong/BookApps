import {all, takeEvery} from 'redux-saga/effects';
import apiSaga from '../sagas/bookapi';

export default function* rootSaga() {
  yield all([apiSaga()]);
}
