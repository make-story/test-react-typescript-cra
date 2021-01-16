# React + Typescript 학습

> 리액트 설계 원칙  
https://ko.reactjs.org/docs/design-principles.html

## 설치
> `React Create App` 활용  

신규 프로젝트 폴더
```
$ create-react-app test-react-typescript-cra.git --template typescript
$ cd test-react-typescript-cra.git
```
또는 현재 폴더
```
$ create-react-app . --template typescript
```

> `웹팩(WebPack)` 활용 (직접구성 방식)  
```
$ yran add react react-dom  
$ yran add typescript
$ yarn add babel-loader @babel/preset-env  
$ yarn add ts-loader @babel/preset-typescript @babel/preset-react  
```

.babelrc 또는 webpack.config.js 설정 (.babelrc 우선순위를 가짐)
```json
{
	"presets": [
		"@babel/preset-env",
		"@babel/preset-typescript",
		"@babel/preset-react"
	]
}
```
```javascript
module.exports = {
	// ...
	module: {
		rules: [
			{ 
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							'@babel/preset-env',
							'@babel/preset-typescript',
							'@babel/preset-react',
						] 
					},
				},
			},
			{
				test: /\.(ts|tsx)$/, // TypeScript 를 사용 할때는 .ts (리액트 컴포넌트의 경우에는 .tsx) 확장자를 사용
				exclude: /node_modules/,
				use: [
					{
						loader: 'ts-loader',
						options: {
							transpileOnly: true
						}
					},
				],
			},
		]
	},
	// ...
};
```

## 개발모드 실행
```
$ yarn start
```

## 테스트 실행
https://create-react-app.dev/docs/running-tests/
```
$ yarn test
```

## 빌드 실행
`/build` 폴더에 빌드결과 생성
```
$ yarn build
```

## 빌드/실행 등 숨김해제 (webpack, Babel, ESLint 등)
`한번 실행 후 되돌릴 수 없음`
```
$ yarn eject
```

----------

### 학습
> `/src/react/bacics` 주석 참고

- Props  
`components/Props`  

- Children  
`components/Children`  

- Class  
`components/Class`  

- State  
`components/State`  

- Event  
`components/Event`  

- ref  
`components/REF`  

- Hook  
`components/Hook`  

- Immer  
`components/Immer`  

- Route  
`components/Route`  
`components/WithRouter`  
`components/Switch`  

- LifeCycle  
`components/LifeCycleSample`  
`components/ErrorBoundary`  

- CSS  
`styles/CSS`  

- CSS Module  
`styles/CSSModule`  

- Scss  
`styles/Sass`  

- StyledComponents  
`styles/StyledComponents`  

----------

# 정리

- 오해  
Virtual DOM을 사용한다고 해서 사용하지 않을 때와 비교하여 무조건 빠른 것은 아닙니다.  
리액트 매뉴얼에는 다음 문장이 있습니다.
> 우리는 다음 문제를 해결하려고 리액트를 만들었습니다.  
`지속적으로 데이터가 변화하는 대규모 애플리케이션 구축하기`

결국에는 적절한 곳에 사용해야 리액트가 지닌 진가를 비로소 발휘할 수 있습니다. 리액트를 사용하지 않아도 코드 최적화를 열심히 하면 DOM 작업이 느려지는 문제를 개선할 수 있고, 또 작업이 매우 간단할 때는(예: 단순 라우팅 정도만 있는 정적인 페이지) 오히려 리액트를 사용하지 않는 편이 더 나은 성능을 보이기도 합니다.  
<br>

리액트는 오직 뷰만 담당합니다.  
리액트는 프레임워크가 아니라 라이브러리입니다. 다른 웹 프레임워크가 Ajax, 데이터 모델링, 라우팅 등과 같은 기능을 내장하고 있는 반면, 리액트는 정말 뷰만 신경 쓰는 라이브러리이므로 기타 기능은 직접 구현하여 사용해야 합니다.  
> 라우팅에는 리액트 라우터(react-router), Ajax 처리에는 axios나 fetch, 상태 관리에는 리덕스(redux)나 MobX 를 사용  
또 리액트는 다른 웹 프레임워크나 라이브러리와 혼용할 수 있음(예: Backbone.js, AngularJS 등)



