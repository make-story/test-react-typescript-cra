/*
컨테이너 컴포넌트 만들기 - 리덕스 스토어와 연동된 컴포넌트를 컨테이너 컴포넌트라고 부릅니다.
컨테이너 컴포넌트는 리덕스와 연동되어 있는 컴포넌트로, 리덕스로부터 상태를 받아오기도 하고 리덕스 스토어에 액션을 디스패치하기도 합니다.
*/
import React from 'react';
import { connect } from 'react-redux';
import { increase, decrease } from '../modules/counter';
import Counter from '../components/Counter';

// 컨테이너 컴포넌트 --> 상태값/디스패치 props 통해 넘겨줌 --> 프레젠테이션 컴포넌트
const CounterContainer = ({ number, increase, decrease }) => {
    return (
        <Counter number={number} onIncrease={increase} onDecrease={decrease} />
    );
};

// 이 컴포넌트를 리덕스와 연동하려면 react-redux 에서 제공하는 connect 함수를 사용
export default connect(
    // 상태를 컴포넌트의 props 로 넘겨주기 위해 설정하는 함수
    state => ({
        number: state.counter
    }),
    // 액션 생성 함수를 컴포넌트의 props 로 넘겨주기 위해 사용하는 함수
    {
        increase,
        decrease
    }
    // 연동할 컨테이너 컴포넌트
)(CounterContainer);