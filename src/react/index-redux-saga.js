// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import App from './redux-saga/App';
import rootReducer, { rootSaga } from './redux-saga/modules/index';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

// 미들웨어
const logger = createLogger();
const sagaMiddleware = createSagaMiddleware();

// 스토어
const store = createStore(
	// 루트 리듀서 등록
	rootReducer,
	// 미들웨어 등록
	applyMiddleware(logger, sagaMiddleware)
);

// 루트 사가 등록
sagaMiddleware.run(rootSaga);

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);