## JSX
- 감싸인 요소  
컴포넌트에 여러 요소가 있다면 반드시 부모 요소 하나로 감싸야 합니다.  
리액트는 컴포넌트에서 요소 여러 개를 왜 하나의 요소로 감싸 주어야 할까요? 그것은 Virtual DOM에서 컴포넌트 변화를 감지해 낼 때 효율적으로 비교할 수 있도록 컴포넌트 내부는 하나의 DOM트리 구조로 이루어져야 한다는 규칙이 있기 때문입니다.  


- 자바스크립트 표현
JSX 안에서는 자바스크립트 표현식을 쓸 수 있습니다.  
자바스크립트 표현식을 작성하려면 JSX 내부에서 코드를 `{ }`로 감싸면 됩니다.  


- if 문 대신 조건부 연산자  
JSX 내부의 자바스크립트 표현식에서 if 문을 사용할 수는 없습니다.  
하지만 조건에 따라 다른 내용을 렌더링해야 할 때는 JSX 밖에서 if 문을 사용하여 사전에 값을 설정하거나, `{ }` 안에 조건부 연산자를 사용하면 됩니다.  
```jsx
function App() {
	const name = '리액트';
	return(
		<div>
			{name === '리액트' ? (
				<h1>리액트 입니다.</h1>
			) : (
				<h2>리액트가 아닙니다.</h2>
			)}
			또는
			{name === '리액트' ? <h1>리액트 입니다.</h1> : null}
			또는
			{name === '리액트' && <h1>리액트 입니다.</h1>}
		</div>
	);
}
```
> JSX는 언제 괄호`( )`로 감싸야 하나요?  
주로 JSX를 여러 줄로 사용할 때 괄호로 감싸고, 한 줄로 표현할 수 있는 JSX는 감싸지 않습니다. (필수사항 아님)  


- undefined 를 렌더링하지 않기  
리액트 컴포넌트에서는 함수에서 undefined만 반환하여 렌더링하는 상황을 만들면 안 됩니다.
```jsx
function App() {
	const name = undefined;
	return name; // 에러 발생!
}
```
```jsx
function App() {
	const name = undefined;
	return name || '값이 없습니다.'; 
}
```


- 인라인 스타일링
```jsx
function App() {
	const style = {
		backgroundColor: 'black',
	};
	return (
		<div style={style}>
			<div style={
				{
					color: 'aqua',
					fontSize: '48px'
				}
			}>
				TEST!
			</div>
		</div>
	);
}
```


- class 대신 className  
JSX에서는 class가 아닌 className으로 설정해 주어야 합니다.


- 꼭 당아야 하는 태그  
JSX에서는 꼭 닫는 태그가 존재해야 합니다. (또는 self-closing 태그, `<input />`)  


- 주석  
JSX 내부에서 주석을 작성할 때는 `{/* ... */}` 와 같은 형식으로 작성합니다.  



## 컴포넌트
- props  
props 는 properties 를 줄인 표현으로 컴포넌트 속성을 설정할 때 사용하는 요소 입니다.  
props 값은 해당 컴포넌트를 불러와 사용하는 부모 컴포넌트에서 설정할 수 있습니다.  
```javascript
import React from 'react';
import MyComponent from './MyComponent';

const App = () => <MyComponent name="React">TEST</MyComponent>;

export default App;
```
```javascript
// MyComponent
import React from 'react';

const MyComponent = props => {
	return <div>속성 : {props.name}, 태그사이 내용: {props.children}</div>;
};

// 기본값 설정
MyComponent.defaultProps = {
	name: '기본 이름'
};

export default MyComponent;
``` 



## 이벤트 핸들링
- 이벤트 이름은 카멜 표기법으로 작성합니다.  
예를 들어 HTML의 onclick은 리액트에서는 onClick으로 작성해야 합니다. 또 onkeyup 은 onKeyUp 으로 작성합니다.

