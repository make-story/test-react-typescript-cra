/*
리액트 라우터를 적용할 때 만들어야 하는 페이지는 pages/하위

-
blog 프로젝트 설계 순서
1. 프레젠테이션 컴포넌트 파일 생성하기 (어떠한 View 컴포넌트가 필요한지 구조만 잡는 형태, pages/)
    - imdex.js, App.js 포함
2. SPA 구조로 작업할 경우 라우팅 작업 (URL과 컴포넌트 매칭)
3. 스타일 공통 부분 컴포넌트 작업 (공통 버튼 등, components/common/)
4. 리덕스 적용 (전역 상태 관리 도구 활용) - $ yarn add redux react-redux redux-action immer redux-devtools-extension
    - 불변성 관리 immer 은 필수가 아님
    - Ducks 패선을 사용하여 액션 타입, 액션 생성 함수, 리듀서가 하나의 파일에 다 정의되어 있는 리덕스 모듈 작성 (modules/)
    - 루트 리듀서 (/moduls/index.js)
    - 루트 리듀서 적용 (Provider, /index.js)
    - 비동기 작업을 쉽게 관리하기 위해 redux-saga 사용 - $ yarn add axios redux-saga
    - 쿼리 문자열을 객체로 변환할 때 qs 사용 - $ yarn add qs


*/
import React from 'react';
import { Route } from 'react-router-dom';
import PostListPage from './pages/PostListPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import WritePage from './pages/WritePage';
import PostPage from './pages/PostPage';

const App = () => {
    return (
        <>
            <Route component={PostListPage} path={['/@:username', '/']} exact />
            <Route component={LoginPage} path="/login" />
            <Route component={RegisterPage} path="/register" />
            <Route component={WritePage} path="/write" />
            <Route component={PostPage} path="/@:username/:postId" />
        </>
    );
};

export default App;