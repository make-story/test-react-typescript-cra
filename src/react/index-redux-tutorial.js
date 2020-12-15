import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension'; // Redux DevTools

import ReduxApp from './redux-tutorial/App';
import rootReducer from './redux-tutorial/modules'; // modules/index.js 호출

import '../css/index.css';

// 리덕스 스토어
//const store = createStore(rootReducer);
const store = createStore(rootReducer, composeWithDevTools());

// Provider 컴포넌트를 사용하여 프로젝트에 리덕스 적용하기
ReactDOM.render(
    <Provider store={store}>
        <ReduxApp />
    </Provider>, 
    document.getElementById('root')
);