- DOM 요소에만 이벤트를 설정할 수 있습니다.  
즉 div, button, input, form, span 등의 DOM 요소에는 이벤트를 설정할 수 있지만, 우리가 직접 만든 컴포넌트에는 이벤트를 자체적으로 설정할 수 없습니다.  
예를 들어 다음과 같이 MyComponent 에 onClick 값을 설정한다면 MyComponent 를 클랙할 때 doSomething 함수가 실행되는 것이 아니라, 그냥 이름이 onClick 인 props 를 MyComponent 에게 전달해 줄 뿐입니다.  
```javascript
<MyComponent onClick={doSomething}>
```
따라서 컴포넌트에 자체적으로 이벤트를 설정할 수는 없습니다. 하지만 전달받은 props 를 컴포넌트 내부의 DOM 이벤트로 설정할 수는 있죠.
```javascript
<div onClick={this.props.onClick}>
	{ /* ... */ }
</div>
```



## ref: DOM에 이름 달기
> 리액트 컴포넌트 안에서는 id를 사용하면 안 되나요?  
리액트 컴포넌트 안에서도 id를 사용할 수 있습니다. JSX 안에서 DOM에 id를 달면 해당 DOM을 렌더링할 때 그대로 전달됩니다.  
하지만 특수한 경우가 아니면 사용을 권하지 않습니다. 예를 들어 같은 컴포넌트를 여러 번 사용한다고 가정해 보세요. 
HTML 에서 DOM id 는 유일(unique)해야 하는데, 이런 상황에서는 중복 id 를 가진 DOM 이 어러 개 생기니 잘못된 사용입니다.

> ref는 어떤 상황에서 사용해야 할까?  
`DOM 을 꼭 직접적으로 건드려야 할 때`입니다.  
(리액트에서는 컴포넌트에도 ref를 달 수 있습니다. 이 방법은 주로 컴포넌트 내부에 있는 DOM을 컴포넌트 외부에서 사용할 때 씁니다.)

- 콜백 함수를 통한 ref 설정  
ref 를 만드는 가장 기본적인 방법은 콜백 함수를 사용하는 것입니다.  
ref 를 달고자 하는 요소에 ref 라는 콜백 함수를 props 로 전달해 주면 됩니다. 이 콜백 함수는 ref 값을 파라미터로 전달받습니다. 그리고 함수 내부에서 파라미터로 받은 ref 를 컴포넌트의 멤버 변수로 설정해 줍니다.
```javascript
<input ref={(ref) => {this.input=ref}} />
```
이렇게 하면 앞으로 this.input 은 input 요소의 DOM 을 가리킵니다. ref 의 이름은 원하는 것으로 자유롭게 지정할 수 있습니다. (this.superman=ref)

- 컴포넌트에 ref 달기  
`함수 컴포넌트는 인스턴스가 없기 때문에 ref 를 줄 수 없습니다.`
```javascript
// ScrollBox
import React, { Component } from 'react';

class ScrollBox extends Component {
	scrollToBottom() {
		const { scrollHeight, clientHeight } = this.box;
		// 스크롤 이동
		this.box.scrollTop = scrollHeight - clientHeight;
	}

	render() {
		const style = {
			border: '1px solid block',
			height: '300px',
			width: '300px',
			overflow: 'auto',
			position: 'relative'
		};
		const innerStyle = {
			width: '100px',
			height: '650px',
			background: 'linear-gradient(white, black)'
		};
		return (
			<div style={style} ref={(ref) => this.box=ref}>
				<div style={innerStyle}></div>
			</div>
		);
	}
}

export default ScrollBox;
```
```javascript
// App
import React, { Component } from 'react';
import ScrollBox from './ScrollBox';

class App extends Component {
	render() {
		return (
			<div>
				<ScrollBox ref={(ref) => {this.scrollBox=ref}} />
				<button onClick={() => this.scrollBox.scrollToBottom()}>
					맨 밑으로 이동!
				</button>
			</div>
		);
	}
}

export default App;
```



