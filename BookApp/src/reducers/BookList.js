import produce from 'immer';

export const init = {
  location: false,
  user_book_data: [],

  serach_book_data_loading: false,
  serach_book_data_done: false,
  serach_book_data_error: null,
  serach_book_data: [],
};

export const MY_BOOKLIST_DATA = 'MY_BOOKLIST_DATA';

export const SERACH_BOOK_DATA_REQUEST = 'SERACH_BOOK_DATA_REQUEST';
export const SERACH_BOOK_DATA_SUCCESS = 'SERACH_BOOK_DATA_SUCCESS';
export const SERACH_BOOK_DATA_ERROR = 'SERACH_BOOK_DATA_ERROR';
export const SERACH_BOOK_DATA_RESET = 'SERACH_BOOK_DATA_RESET';

const reducer = (state = init, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case MY_BOOKLIST_DATA:
        draft.location = true;
        draft.user_book_data.push({list: action.data});
        break;

      case SERACH_BOOK_DATA_REQUEST:
        draft.serach_book_data_loading = true;
        draft.serach_book_data_done = false;
        draft.serach_book_data_error = null;
        draft.serach_book_data = state.serach_book_data;
        break;
      case SERACH_BOOK_DATA_SUCCESS:
        draft.serach_book_data_loading = false;
        draft.serach_book_data_done = true;
        draft.serach_book_data_error = null;
        draft.serach_book_data = action.data;
        break;
      case SERACH_BOOK_DATA_ERROR:
        draft.serach_book_data_loading = false;
        draft.serach_book_data_done = false;
        draft.serach_book_data = [];
        draft.serach_book_data_error = action.data;
        break;

      case SERACH_BOOK_DATA_RESET:
        draft.serach_book_data = [];
        draft.serach_book_data_done = false;

        break;

      default:
        return state;
    }
  });
};

export default reducer;
