# React + Typescript 학습

> 리액트 설계 원칙  
https://ko.reactjs.org/docs/design-principles.html

> 참고페이지  
https://www.tsx.guide/introduction/welcome    
https://fettblog.eu/typescript-react/  
https://fettblog.eu/typescript-react-component-patterns/  

> 리액트 개발자 도구  
크롬 웹 스토어   
`React Developer Tools`  
`Redux DevTools`

> Create React App (CRA)  
https://create-react-app.dev/  


-----


# 리액트 프로젝트 개발 설계  
1. 기능 설계하기 :   
어떤 컴포넌트가 필요할지 생각합니다.  
2. UI 만들기 :  
사용자에게 보이는 UI를 먼저 만듭니다.
3. API 연동하기 :  
API 연동이 필요한 경우 필요한 코드를 준비합니다.  
4. 상태 관리하기 :  
리덕스, 컴포넌트 자체 상태 등을 통해 상태를 관리하고, 필요하면 컨테이너 컴포넌트를 새로 만듭니다.  
(성능상에 문제가 되는 부분은 shouldComponentUpdate 또는 React.memo 를 사용)  

* *UI 구조파악/설계 -> 하나의 파일에서 점진적 영역분리

## 예를 들어 `Todo 프로젝트 설계 순서`
1. App 컴포넌트 초기화(App.js 생성), UI 구조 설계
2. UI 구성하기   
 - TodoTemplate  
	화면을 가운데에 정렬시켜 주며, 앱 타이틀(일정관리)을 보여줍니다.
	children 으로 내부 JSX 를 props로 받아 와서 렌더링해 줍니다.
 - TodoInsert  
	새로운 항목을 입력하고 추가할 수 있는 컴포넌트입니다. 
	state를 통해 인풋의 상태를 관리합니다.
 - TodoListItem  
	각 할 일 항목에 대한 정보를 보여 주는 컴포넌트입니다.
	todo 객체를 props로 받아 와서 상태에 따라 다른 스타일의 UI를 보여 줍니다.
 - TodoList  
	todos 배열을 props 로 받아온 후, 이를 배열 내장 함수 map 을 사용해서 여러 개의 TodoItem 컴포넌트로 변환하여 보여 줍니다.
3. 기능 구현하기  
	일정 항목에 대한 상태들은 모두 App 컴포넌트에서 관리합니다.  
	App 에서 useState 를 사용사여 todos 라는 상태를 정의하고, todos 를 TodoList 의 props 로 전달  


-----


## 설치
> `React Create App` 활용  
https://github.com/Microsoft/TypeScript-React-Starter#typescript-react-starter  

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
https://fettblog.eu/typescript-react/getting-started/#npm-packages-to-install  

```
$ yran add react react-dom  
$ yran add typescript
$ yarn add babel-loader @babel/preset-env  
$ yarn add ts-loader @babel/preset-typescript @babel/preset-react  
```

.babelrc 또는 webpack.config.js 설정   
(webpack 에 babel presets 설정이 있고, .babelrc 파일에도 presets 설정이 있다면, .babelrc 파일이 우선순위를 가짐)
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


-----


## 학습
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


-----


## React.memo

