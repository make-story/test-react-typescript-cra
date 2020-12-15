/*
컨테이너 컴포넌트 만들기 - 리덕스 스토어와 연동된 컴포넌트를 컨테이너 컴포넌트라고 부릅니다.
컨테이너 컴포넌트는 리덕스와 연동되어 있는 컴포넌트로, 리덕스로부터 상태를 받아오기도 하고 리덕스 스토어에 액션을 디스패치하기도 합니다.

컨테이너 컴포넌트 --> 상태값/디스패치 props 통해 넘겨줌 --> 프레젠테이션 컴포넌트


> Hooks 를 사용하여 컨테이너 컴포넌트 만들기
리덕스 스토어와 연동된 컨테이너 컴포넌트를 만들 때 connect 함수를 사용하는 대신 
react-redux 에서 제공하는 Hooks 를 사용할 수 있습니다.

- useSelector 로 상태 조회하기
useSelector Hook 을 사용하면 connect 함수를 사용하지 않고도 리덕스의 상태를 조회할 수 있습니다.
const 결과 = useSelector(상태 선택 함수);

-  useDispatch 를 사용하여 액션 디스패치하기
이 Hook 은 컴포넌트 내부에서 스토어의 내장 함수 dispatch 를 사용할 수 있게 해줍니다.
컨테이너 컴포넌트에서 액션을 디스패치해야 한다면 이 Hook 을 사용하면 됩니다.
const dispatch = useDispatch();
duspatch({ type: ‘SAMPLE_ACTION’ });

- useStore 를 사용하여 리덕스 스토어 사용하기
useStore Hook 을 사용하면 컴포넌트 내부에서 리덕스 스토어 객체를 직접 사용할 수 있습니다.
const store = useStore();
store.dispatch({ type: ’SAMPLE_ACTION’ });
store.getState();

useStore 는 컴포넌트에서 정말 어쩌다가 스토어에 직접 접근해야 하는 상환에만 사용해야 합니다.
이를 사용해야 하는 상황은 흔치 않을 것입니다.


> connect 함수와의 주요 차이점 (Hooks 를 사용하여 컨테이너 컴포넌트 만드는 방식과의 차이)
컨테이너 컴포넌트를 만들 때 connect 함수를 사용해도 좋고, useSelector 와 useDispatch 를 사용해도 좋습니다.
하지만 Hooks 를 사용하여 컨테이너 컴포넌트를 만들 대 잘 알아 두어야 할 차이점이 있습니다.

connect 함수를 사용하여 컨테이너 컴포넌트를 만들었을 경우,
해당 컨테이너 컴포넌트의 부모 컴포넌트가 리렌더링될 때 해당 컨테이너 컴포넌트의 props 가 바뀌지 않았다면 리렌더링이 자동으로 방지해서 성능이 최적화 됩니다.

반면 useSelector 를 사용하여 리덕스 상태를 조회했을 때는 이 최적화 작업이 자동으로 이루어지지 않으므로, 성능 최적화를 위해서는 React.memo 를 컨테이너 컴포넌트에 사용해 주어야 합니다.
export default React.memo(컨테이너 컴포넌트);
*/

import React, { useCallback } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux'; 
import Counter from '../components/Counter';
import { increase, decrease } from '../modules/counter';


/*
1. 
컨테이너 컴포넌트 - connect 함수 사용 방식 
*/
// 이 컴포넌트를 리덕스와 연동하려면 react-redux 에서 제공하는 connect 함수를 사용
/*const CounterContainer = ({ number, increase, decrease }) => {
	return (
		<Counter number={number} onIncrease={increase} onDecrease={decrease} />
	);
};*/

// 리덕스 스토어 안의 
// 상태를 컴포넌트의 props 로 넘겨주기 위해 설정하는 함수
/*const mapStateToProps = state => ({
	number: state.counter.number,
});*/
// 액션 생성 함수를 컴포넌트의 props 로 넘겨주기 위해 사용하는 함수
/*const mapDispatchToProps = dispatch => ({
	increase: () => {
		console.log('increase');
		dispatch(increase());
	},
	decrease: () => {
		console.log('decrease');
		dispatch(decrease());
	},
});*/

// connect(mapStateToProps, mapDispatchToProps)(연동할 컴포넌트)
/*export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(CounterContainer);*/

// mapStateToProps / mapDispatchToProps 함수를 별도 선언하지 않고, 바로 사용 방법
/*export default connect(
	state => ({
		number: state.counter.number,
	}),
	displatch => ({
		increase: () => displatch(increase()),
		decrease: () => displatch(decrease()),
	}),
)(CounterContainer);*/

// mapDispatchToProps 에 해당하는 파라미터를 함수 형태가 아닌 액션 생성 함수로 이루어진 객체 형태로 넣어 주는 방법
// connect 함수가 내부적으로 bindActionCreators 작업을 대신해 준다.
/*export default connect(
	// 상태를 컴포넌트의 props 로 넘겨주기 위해 설정하는 함수
	state => ({
		number: state.counter.number,
	}),
	// 액션 생성 함수를 컴포넌트의 props 로 넘겨주기 위해 사용하는 함수 (객체 형태로 넣어주면 connect 함수가 내부적으로 대신 작업)
	{
		increase,
		decrease,
	},
	// 연동할 컨테이너 컴포넌트
)(CounterContainer);*/



/*
2. 
connect 함수가 아닌, useSelector, useDispatch Hook 사용 방식 
*/
// useSelector Hook 을 사용하면 connect 함수를 사용하지 않고도 리덕스의 상태를 조회할 수 있습니다.
// useDispatch Hook 은 컴포넌트 내부에서 스토어의 내장 함수 dispatch 를 사용할 수 있게 해줍니다.
const CounterContainer = () => {
	const number = useSelector(state => state.counter.number);
	const dispatch = useDispatch();

	/*return (
		<Counter 
			number={number} 
			onIncrease={() => dispatch(increase())}
			onDecrease={() => dispatch(decrease())}
		/>
	);*/

	// useCallback 를 통해 성능 최적화 가능
	// 숫자가 바뀌어서 컴포넌트가 리렌더링될 때마다 onIncrease 함수와 onDecrease 함수가 새롭게 만들어지고 있으므로 최적화 필요
	const onIncrease = useCallback(() => dispatch(increase()), [dispatch]);
	const onDecrease = useCallback(() => dispatch(decrease()), [dispatch]);
	return (
		<Counter number={number} onIncrease={onIncrease} onDecrease={onDecrease} />
	);
};

// connect 함수가 아닌 useSelector Hook 를 사용할 경우는 바로 반환
export default CounterContainer;