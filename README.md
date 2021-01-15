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


- useEffect  


- useReducer  

- useMemo  

- useCallback  

- useRef  

- 커스텀 Hooks 만들기  


## Context API



## 리덕스 라이브러리 



## redux-saga



## 코드 스플리팅