## 컴포넌트 반복
- key  
리액트에서 key는 컴포넌트 배열을 렌더링했을 때 어떤 원소에 변동이 있는지 알아내려고 사용합니다.  
예를 들어 유동적인 데이터를 다룰 때는 원소를 새로 생성할 수도, 제거할 수도, 수정할 수도 있죠.  
key가 없을 때는 Virtual DOM을 비교하는 과정에서 리스트를 순차적으로 비교하면서 변화를 감지합니다.  
하지만 key가 있다면 이 값을 사용하여 어떤 변화가 일어났는지 더욱 빠르게 알아낼 수 있습니다.  
```javascript
import React from 'react';

const InterationSample = () => {
	const names = ['A', 'B', 'C'];
	const nameList = names.map((name, index) => <li key={index}>{name}</li>);
	return <ul>{nameList}</ul>;
};

export default InterationSample;
```



## 컴포넌트 라이프 사이클
라이프사이클 메서드의 종류는 총 아홉 가지입니다.  
`Will` 접두사가 붙은 메서드는 어떤 작업을 작동하기 `전`에 실행되는 메서드 이고,  
`Did` 접두사가 붙은 메서드는 어떤 작업을 작동한 `후`에 실행되는 메서드 입니다.  
이 메서드들은 우리가 컴포넌트 클래스에서 덮어 써 선언함으로써 사용할 수 있습니다.  
라이프사이클은 총 세 가지, 즉 `마운트`, `업데이트`, `언마운트` 카테고리로 나눕니다.  

- 마운트  
DOM 이 생성되고 웹 브라우저상에 나타나는 것을 `마운트(mount)`라고 합니다.  
	- constructor : 컴포넌트를 새로 만들 때마다 호출되는 클래스 생성자 메서드 입니다.
	- getDerivedStateFromProps: props에 있는 값을 state에 넣을 때 사용하는 메서드 입니다.
	- render : 우리가 준비한 UI를 렌더링하는 메서드 입니다.
	- componentDidMount : 컴포넌트가 웹 브라우저상에 나타난 후 호출하는 메서드 입니다.

- 업데이트  
컴포넌트는 다음과 같은 총 네 가지 경우에 업데이트 합니다.
1. props 가 바뀔 때
2. state 가 바뀔 때
3. 부모 컴포넌트가 리렌더링될 때
4. this.forceUpdate 로 강제로 렌더링을 트리거할 때   

이렇게 컴포넌트를 업데이트할 떄는 다음 메서드를 호출 합니다.   
	- getDericedStateFromPops  
	- shouldComponentUpdate  
	- render  
	- getSnapshotBeforeUpdate  
	- componentDidUpdate  

- 언마운트  
마운트의 반대 과정, 즉 컴포넌트를 DOM에서 제거하는 것을 언마운트(unmount)라고 합니다.  
	- componentWillUnmount



## Hooks
- useState  
하나의 useState 함수는 하나의 상태 값만 관리할 수 있습니다.
```javascript
const [value/*상태값*/, setValue/*상태를 설정하는 함수*/] = useState(0/*상태의 기본값*/);
```
(상태를 설정하는 함수를 호출할 경우 컴포넌트 리렌더링)


- useEffect  
리액트 컴포넌트가 렌더링될 때마다 특정 작업을 수행하도록 설정할 수 있는 Hook 입니다.
```javascript
useEffect(() => {
	console.log('렌더링이 완료되었습니다!');
});
useEffect(() => {
	console.log('마운트될 때만 실행됩니다!');
}, []);
const [name. setName] = useState('TEST');
useEffect(() => {
	console.log('특정 값이 업데이트 되었습니다!', name);
}, [name]);
```

useEffet 는 기본적으로 렌더링되고 난 직후마다 실행되며, 두 번째 파라미터 배열에 무엇을 넣는지에 따라 실행되는 조건이 달라집니다.  
컴포넌트가 언마운트되기 전이나 업데이트되기 직전에 어떠한 작업을 수항하고 싶다면 useEffect 에서 뒷정리(cleanup) 함수를 반환해 주어야 합니다.
```javascript
useEffect(() => {
	console.log('effect!');
	return () => {
		console.log('cleanup!');
	};
})
```

