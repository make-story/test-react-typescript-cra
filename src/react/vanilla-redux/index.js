import { createStore } from 'redux';

/*
리덕스 라이브러리
리덕스를 사용하면 컴포넌트의 상태 업데이트 관련 로직을 다른 파일로 분리시켜서 더욱 효율적으로 관리할 수 있습니다.
또한, 컴포넌트끼리 똑같은 상태를 공유해야 할 때도 여러 컴포넌트를 거치지 않고 손쉽게 상태 값을 전달하거나 업데이트할 수 있습니다.

리덕스 라이브러리는 전역 상태를 관리할 때 굉장히 효과적입니다.
물론 리덕스를 사용하는 것이 유일한 해결책은 아닙니다. 리액트 v16.3 이 릴리즈되면서 Context API가 개선되기 전에는
사용 방식이 매우 불편했기 때문에 주로 리덕스를 사용해 전역 상태 관리를 해 왔습니다.

단순히 전역 상태 관리만 한다면 Context API를 사용하는 것만으로도 충분합니다.
하지만 리덕스를 사용하면 상태를 더욱 체계적으로 관리할 수 있기 때문에 프로젝트의 규모가 클 경우에는 리덕스를 사용하는 편이 좋습니다.


> 액션
상태에 어떠한 변화가 필요하면 액션(action)이란 것이 발생합니다. 
이는 하나의 객체로 표현되는 데요.
{
	type: 'TOGGLE_VALUE'
}
액션 객체는 type 필드를 반드시 가지고 있어야 합니다.
이 값을 '액션의 이름'이라고 생각하면 됩니다.

그리고 그 외의 값들은 나중에 상태 업데이트를 할 때 참고해야 할 값이며, 작성자 마음대로 넣을 수 있습니다.
{
	type: 'ADD_TODO',
	data: {
		id: 1,
		text: '리덕스 배우기'
	}
}
또는
{
	type: 'CHANGE_INPUT',
	text: '안녕하세요'
}

* 액션이름 (액션이름 상수로 관리)
const TOGGLE_VALUE = 'vanilla-redux/TOGGLE_VALUE'; 


> 액션 생성 함수
액션 생성 함수(action creator)는 '액션 객체를 만들어 주는 함수'입니다.
어떤 변화를 일으켜야 할 때마다 액션 객체를 만들어야 하는데 매번 액션 객체를 직접 작상하기 번거로울 수 있고, 만드는 과정에서 실수로 정보를 놓칠 수도 있습니다.
이러한 일을 방지하기 위해 이를 '함수'로 만들어서 관리합니다.
function addTodo(data) {
	return {
		type: 'ADD_TODO',
		data
	};
}
또는
const changeInput = text => ({
	type: 'CHANGE_INPUT',
	text
});


> 리듀서
리듀서(reducer) 는 변화를 일으키는 함수입니다.
액션을 만들어서 발생시키면 '리듀서가 현재 상태와 전달받은 액션 객체를 파라미터로 받아 옵니다.' 
그리고 두 값을 참고하여 새로운 상태를 만들어서 반환해 줍니다.
const initialState = {
	counter: 1,
};
function reducer(state = initialState, action) {
	switch(action.type) {
		case TOGGLE_VALUE:
			return {
				...state,
				counter: state.countet + 1,
			};
		default:
			return state;
	}
}


> 스토어
프로젝트에 리덕스를 적용하기 위해 스토어(store)를 만듭니다.
한 개의 프로젝트는 단 하나의 스토어만 가질 수 있습니다. 
스토어 안에는 현재 애플리케이션 상태와 리듀서가 들어가 있으며, 그 외에도 몇 가지 중요한 내장 함수를 지닙니다.


> 디스패치
디스패치(dispatch)는 스토어의 내장 함수 중 하나입니다.
디스패치는 '액션을 발생시키는 것'이라고 이해하면 됩니다. 
이 함수는 dispatch(action) 과 같은 형태로 액션 객체를 파라미터로 넣어서 호출합니다.
이 함수가 호출되면 스토어는 리듀서 함수를 실행시켜서 새로운 상태를 만들어 줍니다.


> 구독
구독(subscribe)도 스토어의 내장 함수 중 하나입니다.
subscribe 함수 안에 리스너 함수를 파라미터로 넣어서 호출해 주면, 
이 리스너 함수가 액션이 디스패치되어 상태가 업데이트될 때마다 호출됩니다.


> 리액트 없이 쓰는 리덕스
리덕스는 리액트에 종속되는 라이브러리가 아닙니다.
리액트에서 사용하려고 만들어졌지만 실제로 다른 UI 라이브러리/프레임워크와 함께 사용할 수도 있습니다.
리덕스는 바닐라(vanilla) 자바스크립트와 함께 사용할 수도 있습니다.


> Parcel 도구
https://ko.parceljs.org/
설정이 필요없는 번들러


> 리덕스의 세 가지 규칙
1. 단일 스토어
하나의 애플리케이션 안에는 하나의 스토어가 들어 있습니다. 사실 여러 개의 스토어를 사용하는 것이 완전히 불가능하지는 않습니다.
특정 업데이트가 너무 빈번하게 일어나거나 애플리케이션의 특정 부분을 완전히 분리시킬 때 여러 개의 스토어를 만들 수도 있지만, 
상태 관리가 복잡해질 수 있으므로 권장하지 않습니다.

2. 읽기 전용 상태
리덕스 상태는 읽기 전용입니다. 기존에 리액트에서 setState 를 사용하여 state 를 업데이트할 때도 객체나 배열을 업데이트하는 과정에서 불변성을 지켜 주기 위해 spread 연산자(…연산자)를 사용하거나 immer 와 같은 불변성 관리 라이브러리를 사용합니다.
리덕스도 마찬가지 입니다. 상태를 업데이트할 때 기존의 객체는 건드리지 않고 새로운 객체를 생성해 주어야 합니다.

리덕스에서 불변성을 유지해야 하는 이유는 내부적으로 데이터가 변경되는 것을 감지하기 위해 얕은 비교(shallow equality) 검사를 하기 때문입니다. 객체의 변화를 감지할 때 객체의 깊숙한 안쪽까지 비교하는 것이 아니라 겉핥기 식으로 비교하여 좋은 성능을 유지할 수 있는 것이죠.

3. 리듀서는 순수한 함수
변화를 일으키는 리듀서 함수는 순수한 함수여야 합니다. 순수한 함수는 다음 조건을 만족합니다.
- 리듀서 함수는 이전 상태와 액션 객체를 파라미터로 받습니다.
- 파라미터 외의 값에는 의존하면 안 됩니다.
- 이전 상태는 절대로 건드리지 않고, 변화를 준 새로운 상태 객체를 만들어서 반환합니다.
- 똑같은 파라미터로 호출된 리듀서 함수는 언제나 똑같은 결과 값을 반환합니다.

리듀서 함수 내부에서 랜덤 값을 만들거나, Date 함수를 사용하여 현재 시간을 가져오거나, 네트워크 요청을 한다면, 파라미터가 같아도 다른 결과를 만들어 낼 수 있기 때문에 사용하면 안 됩니다.
*/

