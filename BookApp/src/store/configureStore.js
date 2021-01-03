import {createStore, applyMiddleware} from 'redux';

import rootReducer from '../reducers';

import {composeWithDevTools} from 'redux-devtools-extension';

/* const sagaMiddleware = createSagaMiddleware(); */

const store = createStore(
  rootReducer, // 리듀서 연결
  composeWithDevTools(),
);
/* sagaMiddleware.run(rootSaga); */

export default store;
