/*
프레젠테이셔널 컴포넌트 - 주로 상태 관리가 이루어지지 않고, 그저 props 를 받아 와서 화면에 UI를 보여주기만 하는 컴포넌트
*/
import React from 'react';

const Counter = ({ onIncrease, onDecrease, number }) => {
    return (
        <div>
            <h1>{number}</h1>
            <button onClick={onIncrease}>+1</button>
            <button onClick={onDecrease}>-1</button>
        </div>
    );
};

export default Counter;