const divToggle = document.querySelector('.toggle');
const counter = document.querySelector('h1');
const btnIncrease = document.querySelector('#increase');
const btnDecrease = document.querySelector('#decrease');
console.log(divToggle);
console.log(btnIncrease);
console.log(btnDecrease);

// 1. 액션 타입 정의하기
// 액션 이름 (상태관리가 필요한 것의 이름)
const TOGGLE_SWITCH = 'TOGGLE_SWITCH';
const INCREASE = 'INCREASE';
const DECREASE = 'DECREASE';

// 2. 액션 생성 함수 만들기 - 액션 객체를 만들어 주는 함수
// 액션 이름을 사용하여, 액션 객체를 만드는 액션 생성 함수를 작성
// 액션 객체는 type 값을 반드시 가지고 있어야 하며, 그 외에 추후 상태를 업데이트할 때 참고하고 싶은 값은 마음대로 추가 가능 
const toggleSwitch = () => ({type: TOGGLE_SWITCH/*액션 객체는 type 필드는 반드시 가지고 있어야 합니다.*/});
const increase = difference => ({type: INCREASE/*액션 객체는 type 필드는 반드시 가지고 있어야 합니다.*/, difference/*나중에 상태 업테이트를 할 때 참고해야 할 값(작성자 마음대로 넣는 값)*/});
const decrease = () => ({type: DECREASE/*액션 객체는 type 필드는 반드시 가지고 있어야 합니다.*/});

