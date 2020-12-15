import React from 'react';
import { connect } from 'react-redux';
import { increaseAsync, decreaseAsync } from '../modules/counter';
import Counter from  '../components/Counter';

// 컨테이너 컴포넌트 --> 상태값/디스패치 props 통해 넘겨줌 --> 프레젠테이션 컴포넌트
const CounterContainer = ({ number, increaseAsync, decreaseAsync }) => {
	return (
		<Counter 
			number={number}
			onIncrease={increaseAsync}
			onDecrease={decreaseAsync}
		/>
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
		increaseAsync,
		decreaseAsync
	}
	// 연동할 컨테이너 컴포넌트
)(CounterContainer);