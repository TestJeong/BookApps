import {takeEvery, put, call, all, fork} from 'redux-saga/effects';
import {
  SERACH_BOOK_DATA_REQUEST,
  SERACH_BOOK_DATA_SUCCESS,
  SERACH_BOOK_DATA_ERROR,
  BOOK_MARK_DATA_REQUEST,
  BOOK_MARK_DATA_SUCCESS,
  BOOK_MARK_DATA_ERROR,
  REMOVE_BOOK_DATA_REQUEST,
  REMOVE_BOOK_DATA_SUCCESS,
  REMOVE_BOOK_DATA_ERROR,
  REMOVE_BASKET_SUCCESS,
  REMOVE_BASKET_ERROR,
  REMOVE_BASKET_REQUEST,
  MOVE_TO_BASKET_REQUEST,
  MOVE_TO_BASKET_SUCCESS,
  MOVE_TO_BASKET_ERROR,
} from '../reducers/BookList';
import KaKao_Book_API from '../Api/BookAPI';
import {
  book_Basket_Delete,
  book_Delete,
  SentensDelete,
  book_Basket_Move,
} from '../db/realmFile';

function* search_Book_Data(action) {
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

function* remove_Book_Mark_Data(action) {
  try {
    yield call(SentensDelete, action.data);

    yield put({
      type: BOOK_MARK_DATA_SUCCESS,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: BOOK_MARK_DATA_ERROR,
      data: e,
      error: true,
    });
  }
}

function* remove_Book_Data(action) {
  try {
    yield call(book_Delete, action.data);

    yield put({
      type: REMOVE_BOOK_DATA_SUCCESS,
    });
  } catch (e) {
    ß;
    console.error(e);
    yield put({
      type: REMOVE_BOOK_DATA_ERROR,
      data: e,
      error: true,
    });
  }
}

function* remove_Basket_Data(action) {
  try {
    yield call(book_Basket_Delete, action.data);

    yield put({
      type: REMOVE_BASKET_SUCCESS,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: REMOVE_BASKET_ERROR,
      data: e,
      error: true,
    });
  }
}

function* Move_To_Basket_Data(action) {
  try {
    yield call(book_Basket_Move, action.data);
    yield call(book_Basket_Delete, action.data);

    yield put({
      type: MOVE_TO_BASKET_SUCCESS,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: MOVE_TO_BASKET_ERROR,
      data: e,
      error: true,
    });
  }
}

function* searchBook() {
  yield takeEvery(SERACH_BOOK_DATA_REQUEST, search_Book_Data);
}

function* removeBookMark() {
  yield takeEvery(BOOK_MARK_DATA_REQUEST, remove_Book_Mark_Data);
}

function* removeBook() {
  yield takeEvery(REMOVE_BOOK_DATA_REQUEST, remove_Book_Data);
}

function* removeBasket() {
  yield takeEvery(REMOVE_BASKET_REQUEST, remove_Basket_Data);
}

function* MoveToBasket() {
  yield takeEvery(MOVE_TO_BASKET_REQUEST, Move_To_Basket_Data);
}

export default function* apiSaga() {
  yield all([
    fork(searchBook),
    fork(removeBookMark),
    fork(removeBook),
    fork(removeBasket),
    fork(MoveToBasket),
  ]);
}