// 3. 초기 상태 값 (상태는 꼭 객체일 필요가 없습니다. initialState = 0 처럼 숫자값도 작동합니다.)
// 초기값 설정
const initialState = {
	toggle: false,
	counter: 0
};

// 4. 리듀서 함수 만들기
// 리듀서는 변화를 일으키는 함수입니다. 
// 액션을 만들어서 발생시키면 리듀서가 현재 상태와 전달받은 액션 객체를 파라미터로 받아 옵니다. 
// (함수의 파리미터로는 state 와 action 값을 받아 옵니다.)
// 그리고 두 값을 참고하여 새로운 상태를 만들어서 반환해 주면 됩니다.
// (state 가 undefined 일 때는 initialState 를 기본값으로 사용)
function reducer(state = initialState, action) {
	// action.type 에 따라 다른 작업을 처리함
	switch(action.type) {
		case TOGGLE_SWITCH:
			return {
				...state, // 불변성 유지를 해 주어야 합니다.
				toggle: !state.toggle
			};
		case INCREASE:
			return {
				...state,
				counter: state.counter + action.difference
			};
		case DECREASE:
			return {
				...state,
				counter: state.counter - 1
			};
		default:
			return state;
	}
}

// ---------- ---------- ---------- ---------- ---------- ----------

// > 스토어 만들기
// 프로젝트에 리덕스를 적용하기 위해 스토어(store)를 만듭니다.
const store = createStore(reducer);


// > render 함수 만들기
// 이 함수는 상태가 업데이트될 때마다 호출되며, 리액트의 render 함수와는 다르게 이미 html을 사용하여 만들어진 UI의 속성을 상태에 따라 변경해 줍니다.
const render = () => {
	const state = store.getState(); // 현재 상태를 불러옵니다.
	// 토글 처리
	if(state.toggle) {
		divToggle.classList.add('active');
	}else {
		divToggle.classList.remove('active');
	}
	// 카운트 처리
	counter.innerHTML = state.counter;
};
render();
store.subscribe(render); // 구독하기: 상태가 업데이트 될 때마다 render 함수를 호출하도록 한다.


// > 구독하기
// subscribe 함수 안에 리스너 함수를 파라미터로 넣어서 호출해주면, 이 리스너 함수가 액션이 디스패치되어 상태가 업데이트될 때마다 호출됩니다.
// 스토어 상태가 바뀔 때마다 render 함수가 호출되도록 해 줄 것입니다.
// 이 작업은 스토어의 내장 함수 subscribe 를 사용하여 수행할 수 있습니다.
// subscribe 함수의 파라미터로는 함수 형태의 값을 전달해 줍니다.
// 이렇게 전달된 함수는 추후 액션이 발생하여 상태가 업데이트될 때마다 호출됩니다.
const listener = () => {
	console.log('상태가 업데이트됨');
}
const unsubscribe = store.subscribe(listener);
unsubscribe(); // 추후 구독을 비활성화 할 때 함수를 호출
// 참고: subscribe 함수를 직접 사용하지만, 리액트 프로젝트에서 리덕스를 사용할 때는 이 함수를 직접사용하지 않을 것. 
// 왜냐하면, 컴포넌트에서 리덕스 상태를 조회하는 과정에서 react-redux 라는 라이브러리가 이 작업을 대신해 주기 때문.


// > 액션 발생시키기 (디스패치)
// 액션을 발생시키는 것을 디스패치라고 합니다. 
// 디스패치는 '액션을 발생시키는 것'이라고 이해하면 됩니다.
// (디스패치를 할 때는 스토어의 내장 함수 dispatch 를 사용합니다.) 
// dispatch(action) 과 같은 형태로 액션객체를 파라미터로 넣어서 호출합니다.
divToggle.onclick = () => {
	store.dispatch(toggleSwitch());
};
btnIncrease.onclick = () => {
	store.dispatch(increase(1));
};
btnDecrease.onclick = () => {
	store.dispatch(decrease());
};