import React from 'react';
import ReactDOM from 'react-dom';
import './blog-frontend/index.css';
import App from './blog-frontend/App';
//import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from  'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import rootReducer, { rootSaga } from './blog-frontend/modules' ;
import { tempSetUser, check } from './blog-frontend/modules/user';

// redux-saga 미들웨어 적용
const sagaMiddleware = createSagaMiddleware();

// 스토어
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));

function loadUser() {
	try {
		const user = localStorage.getItem('user');
		if(!user) return; // 로그인 상태가 아니라면 아무것도 안함

		store.dispatch(tempSetUser(user));
		store.dispatch(check());
	}catch(e) {
		console.log('localStorage is not working');
	}
}

sagaMiddleware.run(rootSaga);
loadUser();

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>,
	document.getElementById('root'),
);

//serviceWorker.unregister();