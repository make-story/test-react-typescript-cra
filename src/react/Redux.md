# 리덕스(Redux) 정리  

## 리덕스를 사용하여 리액트 애플리케이션 상태 관리하기  
리액트 프로젝트에서 리덕스를 사용할 때 가장 많이 사용하는 패턴은  
`프레젠테이셔널 컴포넌트`와 `컨테이너 컴포넌트`를 `분리`하는 것입니다.  
여기서 `프레젠테이셔널 컴포넌트`란 주로 상태 관리가 이루어지지 않고, 그저 props 를 받아 와서 화면에 UI를 보여 주기만 하는 컴포넌트를 말합니다.  
이와 달리 `컨테이너 컴포넌트`는 리덕스와 연동되어 있는 컴포넌트로, 리덕스로부터 상태를 받아오기도 하고, 리덕스 스토어에 액션을 디스패치(액션발생시키기)하기도 합니다.  


-----  


### 컨테이너 컴포넌트 만들기 
> 리덕스 스토어와 연동된 컴포넌트를 `컨테이너 컴포넌트`라고 부릅니다.   
 
`컨테이너 컴포넌트`는 리덕스와 연동되어 있는 컴포넌트로,  
리덕스로부터 `상태`를 받아오기도 하고 리덕스 `스토어`에 `액션`을 `디스패치`하기도 합니다.   
> `컨테이너 컴포넌트` --> 상태값/디스패치 props 통해 넘겨줌 --> `프레젠테이션 컴포넌트`  
 
  
- Hooks 를 사용하여 컨테이너 컴포넌트 만들기   
리덕스 스토어와 연동된 컨테이너 컴포넌트를 만들 때 connect 함수를 사용하는 대신   
react-redux 에서 제공하는 Hooks 를 사용할 수 있습니다.  
   
- useSelector 로 상태 조회하기   
useSelector Hook 을 사용하면 connect 함수를 사용하지 않고도 리덕스의 상태를 조회할 수 있습니다.  
const 결과 = useSelector(상태 선택 함수);  

-  useDispatch 를 사용하여 액션 디스패치하기    
이 Hook 은 컴포넌트 내부에서 스토어의 내장 함수 dispatch 를 사용할 수 있게 해줍니다.  
컨테이너 컴포넌트에서 액션을 디스패치해야 한다면 이 Hook 을 사용하면 됩니다.  
```javascript
const dispatch = useDispatch();  
duspatch({ type: ‘SAMPLE_ACTION’ });  
```
  
- useStore 를 사용하여 리덕스 스토어 사용하기  
useStore Hook 을 사용하면 컴포넌트 내부에서 리덕스 스토어 객체를 직접 사용할 수 있습니다.  
```javascript
const store = useStore();  
store.dispatch({ type: ’SAMPLE_ACTION’ });  
store.getState();  
``` 
useStore 는 컴포넌트에서 정말 어쩌다가 스토어에 직접 접근해야 하는 상환에만 사용해야 합니다.  
이를 사용해야 하는 상황은 흔치 않을 것입니다.  


-  connect 함수와의 주요 차이점  
> (Hooks 를 사용하여 컨테이너 컴포넌트 만드는 방식과의 차이)  
컨테이너 컴포넌트를 만들 때 connect 함수를 사용해도 좋고, useSelector 와 useDispatch 를 사용해도 좋습니다.  
하지만 Hooks 를 사용하여 컨테이너 컴포넌트를 만들 대 잘 알아 두어야 할 차이점이 있습니다.  
  
connect 함수를 사용하여 컨테이너 컴포넌트를 만들었을 경우,  
해당 컨테이너 컴포넌트의 부모 컴포넌트가 리렌더링될 때 해당 컨테이너 컴포넌트의 props 가 바뀌지 않았다면 리렌더링이 자동으로 방지해서 성능이 최적화 됩니다.  
  
반면 useSelector 를 사용하여 리덕스 상태를 조회했을 때는 이 최적화 작업이 자동으로 이루어지지 않으므로, 성능 최적화를 위해서는 React.memo 를 컨테이너 컴포넌트에 사용해 주어야 합니다.  
```javascript
export default React.memo(컨테이너 컴포넌트);  
```


-----  

- 개념 (용어설명)  
1. 액션 - `액션 이름 정의`  
상태에 어떠한 변화가 필요하면 액션(action)이란 것이 발생합니다. 이는 하나의 객체로 표현  
액션 객체는 type 필드를 반드시 가지고 있어야 합니다.  
이 값을 액션의 이름이라고 생각하면 됩니다.  
그리고 그 외의 값들은 나중에 상태 업데이트를 살 때 참고해야할 값으로 넣을 수 있음  
```javascript
{ type: 'TOGGLE_VALUE' }  
```

