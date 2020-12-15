/*
Switch 컴포넌트는 여러 Route 를 감싸서 그중 일치하는 단 하나의 라우트만을 렌더링시켜 줍니다.
Switch 를 사용하면 모든 규칙과 일치하지 않을 때 보여 줄 Not Found 페이지도 구현할 수 있습니다.
*/
import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import Home from './RouteTest1';
import About from './RouteTest2';

const App = () => {
    return (
        <div>
            <ul>
                <li>
                    <Link to="/basics">홈</Link>
                </li>
                <li>
                    <Link to="/basics/about">소개</Link>
                </li>
            </ul>

            <Switch>
                <Route path="/basics" component={Home} exact={true} />
                <Route path={['/basics/about', '/basics/info']} component={About} />
                <Route 
                    // path 를 따로 정의하지 않으면 모든 상황에 렌더링 됨
                    render={({ location }) => (
                        <div>
                            <h2>이 페이지는 존재하지 않습니다.</h2>
                            <p>{location.pathname}</p>
                        </div>
                    )}
                />
            </Switch>
        </div>
    );
};

export default App;