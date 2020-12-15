/*
https://ko.reactjs.org/docs/hooks-reference.html
*/
import React, { useState, useEffect, useReducer, useMemo, useCallback, useRef } from 'react';
import useInputs from './CustomHook1'; // 커스텀 Hook
import useArticleApi from './CustomHook2'; // 커스텀 Hook

/*
> 함수형 컴포넌트에서 useState 사용하기 - [현재상태값, 상태를 변경하는 함수] = useState(초기값)
리액트 16.8 이전 버전에서는 함수형 컴포넌트에서 state 를 사용할 수 없었습니다.
하지만 16.8 이후부터는 useState 라는 함수를 사용하여 함수형 컴포넌트에서도 state 를 사용할 수 있게 되었습니다. 
(이 과정에서 Hooks 라는 것을 사용)

> state 를 사용할 떄 주의 사항
클래스형 컴포넌트든 함수형 컴포넌트든 state 를 사용할 대는 주의해야 할 사항이 있습니다.
state 값을 바꾸어야 할 떄는 setState 혹은 useState 를 통해 전달받은 세터(Setter) 함수를 사용해야 합니다.
(세터함수는 상태를 바꾸어 주는 함수를 말함)

* props 및 state 정리
props 는 부모 컴포넌트가 설정하고, state 는 컴포넌트 자체적으로 지닌 값으로 컴포넌트 내부에서 값을 업데이트 할 수 있습니다.
props 를 사용한다고 해서 값이 무조건 고정적이지는 않습니다.
부모 컴포넌트의 state 를 자식 컴포넌트의 props로 전달하고, 자식 컴포넌트에서 특정 이벤트가 발생할 때 부모 컴포넌트의 메소드를 호출하면 props 도 유동적으로 사용할 수 있습니다.
*/

const getAverage = numbers => {
	console.log('평균값 계산 실행');
	if(numbers.length === 0) return 0;
	const sum = numbers.reduce((a, b) => a + b);
	return sum / numbers.length;
};

function reducer(state, action) {
	console.log('reducer 실행');
	// action.type 에 따라 다른 작업 수행
	switch(action.type) {
		case 'INCREMENT':
			return { value: state.value + 1 };
		case 'DECREMENT':
			return { value: state.value - 1 };
		default:
			// 아무것도 해당되지 않을 때 기존 상태 반환
			return state;
	}
}

/*
1. useState
const [state, setState] = useState(initialState);
setState(newState)

 > setState(newState) 호출되면 state가 update되고 component가 re-render 된다.
 > state : number, string, array, object 등
 > setState에 함수를 지정하면 이전값을 받아와서 처리할 수 있음
	- 함수에서 리턴하는 값이 새로운 state 값으로 지정됨
	- 한번에 여러번 setState를 하는 경우에는 함수형으로 처리해야함
	setState(prevState => {
		return newState;
	});
 
 > 초기화에 비용이 많이드는 초기값을 설정하는 경우 함수형으로 초기값을 지정하는 방법을 사용하면 좋음
	const [state, useState] = useState(() => { 
		const initialState = someExpensiveComputation(props); 
		return initialState; 
	});

 > re-render가 발생하는 세가지 경우
	- 부모로부터 전달받은 props에 변화가 생길 때
	- state가 변경될 때
	- context가 변경될 때


2. useEffect
useEffect(didUpdate, [dependency]);

 > 최초 render 후에 didUpdate 함수 실행되고, dependency 에 변경이 발생할 때 didUpdate 함수가 실행된다.
 > dependency 에 빈 배열을 지정하면 최초 render 후에 한 번만 실행되고 그 이후에는 실행되지 않음
 > dependency 가 없는 경우 render 발생 후에 항상 didUpdate 가 실행된다
 > 활용
	- 데이터 가져오기
	- DOM 변경 처리하기
	- 타이머, 로깅


3. useMemo
 > render 간에 값을 memoize할 때 사용
	const memoizedValue = useMemo(() => { 
		// some computation... 
		return value; 
	}, [dependency]);
 > dependency에 변경이 발생했을 때만 함수를 실행하여 값을 계산함


4. useCallback
 > render 간에 함수를 memoize할 때 사용
	const onChange = useCallback(e => { 
		setNumber(e.target.value); 
	}, [dependency]);
 > 다음 두 코드는 동일한 기능을 하는 코드임
	useCallback(() => { 
		console.log('hello world!'); 
	}, []); 
	useMemo(() => { 
		const fn = () => { 
			console.log('hello world!'); 
		}; 
		return fn; 
	}, []);


5. useRef
 > DOM 접근에 사용
 > render에 영향을 주지 않는 mutable data 관리에 편리

*/

