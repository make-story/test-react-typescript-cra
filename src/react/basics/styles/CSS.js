/*
일반 CSS : 컴포넌트를 스타일링하는 가장 기본적인 방식입니다.

기존의 CSS 스타일링이 딱히 불편하지 않고 새로운 기술을 배울 필요가 없다고 생각되면,
일반 CSS를 계속 사용해도 상관없습니다.
*/
import React, { Component } from 'react';
import './CSS.css';

class CSS extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener norefferrer"
                    >
                        Learn React
                    </a>
                </header>
            </div>
        )
    }
}

export default CSS;