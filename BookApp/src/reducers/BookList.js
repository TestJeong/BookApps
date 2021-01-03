import produce from 'immer';
import {act} from 'react-test-renderer';

export const init = {
  location: false,
  bookdata: [],
};

export const TEST_REDUX = 'TEST_REDUX';
export const TEST_REDUXSS = 'TEST_REDUXSS';

const reducer = (state = init, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case TEST_REDUX:
        draft.location = true;
        draft.bookdata.push({list: action.data});
        break;

      case TEST_REDUXSS:
        draft.bookdata.push({list: action.data});
        break;

      default:
        return state;
    }
  });
};

export default reducer;