2. 액션 생성 함수 - `액션 객체 생성`  
액션 생성 함수(action creator)는 액션 객체를 만들어 주는 함수입니다.  
어떤 변화를 일으켜야 할 때마다 액션 객체를 만들어야 하는데 매번 액션 객체를 직접 작성하기 번거로울 수도 있고, 만드는 과정에서 실수로 정보를 놓칠 수도 있습니다.   
이러한 일을 방지하기 위해 이를 함수로 만들어서 관리합니다.  
```javascript
const toggleValue = () => ({ type: 'TOGGLE_VALUE '});  
```

3. 리듀서 - `상태 값 변경`  
리듀서(reducer)는 변화를 일으키는 함수입니다.  
액션을 만들어서 발생시키면 리듀서가 현재 상태와 전달받은 액션 객체를 파라미터로 받아옵니다.  
그리고 두 값을 참고하여 새로운 상태를 만들어서 반환해 줍니다.  
```javascript
const reducer = (state, action) => {
    switch(action.type) {
        case 'TOGGLE_VALUE':
            return {
                ...state,
                // 변경
            }
    }
}
```

4. 스토어  
프로젝트에 리덕스를 적용하기 위해 스토어(store)를 만듭니다.
`한 개의 프로젝트는 단 하나의 스토어`만 가질 수 있습니다.

5. 디스패치 - `리듀서 함수 실행`  
디스패치(dispatch, 보내다/해치우다)는 스토어의 내장 함수 중 하나입니다.
디스패치는 `액션을 발생시키는 것`이라고 이해하면 됩니다.
이 함수는 dispatch(action) 과 같은 형태로 액션 객체를 파라미터로 넣어서 호출합니다.
이 함수가 호출되면 스토어는 리듀서 함수를 실행시켜서 새로운 상태를 만들어 줍니다.

6. 구독  
구독(subscribe)도 스토어의 내장 함수 중 하나입니다.
subscribe 함수 안에 리스너 함수를 파라미터로 넣어서 호출해 주면,
이 리스너 함수가 액션이 디스패치되어 `상태가 업데이트될 때마다 호출`됩니다.
```javascript
const listener = () => console.log('상태변경됨');
const unsubscribe = store.subscribe(listener);
unsubscribe(); // 추후 구독을 비활성화할 때 함수를 호출
```


-----  


### 리덕스 설계 순서   
1. modules/counter 리덕스 모듈 만들기 
    - 상태 정의
2. modules/index 루트 리듀서 만들기 
    - 각 리듀스 모듈 하나로 합침
3. index.js 에 스토어를 생성한 후, Provider 로 리액트 프로젝트에 리덕스를 적용 
    - createStore 통해 스토어 생성, <Provider store={store}><App /></Provider>
4. components/Counter 프레젠케이셔널 컴포넌트 만들기 
    - 그저 props 를 받아 와서 화면에 UI를 보여주기만 하는 컴포넌트
5. containers/CounterContainer 컨테이너 컴포넌트 만들기 
    - 리덕스 스토어와 연동된 컴포넌트 
6. App 에서 CounterContainer 를 렌더링
  

### 폴더/파일 구조
- redux-tutorial  
    - components
        - Counter.js
    - containers  
        - CounterContainer.js
    - modules  
        - counter.js
        - index.js
    - App.js
- index-redux-tutorial.js  
  

----- 


`index-redux-tutorial.js`  
```javascript
// index-redux-tutorial.js  

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension'; // Redux DevTools

import ReduxApp from './redux-tutorial/App';
import rootReducer from './redux-tutorial/modules'; // modules/index.js 호출

import '../css/index.css';

// 리덕스 스토어
//const store = createStore(rootReducer);
const store = createStore(rootReducer, composeWithDevTools());

// Provider 컴포넌트를 사용하여 프로젝트에 리덕스 적용하기
ReactDOM.render(
    <Provider store={store}>
        <ReduxApp />
    </Provider>, 
    document.getElementById('root')
);
```


-----


`redux-tutorial/App.js`
```javascript 
// redux-tutorial/App

import React from 'react';
//import Counter from './components/Counter'; // 프레젠테이셔널 컴포넌트
import CounterContainer from './containers/CounterContainer'; // 컨테이너 컴포넌트

/*const App = () => {
    return (
        <div>
            <Counter number={0} />
        </div>
    );
};*/
const App = () => {
    return (
        <div>
            <CounterContainer />
        </div>
    );
};

export default App;
``` 



`redux-tutorial/containers/CounterContainer`
```javascript
// redux-tutorial/containers/CounterContainer

import React, { useCallback } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux'; 
import Counter from '../components/Counter'; // 프레젠테이셔널 컴포넌트
import { increase, decrease } from '../modules/counter'; // 리덕스 모듈 


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
```