```javascript
import React, { useState, useCallback, useEffect } from 'react';

// React.memo를 사용하여 tag 값이 바뀔 때만 리렌더링되도록 처리 - 컴포넌트
const TagItem = React.memo(({ tag, onRemove, onChangeTags }) => (
	<div onClick={() => onRemove(tag)}>#{tag}</div>
));

// React.memo를 사용하여 tags 값이 바뀔 때만 리렌더링되도록 처리 - 컴포넌트
const TagList = React.memo(({ tags, onRemove }) => (
	<div>
		{tags.map(tag => (
			<TagItem key={tag} tag={tag} onRemove={onRemove} />
		))}
	</div>
));

const TagBox = ({ tags, onChangeTags }) => {
	const [input, setInput] = useState('');
	const [localTags, setLocalTags] = useState([]);

	const insertTag = useCallback(tag => {
		if(!tag) return; // 공백이라면 추가하지 않음
		if(localTags.includes(tag)) return; // 이미 존재한다면 추가하지 않음
	
		const nextTags = [...localTags, tag];
		setLocalTags(nextTags);
		onChangeTags(nextTags);
	}, [localTags, onChangeTags]);

	const onRemove = useCallback(tag => {
		const nextTags = localTags.filter(t => t !== tag);
		setLocalTags(nextTags);
		onChangeTags(nextTags);
	}, [localTags, onChangeTags]);

	const onChange = useCallback(event => {
		setInput(event.target.value);
	}, []);

	const onSubmit = useCallback(event => {
		event.preventDefault();

		insertTag(input.trim()); // 앞뒤 공백 없앤 후 등록
		setInput(''); // input 초기화
	}, [input, insertTag]);

	// tags 값이 바뀔 때
	useEffect(() => {
		setLocalTags(tags);
	}, [tags]);

	return (
		<div>
			<h4>태그</h4>
			<form onSubmit={onSubmit}>
				<input placeholder="태그를 입력하세요" value={input} onChange={onChange} />
				<button type="submit">추가</button>
			</form>
			<TagList tags={localTags} onRemove={onRemove} />
		</div>
	);
};

export default TagBox;
```


-----


# 오해  
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


---------------------------------------------------------------------------------------------------------


# JSX
- 감싸인 요소  
컴포넌트에 여러 요소가 있다면 반드시 부모 요소 하나로 감싸야 합니다.  
리액트는 컴포넌트에서 요소 여러 개를 왜 하나의 요소로 감싸 주어야 할까요? 그것은 Virtual DOM에서 컴포넌트 변화를 감지해 낼 때 효율적으로 비교할 수 있도록 컴포넌트 내부는 하나의 DOM트리 구조로 이루어져야 한다는 규칙이 있기 때문입니다.  


- 자바스크립트 표현
JSX 안에서는 자바스크립트 표현식을 쓸 수 있습니다.  
자바스크립트 표현식을 작성하려면 JSX 내부에서 코드를 `{ }`로 감싸면 됩니다.  


- `if 문 대신 조건부 연산자`  
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


-----


# 컴포넌트
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


-----


# 이벤트 핸들링
1 이벤트 이름은 카멜 표기법으로 작성합니다.  
예를 들어E, HTML의 onclick 은 리액트에서는 onClick 으로 작성해야 합니다.  

2 이벤트에 실행할 자바스크립트 코드를 전달하는 것이 아니라, 함수 형태의 값을 전달합니다.    
```javascript
class EventPractice extends Component {
	state = {
		message: ''
	}
 
	render() {
		return (
			<div>
				<input
					type="text"
					name="message"
					placeholder="입력해 보세요!"
					value={this.state.message}
					onChange={
						(e) => {
							this.setState({message: e.target.value})
						}
					}
				/>
			</div>
		);
	}
}
```
  
3 DOM 요소에만 이벤트를 설정할 수 있습니다.  
div, button, input, form 등의 DOM 요소에는 이벤트를 설정할 수 있지만, 우리가 직접 만든 컴포넌트에는 이벤트를 자체적으로 설정할 수 없습니다.  
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


```javascript
const EventPractice = () => {
	const [username, setUsername] = useState('');
	const [message, setMessage] = useState('');
	const onChangeUsername = e => setUsername(e.target.value);
	const onChangeMessage = e => setMessage(e.target.value);
	const onClick = () => {
		alert(`${username}: ${message}`);
		setUsername('');
		setMessage('');
	};
	const onKeyPress = e => {
		if(e.key === 'Enter') {
			onClick();
		}
	};

	return (
		<div>
			<input
				type="text"
				name="username"
				value={username}
				onChange={onChangeUsername}
			/>
			<input
				type="text"
				name="message"
				value={message}
				onChange={onChangeMessage}
				onKeyPress={onKeyPress}
			/>
			<button onClick={onClick}>확인</button>
		</div>
	);
};

export default EventPractice;
```