// 컴포넌트
const Hook = () => {   
	// useState
	// 가변적인 상태를 지닐 수 있게 해줍니다.
	// useState 함수의 파라미터에는 상태의 '기본값'을 넣어 줍니다.
	// 이 함수가 호출되면 배열을 반환하는 데요. 그 배열의 첫 번째 원소는 '상태값', 두 번째 원소는 상태를 설정하는 '함수(세터함수)'입니다.
	// 이 함수에 파라미터를 넣어서 호출하면 전달받은 파라미터로 값이 바뀌고 컴포넌트가 정상적으로 '리렌더링'됩니다.
	// 하나의 useState 함수는 하나의 상태값만 관리할 수 있습니다.
	const [list, setList] = useState([]);
	const [number, setNumber] = useState('');
	
	// useEffect
	// useEffect 는 리액트 '컴포넌트가 렌더링될 때마다 특정 작업을 수행하도록 설정'할 수 있는 Hook
	useEffect(() => {
		console.log('--- --- useEffect');
		console.log('렌더링 되었습니다.');
		console.log('list', list);
		console.log('number', number);
		console.log('--- ---');
	});
	// 마운트 될 때만 실행하고 싶을 때
	// useEffect 에서 설정한 함수를 컴포넌트가 화면에 맨 처음 렌더링될 때만 실행하고, 
	// '업데이트될 때는 실행하지 않으려면 함수의 두번째 파라미터로 비어 있는 배열'을 넣어 주면 된다.
	useEffect(() => {
		console.log('--- --- useEffect');
		console.log('마운트될 때만 실행됩니다.');
		console.log('--- ---');
	}, []);
	// 특정 값이 업데이트될 때만 실행하고 싶을 때 - useState 를 통해 특정 상태 값 업데이트가 발생했을 때, 실행될 수 있도록 할 수 있다. (useState 상태값 업데이트 모니터링)
	// useEffect 를 사용할 때, 특정 값이 변경될 때만 호출하고 싶을 경우도 있겠지요?
	// useEffect 의 두 번째 파리미터로 전달되는 배열 안에 검사하고 싶은 값을 넣어주면, '해당 값이 바뀔때만 실행'
	useEffect(() => {
		console.log('--- --- useEffect');
		console.log('number 값 변경 발생', number);
		console.log('--- ---');
	}, [number]);
	// 뒷정리하기
	// useEffect 는 '기본적으로 렌더링되고 난 직후마다 실행'되며, 두 번째 파라미터 배열에 무엇을 넣는지에 따라 실행되는 조건이 달라집니다.
	// 컴포넌트가 '언마운트되기 전이나 업데이트되기 직전에 어떠한 작업을 수행하고 싶다면, useEffect 에서 뒷정리(cleanup) 함수를 반환'해 주어야 합니다.
	// '오직 언마운트될 때만 뒷정리 함수를 호출하고 싶다면, useEffect 함수의 두 번째 파라미터에 비어있는 배열'을 넣으면 됩니다.
	useEffect(() => {
		console.log('--- --- useEffect');
		console.log('effect (렌더링 되었습니다.)');
		console.log('--- ---');
		return () => {
			console.log('--- --- useEffect');
			console.log('cleanup (리렌더링하기 전 입니다.)');
			console.log('--- ---');
		};
	});
	// async 함수는 promise 객체를 리턴하기 때문에
	// useEffect 함수 자체를 async 함수로 사용할 수는 없다
	/*useEffect(async () => { 
		const result = await axios.get();
	}, []);*/
	/*useEffect(() => { 
		// async 는 내부에서 만들어줘야 한다.
		const fetchArticles = async () => {
			try {
				const result = await axios.get();
				setArticles(result.data);
			}catch (error) {
			
			}
		}
		fetchArticles();
	}, []);*/


	// useLayoutEffect
	// useEffect와 동일하긴 한데, 모든 DOM 변경 후에 동기적으로 발생
	// 이것은 DOM에서 레이아웃을 읽고 동기적으로 리렌더링하는 경우에 사용
	// useLayoutEffect의 내부에 예정된 갱신은 브라우저가 화면을 그리기 이전 시점에 동기적으로 수행


	// useReducer
	// useReducer 는 useState 보다 더 다양한 컴포넌트 상황에 따라 상태를 다른 값으로 업데이트해 주고 싶을 때 사용하는 Hook 입니다.
	// 리듀서는 현재 상태, 그리고 업데이트를 위해 필요한 정보를 담은 액션(action) 값을 전달받아 새로운 상태를 반환하는 함수입니다.
	// 리듀서 함수에서 새로운 상태를 만들 때는 반드시 '불변성'을 지켜주어야 합니다.
	// useReducer 의 첫 번째 파라미터에는 리듀서 함수를 넣고, 두 번째 파라미터에는 해당 리듀서의 기본값을 넣어 줍니다.
	// 이 Hook 을 사용하면 state 값과 dispatch 함수를 받아 오는데요. 여기서 state 는 현재 가지키고 있는 상태고, dispatch 는 액션을 발생시키는 함수입니다.
	// dispatch(action) 과 같은 형태로, 함수 안에 파라미터로 액션 값을 넣어주면 리듀서 함수가 호출되는 구조입니다.
	// useReducer 를 사용했을 때의 가장 큰 장점은 컴포넌트 업데이트 로직을 컴포넌트 바깥으로 빼낼 수 있다는 것입니다.
	const [state, dispatch] = useReducer(reducer, { value: 0 });
	const [stateCustom, dispatchCustom] = useInputs({ // 커스텀 Hook - 내부 useReducer 사용
		name: '',
		nickname: '',
	});
	const { name, nickname } = stateCustom;

	// useMemo
	// useMeno 를 사용하면 함수형 컴포넌트 내부에서 발생하는 연산을 최적화 할 수 있습니다.
	// useMemo 는 렌더링하는 과정에서 특정 값이 바뀌었을 때만 연산을 실행하고, '원하는 값이 바뀌지 않았다면 이전에 연산 했던 결과를 다시 사용하는 방식'입니다.
	const avg = useMemo(() => getAverage(list), [list]);


	// useRef
	// useRef 를 사용하여 ref 를 설정하면, useRef 를 통해 만든 객체 안의 current 값이 실제 엘리먼트룰 가리킵니다.
	const inputElement = useRef(null);


	// useCallback
	// useCallback 은 useMemo와 상당히 비슷한 함수입니다. 
	// 주로 렌더링 성능을 최적화해야 하는 상황에서 사용하는데요.
	// 이 Hook 을 사용하면 '이벤트 핸들러 함수를 필요할 때만 생성'할 수 있습니다. (컴포넌트가 리렌더링될 때마다 이벤트 핸들러 함수가 새로 생성되는 것 방지)
	// useCallback 의 첫 번째 파라미터에는 생성하고 싶은 함수를 넣고, 두 번째 파라미터에는 배열을 넣으면 됩니다.
	// 이 배열에는 어떤 값이 바뀌었을 때 함수를 새로 생성해야 하는지 명시해야 합니다.
	// '비어 있는 배열을 넣게 되면 컴포넌트가 렌더링될 때 단 한번만 함수가 생성'
	// '함수 내부에서 상태값에 의존해야 할 때는 그 값을 반드시 두 번째 파라미터 안에 포함'시켜 주어야 합니다. (의존값이 파라미터로 받는 값이 아닌, 외부 상태 또는 변수값 의존될 때)
	const onChange = useCallback(e => {
		console.log('--- --- useCallback');
		console.log('렌더링될 때만 함수 생성 / 이벤트 핸들러 실행 onChange');
		setNumber(e.target.value);
		console.log('--- ---');
	}, []); // 컴포넌트가 처음 렌더링될 때만 함수 생성 (두번째 파리미터에 빈 [] 배열)
	const onInsert = useCallback(() => {
		console.log('--- --- useCallback');
		console.log('number 혹은 list 값 변경 발생 / 이벤트 핸들러 실행 onInsert');
		const nextList = list.concat(parseInt(number));
		setList(nextList);
		setNumber('');
		inputElement.current.focus();
		console.log('--- ---');
	}, [number, list]); // number 혹은 list 가 바뀌었을 때만 함수 생성
	const onIncrease = useCallback( // useState 의 함수형 업데이트
		// prevNumber 는 현재 number 값을 가리킵니다.
		() => setNumber(prevNumber => prevNumber + 1),
		[]
	);


	// 비동기 데이터 호출/로딩상태/에러상태 커스텀 Hook
	const [articles, isError, isLoading] = useArticleApi();


	return (
		<div>
			<input value={number} onChange={onChange} ref={inputElement} />
			<button onClick={onInsert}>등록</button>
			<button onClick={onIncrease}>함수형 +1</button>
			
			<p>{name} ({nickname})</p>
			<input name="name" value={name} onChange={dispatchCustom} />
			<input name="nickname" value={nickname} onChange={dispatchCustom} />
			
			<ul>
				{list.map((value, index) => (
					<li key={index}>{value}</li>
				))}
			</ul>
			<div>
				평균값: {avg}
			</div>

			<p>현재 카운터 값은 {state.value} 입니다.</p>
			<button onClick={() => dispatch({ type: 'INCREMENT' })}>+1</button>
			<button onClick={() => dispatch({ type: 'DECREMENT' })}>-1</button>
		</div>
	);
};

export default Hook;