`redux-tutorial/components/Counter`
```javascript
// redux-tutorial/components/Counter

// 프레젠테이셔널 컴포넌트 - 주로 상태 관리가 이루어지지 않고, 그저 props 를 받아 와서 화면에 UI를 보여주기만 하는 컴포넌트
import React from 'react';

const Counter = ({ number, onIncrease, onDecrease }) => {
	return (
		<div>
			<h1>{number}</h1>
			<div>
				<button onClick={onIncrease}>+1</button>
				<button onClick={onDecrease}>-1</button>
			</div>
		</div>
	);
};

export default Counter;
```


-----


`redux-tutorial/modules/index.js`
```javascript 
// redux-tutorial/modules/index.js

/*
루트 리듀서 만들기 - combineReducers 이용해 리듀서를 하나로 합쳐주는 것

-
프로젝트에서 여러 리듀서를 만들었을 경우,
나중에 crateStore 함수를 사용하여 스토어를 만들 때는 리듀서를 하나만 사용해야 합니다.
그렇기 때문에 기존에 만들었던 리듀서를 하나로 합쳐주어야 하는데요.
이 작업은 리덕스에서 제공하는 combineReducers 라는 유틸 함수를 사용하면 쉽게 처리할 수 있습니다.

-
이 루트 리듀서를 index.js 에서,
const store = creteStore(루트 리듀서); 
스토어를 생성한 후,
<Provider store={store}>
    <App />
</Provider>
Provider 로 리액트 프로젝트에 리덕스 적용!
*/
import { combineReducers } from 'redux';
import counter from './counter';

const rootReducer = combineReducers({
    counter,
    // ... 모듈 추가
});

export default rootReducer;
``` 

-----

`redux-tutorial/modules/counter.js`
```javascript 
// redux-tutorial/modules/counter.js

/*
리덕스 모듈 만들기 - 상태(action) 정의


> redux-actions
redux-actions 를 사용하면 액션 생성 함수를 더 짧은 코드로 작성할 수 있습니다.
그리고 리듀서를 작성할 때도 switch/case이 아닌 handleActions 라는 함수를 사용하여 각 액션마다 업데이트 함수를 설정하는 형식으로 작성해 줄 수 있습니다.


> createAction - payload
createAction 으로 액션을 만들면,
액션에 필요한 추가 데이터는 payload 라는 이름을 사용합니다.
const MY_ACTION = 'sample/MY_ACTION';
const myAction = createAction(MY_ACTION);
const action = myAction('hello world'); 
결과 : { type: MY_ACTION, payload: 'hello world' }

액션 생성 함수에서 받아 온 파라미터를 그대로 payload 에 넣는 것이 아니라 변형을 주어서 넣고 싶다면,
createAction 의 두 번째 파라미터에 payload 를 정의하는 함수를 따로 선언해서 넣어 주면 됩니다.
const MY_ACTION = 'sample/MY_ACTION';
const myAction = createAction(MY_ACTION, text => `${text}!`);
const action = myAction('hello world'); 
결과 : { type: MY_ACTION, payload: 'hello world!' }
*/
import { createAction, handleActions } from 'redux-actions'; 



// 1. 액션 타입 정의하기 - 상태관리가 필요한 것의 이름
// '모듈이름/액션이름' 과 같은 형태로 작성 (나중에 프로젝트가 커졌을 때 액션의 이름이 출돌되지 않도록)
const INCREASE = 'counter/INCREASE';
const DECREASE = 'counter/DECREASE';


// 2. 액션 생성 함수 만들기 - 액션 객체를 만들어 주는 함수입니다.
/*
액션 객체는 type 필드를 가지고 있음
{
	type: 'INCREASE', // 필수 - type: 액션이름
	사용자추가 데이터키: 값, // 선택적 - 키: 값
}
어떤 변화가 일으켜야 할 때마다 위와 같은 액션 객체를 만들어야 하는데,
매번 액션 객체를 직접 작성하기 번거로울 수도 있고, 만드는 과정에서 실수로 정보를 놓칠 수도 있습니다.
이러한 일을 방지하기 위해 이를 함수로 만들어서 관리합니다.
*/
//export const increase = () => ({type: INCREASE});
//export const decrease = () => ({type: DECREASE});
export const increase = createAction(INCREASE);
export const decrease = createAction(DECREASE);


// 3. 초기 상태 값 (상태는 꼭 객체일 필요가 없습니다. initialState = 0 처럼 숫자값도 작동합니다.)
const initialState = {
	number: 0
};


// 4. 리듀서 함수 만들기 - 리듀서(reducer)는 변화를 일으키는 함수입니다. (상태값 변경)
/*function counter(state=initialState, action) {
	switch(action.type) {
		case INCREASE:
			return {
				number: state.number + 1
			};
		case DECREASE:
			return {
				number: state.number - 1
			};
		default:
			return state;
	}
}*/
// handleActions
const counter = handleActions(
	// 각 액션에 대한 업데이트 함수 
	{
		[INCREASE]: (state, action) => ({ number: state.number + 1 }),
		[DECREASE]: (state, action) => ({ number: state.number - 1 }),
	},
	// 초기 상태 값 
	initialState,
);

export default counter;
```
