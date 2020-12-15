/*
Route 컴포넌트를 사용하면 어떤 규칙을 가진 경로에 어떤 컴포넌트를 보여 줄지 정의할 수 있습니다.
(Link / NavLink 는 Link.js 에서 설명)

/about 경로로 들어가면 About 컴포넌트만 나오기를 기대했지만, 예상과 다르게 두 컴포넌트가 모두 나타납니다.
/about 경로가 / 규칙에도 일치하기 때문에 발생한 현상입니다.
이를 수정하려면 Home 을 위한 Route 컴포넌트를 사용할 때 exact 라는 porps 를 true 로 설정하면 됩니다.

-
서브 라우트
서브 라우트는 라우트 내부에 또 라우트를 정의하는 것을 의미합니다.
라우트로 사용되고 있는 컴포넌트 내부에 Route 컴포넌트를 또 사용하면 됩니다.
*/
import React from 'react';
import { Route } from 'react-router-dom';
import Home from './RouteTest1';
import About from './RouteTest2';
import Profiles from './RouteTest3';

const App = () => {
    return (
        <div>
            <Route path="/basics" component={Home} exact={true} />
            <Route path={["/basics/about", "/basics/info"]} component={About} />
            <Route path="/basics/profiles" component={Profiles} />
        </div>
    );
};

/*
index.js

프로젝트에서 리액트 라우터를 적용할 때는 index.js 파일에서 react-router-dom 에 내장되어 있는
BrowserRouter 라는 컴포넌트를 사용하여 감싸면 됩니다.
이 컴포넌트는 웹 애플리케이션에 HTML5 의 History API 를 사용하여 페이지를 새로고침하지 않고도 주소를 변경하고,
현재 주소에 관련된 정보를 poops 로 쉽게 조회하거나 사용할 수 있도록 해 줍니다.

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById('root')
);
*/

export default App;