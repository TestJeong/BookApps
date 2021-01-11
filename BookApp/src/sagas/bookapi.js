import {takeEvery, put, call, all, fork} from 'redux-saga/effects';
import {
  SERACH_BOOK_DATA_REQUEST,
  SERACH_BOOK_DATA_SUCCESS,
  SERACH_BOOK_DATA_ERROR,
} from '../reducers/BookList';
import KaKao_Book_API from '../Api/BookAPI';

function* getWeatherDataSaga(action) {
  try {
    const response = yield call(KaKao_Book_API, action.data);

    yield put({
      type: SERACH_BOOK_DATA_SUCCESS,
      data: response,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: SERACH_BOOK_DATA_ERROR,
      data: e,
      error: true,
    });
  }
}

function* searchBook() {
  yield takeEvery(SERACH_BOOK_DATA_REQUEST, getWeatherDataSaga);
}

export default function* apiSaga() {
  yield all([fork(searchBook)]);
}
