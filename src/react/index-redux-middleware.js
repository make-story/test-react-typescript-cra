import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension'; // Redux DevTools

import ReduxApp from './redux-middleware/App';
import rootReducer from './redux-middleware/modules'; // modules/index.js 호출
import loggerMiddleware from './redux-middleware/lib/loggerMiddleware'; // 미들웨어

import '../css/index.css';

// 리덕스 스토어
//const store = createStore(rootReducer);
//const store = createStore(rootReducer, composeWithDevTools());
const store = createStore(rootReducer, applyMiddleware(loggerMiddleware));

// Provider 컴포넌트를 사용하여 프로젝트에 리덕스 적용하기
ReactDOM.render(
    <Provider store={store}>
        <ReduxApp />
    </Provider>, 
    document.getElementById('root')
);