- useReducer  
useReducer 는 useState 보다 더 다양한 컴포넌트 상황에 따라 다양한 상태를 다른 값으로 업데이트해 주고 싶을 때 사용하는 Hook 입니다.  
리듀서는 현재 상태, 그리고 업데이트를 위해 필요한 정보를 담은 액션(action) 값을 전달받아 새로운 상태를 반환하는 함수입니다.  
```javascript
import React, { useReducer } from 'react';

function reducer(state, action) {
	// 불변성을 지키면서 업데이트한 새로운 상태를 반환합니다.
	switch(action.type) {
		case 'INCREMENT':
			return { value: state.value + 1 };
		case 'DECREMENT':
			return { value: state.value - 1 };
		default:
			return state;
	}
}

const Counter = () => {
	const [state, dispatch] = useReducer(reducer, { value: 0 });
	// useReducer 두 번째 파라미터에 undefined 를 넣고, 세 번째 파라미터에 초기 상태를 만들어 주는 함수를 넣으면, 컴포넌트가 맨 처음 렌더링될 때만 함수가 호출 됨
	//const [state, dispatch] = useReducer(reducer, undefined, () => ({ value: 0 })); 

	return (
		<>
			<button onClick={() => dispatch({ type: 'INCREMENT' })}>+1</button>
			<button onClick={() => dispatch({ type: 'DECREMENT' })}>-1</button>
		</>
	);
}

export default Counter;
```

Input 상태관리
```javascript
import React, { useReducer } from 'react';

function reducer(state, action) {
	return {
		...state,
		[action.name]: action.value,
	};
}

const Info = () => {
	const [state, dispatch] = useReducer(reducer, { name: '', nickname: '' });
	const { name, nickname } = state;

	const onChange = e => {
		dispatch(e.target); // input element 객체
	};

	return (
		<>
			<input name="name" value={name} onChange={onChange} />
			<input name="nickname" value={nickname} onChange={onChange} />
		</>
	);
}

export default Info;
```


- useMemo  
렌더링하는 과정에서 특정 값이 바뀌었을 때만 연산하고, 원하는 값이 바뀌지 않았다면 이전에 연산했던 결과를 다시 사용합니다.  
```javascript
import React, { useState, useMemo } from 'react';

const getAverage = numbers => {
	console.log('평균값 계산!');
	if(numbers.length === 0) {
		return 0;
	}
	const sum = numbers.reduce((a, b) => a + b);
	return sum / numbers.length;
};

const Average = () => {
	const [list, setList] = useState([]);

	const onChange = e => {
		setList([1, 2, 3]);
	};

	const avg = useMemo(() => {
		return getAverage(list);
	}, [list]); // 렌더링하는 과정에서 특정 값이 변경되었을 때만 실행, 값이 기존과 동일하면 실행 안함

	return (
		<>
			<button onClick={onChange}>변경!</button>
			평균값: {avg}
		</>
	);
};

export default Average;
```


- useCallback  
이 Hook 을 사용하면 이벤트 핸들러 함수를 필요할 때만 생성할 수 있습니다.  
이벤트 핸들러 함수들은 컴포넌트가 리렌더링될 때마다 새로 생성됩니다. 대부분의 경우 이러한 방식은 문제가 없지만, 컴포넌트의 렌더링이 자주 발생하거나 렌더링해야 할 컴포넌트 개수가 많이지면 이 부분을 최적화해 주는 것이 좋습니다.

`숫자, 문자열, 객체처럼 일반 값을 재사용하려면 useMemo 를 사용하고, 함수를 재사용하려면 useCallback 을 사용하세요.`