input 여러개 있을 경우  
```javascript
const EventPractice = () => {
	const [form, setForm] = useState({
		username: '',
		message: ''
	});
	const { username, message } = form;
	const onChange = e => {
		const nextForm = {
			...form, // 기존의 form 내용을 이 자리에 복사한 뒤
			[e.target.name]: e.target.value // 원하는 값을 덮어 씌우기
		};
		setForm(nextForm);
	};
	const onClick = () => {
		alert(username + ': ' + message);
		setForm({
			username: '',
			message: ''
		});
	};
	const onKeyPress = e => {
		if(e.key === 'Enter') {
			onClick();
		}
	};

	return (
		<div>
			<input
				type="text"
				name="username"
				value={username}
				onChange={onChange}
			/>
			<input
				type="text"
				name="message"
				value={message}
				onChange={onChange}
				onKeyPress={onKeyPress}
			/>
			<button onClick={onClick}>확인</button>
		</div>
	);
};

export default EventPractice;
```


-----


# ref: DOM에 이름 달기
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


-----


# 컴포넌트 반복
- key  
리액트에서 key는 컴포넌트 배열을 렌더링했을 때 어떤 원소에 변동이 있는지 알아내려고 사용합니다.  
예를 들어 유동적인 데이터를 다룰 때는 원소를 새로 생성할 수도, 제거할 수도, 수정할 수도 있죠.  
`key가 없을 때는 Virtual DOM을 비교하는 과정에서 리스트를 순차적으로 비교하면서 변화를 감지`합니다.   
하지만 `key가 있다면 이 값을 사용하여 어떤 변화가 일어났는지 더욱 빠르게 알아낼 수 있습니다.`    
```javascript
import React from 'react';

const InterationSample = () => {
	const names = ['A', 'B', 'C'];
	const nameList = names.map((name, index) => <li key={index}>{name}</li>);
	return <ul>{nameList}</ul>;
};

export default InterationSample;
```


-----


# 컴포넌트 라이프 사이클
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
컴포넌트는 다음과 같은 총 네 가지 경우에 업데이트(리렌더링) 합니다.  
1. props 가 바뀔 때 (자신이 전달받은 props가 변경될 때)  
2. state 가 바뀔 때 (자신의 state가 바뀔 때)  
3. 부모 컴포넌트가 리렌더링될 때  
4. this.forceUpdate 로 강제로 렌더링을 트리거할 때 (forceUpdate 함수가 실행될 때)  

이렇게 컴포넌트를 업데이트할 떄는 다음 메서드를 호출 합니다.   
	- getDericedStateFromPops  
	- shouldComponentUpdate  
	- render  
	- getSnapshotBeforeUpdate  
	- componentDidUpdate  


- 언마운트  
마운트의 반대 과정, 즉 컴포넌트를 DOM에서 제거하는 것을 언마운트(unmount)라고 합니다.  
	- componentWillUnmount


-----


# Hooks
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

`숫자, 문자열, 객체처럼 일반 값을 재사용하려면 useMemo 를 사용하고,`   
`함수를 재사용하려면 useCallback 을 사용하세요.`

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


-----


# 불변성의 중요성
기존의 값을 직접 수정하지 않으면서 새로운 값을 만들어 내는 것을 '불변성을 지킨다'라고 합니다.
```javascript
const array = [1, 2, 3, 4, 5];

const nextArrayBad = array; // 배열을 복사하는 것이 아니라 똑같은 배열을 가리킵니다.
nextArrayBad[0] = 100;
console.log(array === nextArrayBad); // 완전히 똑같은 배열이기 때문에 true

const nextArrayGood = [ ...array ]; // 배열 내부의 값을 모두 복사합니다.
nextArrayGood[0] = 100;
console.log(array === nextArrayGood); // 다른 배열이기 때문에 false

const object = {
	foo: 'bar',
	value: 1
};

const nextObjectBad = object; // 객체가 복사되지 않고, 똑같은 객체를 가리킵니다.
nextObjectBad.value = nextObjectBad.value + 1;
console.log(object === nextObjectBad); // 같은 객체이기 때문에 true

const nextObjectGood = {
	...object, // 기존에 있던 내용을 모두 복사해서 넣습니다.
	value: object.value + 1 // 새로운 값을 덮어 씁니다.
};
console.log(object === nextObjectGood); // 다른 객체이기 때문에 false
```
`불변성이 지켜지지 않으면 객체 내부의 값이 새로워져도 바뀐 것을 감지하지 못합니다.`  

