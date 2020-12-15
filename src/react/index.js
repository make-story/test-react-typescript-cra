import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension'; // Redux DevTools

import TodoApp from './todo/App';
import NewsViewerApp from './news-viewer/App';
import ContextApp from './context-tutorial/App';
import ReduxApp from './redux-tutorial/App';
import rootReducer from './redux-tutorial/modules';

import '../css/index.css';
import { BrowserRouter } from 'react-router-dom';

// 리덕스 스토어
//const store = createStore(rootReducer);
const store = createStore(rootReducer, composeWithDevTools());

// 리액트 라우터
/*ReactDOM.render(
    <BrowserRouter>
        <NewsViewerApp />
    </BrowserRouter>,
    document.getElementById('root')
);*/

// 일반 렌더
//ReactDOM.render(<ReduxApp />, document.getElementById('root'));

// Provider 컴포넌트를 사용하여 프로젝트에 리덕스 적용하기
ReactDOM.render(
    <Provider store={store}>
        <ReduxApp />
    </Provider>, 
    document.getElementById('root')
);