```javascript
import React, { useState, useMemo, useCallback } from 'react';

const getAverage = numbers => {
	console.log('평균값 계산!');
	if(numbers.length === 0) {
		return 0;
	}
	const sum = numbers.reduce((a, b) => a + b);
	return sum / numbers.length;
};

const Average = () => {
	const [list, setList] = useState([]);
	const [number, setNumber] = useState('');
	
	const onChange = useCallback(e => {
		setNumber(e.target.value);
	}, []); // 컴포넌트가 처음 렌더링될 때만 함수 생성

	const onInsert = useCallback(e => {
		const nextList = list.concat(parseInt(number));
		setList(nextList);
		setNumber('');
	}, [number, list]); // number 또는 list 가 바뀌었을 때만 함수 생성
	
	const avg = useMemo(() => {
		return getAverage(list);
	}, [list]); // 렌더링하는 과정에서 특정 값이 변경되었을 때만 실행, 값이 기존과 동일하면 실행 안함

	return (
		<>
			<input onChange={onChange} />
			<button onClick={onInsert}>등록!</button>
			{list.map((value, index) => (
				<span key={index}>{value}</span>
			))}
			평균값: {avg}
		</>
	);
};

export default Average;
```


- useRef  
useRef Hook 은 함수형 컴포넌트에서 ref 를 쉽게 사용할 수 있도록 해 줍니다.  
useRef 를 사용하여 ref 를 설정하면 useRef 를 통해 만든 객체 안의 current 값이 실제 엘리먼트를 가리킵니다.  
```javascript
import React, { useState, useMemo, useCallback, useRef } from 'react';

const getAverage = numbers => {
	console.log('평균값 계산!');
	if(numbers.length === 0) {
		return 0;
	}
	const sum = numbers.reduce((a, b) => a + b);
	return sum / numbers.length;
};

const Average = () => {
	const [list, setList] = useState([]);
	const [number, setNumber] = useState('');
	const inputElement = useRef(null);
	
	const onChange = useCallback(e => {
		setNumber(e.target.value);
	}, []); // 컴포넌트가 처음 렌더링될 때만 함수 생성

	const onInsert = useCallback(e => {
		const nextList = list.concat(parseInt(number));
		setList(nextList);
		setNumber('');

		// ref 
		inputElement.current.focus(); 
	}, [number, list]); // number 또는 list 가 바뀌었을 때만 함수 생성

	const avg = useMemo(() => {
		return getAverage(list);
	}, [list]); // 렌더링하는 과정에서 특정 값이 변경되었을 때만 실행, 값이 기존과 동일하면 실행 안함

	return (
		<>
			<input onChange={onChange} ref={inputElement} />
			<button onClick={onInsert}>등록!</button>
			{list.map((value, index) => (
				<span key={index}>{value}</span>
			))}
			평균값: {avg}
		</>
	);
};

export default Average;
```


- 커스텀 Hooks 만들기  
여러 컴포넌트에서 비슷한 기능을 공유할 경우, 이를 여러분만의 Hook 으로 작성하여 로직을 재사용할 수 있습니다.  
```javascript
// customHook/useInputs.js
import React, { useReducer } from 'react';

function reducer(state, action) {
	return {
		...state,
		[action.name]: action.value // <input name="" value="" />
	};
}

export default function useInputs(initialForm) {
	const [state, dispatch] = useReducer(reducer, initialForm);
	const onChange = e => {
		dispatch(e.target);
	};
	return [state, onChange];
};
```
```javascript
// Info.js
import React from 'react';
import useInputs from './customHook/useInputs';

const Info = () => {
	const [state, onChange] = useInputs({ name: '', nickname: '' });
	const {name, nickname} = state;

	return (
		<>
			<input name="name" value={name} onChange={onChange} />
			<input name="nickname" value={nickname} onChange={onChange} />
			<p>{name} ({nickname})</p>
		</>
	);
};

export default Info;
```
<br>