전개 연산자(...문법)를 사용하여 객체나 배열 내부의 값을 복사할 떄는 얕은 복사(shallow copy)를 하게 됩니다.  
즉, 내부의 값이 완전히 새로 복사되는 것이 아니라 가장 바깥쪽에 있는 값만 복사됩니다.  
따라서 `내부의 값이 객체 혹은 배열이라면 내부의 값 또한 따로 복사해주어야 합니다.`  
```javascript
const todos = [
	{ id: 1, checked: true },
	{ id: 2, checked: false },
];
const nextTodos = [ ...todos ];

nextTodos[0].checked = false;
console.log(todos[0] === nextTodos[0]); // 아직까지는 똑같은 객체를 가리키고 있기 때문에 true

nextTodos[0] = {
	...nextTodos[0],
	checked: false
};
console.log(todos[0] === nextTodos[0]); // 새로운 객체를 할당해 주었기에 false
```


-----


# immer 를 사용하여 더 쉽게 불변성 유지하기
객채의 구조가 엄청나게 깊어지면 불변성을 유지하면서 이를 업데이트하는 것이 매우 힘듭니다.  
```javascript
const object = {
	somewhere: {
		deep: {
			inside: 3,
			array: [1, 2, 3, 4],
		},
		bar: 2,
	},
	foo: 1,
};

// somewhere.deep.inside 값을 4로 바꾸기 (불변성을 유지하면서 변경)
let nextObject = {
	...object,
	somewhere: {
		...object.somewhere,
		deep: {
			...object.somewhere.deep,
			inside: 4,
		},
	},
};

// somewhere.deep.array 에 5 추가하기
let nextObject = {
	...object,
	somewhere: {
		...object.somewhere,
		deep: {
			...object.somewhere.deep,
			array: object.somewhere.deep.array.concat(5),
		},
	},
};
```

이러한 상황에 immer 라는 라이브러리를 사용하면, 구조가 복잡한 객체도 매우 쉽고 짧은 코드를 사용하여 불변성을 유지하면서 업데이트해 줄 수 있습니다.  
```bash
$ yarn add immer
```
```javascript
import produce from 'immer';

const nextState = produce(originalState, draft => {
	// 바꾸고 싶은 값 바꾸기
	draft.somewhere.deep.inside = 5;
});
```
> produce 라는 함수는 두 가지 파라미터를 받습니다.  
첫 번째 파라미터는 수정하고 싶은 상태이고,  
두 번째 파라미터는 상태를 어떻게 업데이트할지 정의하는 함수입니다.  
두 번째 파라미터로 전달되는 함수 내부에서 원하는 값을 변경하면, produce 함수가 불변성 유지를 대신해 주면서 새로운 상태를 생성해 줍니다.  

```javascript
import produce from 'immer';

const originalState = [
	{
		id: 1,
		todo: 'test1',
		checked: true,
	},
	{
		id: 2,
		todo: 'test2',
		checked: false,
	},
];

const nextState = produce(originalState, draft => {
	// id 가 2 인 항목의 checked 값을 true 로 설정
	const todo = draft.find(value => value.id === 2); // id 로 항목 찾기
	todo.checked = true;

	// 배열에 새로운 데이터 추가
	draft.push({
		id: 3,
		todo: 'test3',
		checked: false,
	});

	// id === 1 인 항목을 제거하기
	draft.splice(draft.findIndex(t => t.id === 1), 1);
});
```
