import React from 'react';
import ReactDOM from 'react-dom';

import NewsViewerApp from './news-viewer/App';

import '../css/index.css';
import { BrowserRouter } from 'react-router-dom';

// 일반 
//ReactDOM.render(<NewsViewerApp />, document.getElementById('root'));

// 리액트 라우터
ReactDOM.render(
    <BrowserRouter>
        <NewsViewerApp />
    </BrowserRouter>,
    document.getElementById('root')
);