usePromise 
```javascript
import { useState, useEffect } from 'react';

export default function usePromise(promiseTarget, dependence=[]) {
	const [loading, setLoading] = useState(false);
	const [resolve, setResolve] = useState(null); // 정상
	const [reject, setReject] = useState(null); // 에러

	useEffect(() => {
		const process = async () => {
			// 로딩상태 변경
			setLoading(true);
			// 실행
			try {
				const result = await promiseTarget();
				setResolve(result);
			}catch (error) {
				setReject(error);
			}
			// 로딩상태 변경
			setLoading(false);
		};
		process();
	}, dependence);

	return [loading, resolve, reject];
};

/*
-
사용 예

const [loading, response, error] = usePromise(() => {
	return axios.get('url');
}, [category]);
*/
```



## Context API
Context API 는 리액트 프로젝트에서 전역적으로 사용할 데이터가 있을 때 유용한 기능입니다.  
(Context API 는 리액트 v16.3 부터 사용하기 쉽게 많이 개선되었습니다.)  

- 새 Context 만들기  
```javascript
// contexts/color.js
import React, { createContext, useState } from 'react';

// Context 기본 상태 지정
// 기본값은 Provider 를 사용하지 않았을 때만 사용됩니다.
// (만약 Provider 를 사용했는데 value 값을 명시하지 않았다면, 이 기본값을 사용하지 않기 떄문에 오류가 발생합니다.)
const ColorContext = createContext({
	state: {
		color: 'block', 
		subcolor: 'red',
	},
	actions: {
		setColor: () => {},
		setSubcolor: () => {},
	}
});

// Provider 를 사용하면 Context 값을 변경할 수 있습니다.
// Context API 를 사용할 컴포넌트에 값 주입
const ColorProvider = ({ children/*props.children*/ }) => {
	const [color, setColor] = useState('black');
	const [subcolor, setSubcolor] = useState('red'); // Consumer 내부에서 상태 변경이 가능하도록 합니다.

	const value = {
		state: { color, subcolor },
		actions: { setColor, setSubcolor },
	};

	// Context 와 컴포넌트 연결 (값 변경)
	// Provider 를 사용할 떄는 value 값을 명시해 주어야 제대로 작동!!
	return (
		<ColorContext.Provider value={value}>
			{children}
		</ColorContext.Provider>
	);
};

const ColorConsumer = ColorContext.Consumer;
//const { Consumer: ColorConsumer } = ColorContext;

// ColorProvider, ColorConsumer 내보내기 
export { ColorProvider, ColorConsumer };

export default ColorContext;
```


- Consumer 사용하기  
Context 를 사용할 컴포넌트 
```javascript
// components/ColorBox.js
import React, { useContext } from 'react';
import ColorContext from '../contexts/color';

const ColorBox = () => {
	const { state } = useContext(ColorContext); // Context 사용하기
	const style = {
		width: '20px',
		height: '20px',
	};

	return (
		<>
			<div style={
				{
					...style,
					background: state.color,
				}
			}></div>
			<div style={
				{
					...style,
					background: state.subcolor,
				}
			}></div>
		</>
	);
};

export default ColorBox;
```
```javascript
// components/SelectColors.js
import React from 'react';
import { ColorConsumer } from '../contexts/color';

const colors = ['red', 'orange', 'yellow', 'green', 'blue'];

const SelectColors = () => {
	return (
		<ColorConsumer>
			{({ actions/* Context 값 */ }) => (
				<div>
					{colors.map((color, index) => (
						<div 
							key={index} 
							style={{ background: color, width: '20px', height: '20px' }} 
							onClick={() => actions.setColor(color)}
							onContextMenu={(event) => { // 마우스 오른쪽 클릭 
								event.preventDefault();
								actions.setSubcolor(color);
							}}
						>
						</div>
					))}
				</div>
			)}
		</ColorConsumer>		
	);
};

export default SelectColors;
```


- Provider  
Context 의 값 변경
```javascript
// App.js
import React from 'react';
import ColorBox from './components/ColorBox';
import { ColorProvider } from './contexts/color';
import SelectColors from './components/SelectColors';

const App = () => {
	return (
		<ColorProvider>
			<div>
				<SelectColors />
				<ColorBox />
			</div>
		</ColorProvider>
	);
};

export default App;
```



## 리덕스 라이브러리 



## redux-saga



## 코드 스플리팅

