/*
Link 컴포넌트를 사용하여 다른 주소로 이동하기
Link 컴포넌트는 클릭하면 다른 주소로 이동시켜 주는 컴포넌트입니다.
일반 웹 애플리케이션에서는 a 태그를 사용하여 페이지를 전환하는 데요. 리액트 라우터를 사용할 때는 이 태그를 직접 사용하면 안됩니다.
Link 컴포넌트를 사용하여 페이지를 전환하면, 페이지를 새로 불러오지 않고 애플리케이션은 그대로 유지한 상태에서 HTML5 History API를 사용하여 페이지의 주소만 변경해 줍니다.
Link 컴포넌트 자체는 a 태그로 이루어져 있지만, 페이지 전환을 방지하는 기능이 내장되어 있습니다.

* 참고: NavLink
NavLink 는 Link 와 비슷합니다. 
현재 경로와 Link 에서 사용하는 경로가 일치하는 경우 '특정 스타일 혹은 CSS 클래스를 적용할 수 있는 컴포넌트'입니다.
*/
import React from 'react';
import { Route, Link, NavLink } from 'react-router-dom';

const App = () => {
    const activeStyle = {
        background: 'black',
        color: 'white',
    };
    return (
        <div>
            <ul>
                <li>
                    <NavLink activeStyle={activeStyle} to="/" active>홈</NavLink>
                </li>
                <li>
                    <Link to="/about">소개</Link>
                </li>
            </ul>
        </div>
    )
}