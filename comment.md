
## RIDI 참고 (리덕스를 사용할 때 고려하면 유용한 정보)  
> https://ridicorp.com/story/how-to-use-redux-in-ridi/?utm_source=twitter&utm_medium=velopert&utm_campaign=how-to-use-redux-in-ridi

-------------------------------------------------------------------------------------------------------------------

## Redux Toolkit (TypeScript 지원)  
https://redux-toolkit.js.org/  

- Redux 와 비교
Redux Toolkit을 사용하면 `리듀서, 액션타입, 액션 생성함수, 초기상태를 하나의 함수로 편하게 선언`  
`Typescript 지원`  
`Immer 가 내장`되어있기 때문에, 불변성을 유지하기 위하여 번거로운 코드들을 작성하지 않고 원하는 값을 직접 변경하면 알아서 불변셩 유지되면서 상태가 업데이트  


```javascript 
import { createSlice } from '@reduxjs/toolkit';

// 리듀서와 액션 생성 함수를 한방에 만들 수 있음
const msgboxSlice = createSlice({
	name: 'msgbox',
	initialState: {
		open: false,
		message: '',
	},
	reducers: {
		open(state, action) {
			state.open = true;
			state.message = action.payload
		},
		close(state) {
			state.open = false;
		}
	}
});

export default msgboxSlice;
```

> 리덕스를 사용 할 때, TypeScript를 사용하지 않으면,   
우리가 컴포넌트에서 상태를 조회할때, 그리고 액션생성 함수를 사용 할 때 자동완성이 되지 않으므로 실수하기가 쉽습니다.

```javascript
// Typescript 사용
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type MsgboxState = {
  open: boolean;
	message: string;
}

const initialState: MsgboxState = {
  open: false,
  message: ''
};

const msgboxSlice = createSlice({
  name: 'msgbox',
  initialState,
  reducers: {
    open(state, action: PayloadAction<string>) {
      state.open = true;
      state.message = action.payload;
    },
    close(state) {
      state.open = false;
    }
  }
});

export default msgboxSlice;
```


## react-query
https://github.com/tannerlinsley/react-query
API 요청 관련  

-------------------------------------------------------------------------------------------------------------------

## Presentational & Container 분리는 이제 그만?
Dan Abramov  
https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0

```javascript
export default function ShopProducts() {
	const loading = useSelector(state => state.shop.loading);
	const products = useSelector(state => state.shop.products);
	const dispatch = useDispatch();

	useEffect(() => {
		// products 조회 로직 ...
	}, [dispatch]);
	const onPurchase = (product) => {
		/* 결제 로직 ... */
	};

	return (
		<div>{/* UI ... */}</div>
	);
}
```


-------------------------------------------------------------------------------------------------------------------


## 코드 스플리팅  
- dynamic import  
import 를 상단에서 하지 않고 `import() 함수 형태로 메서드 안에서 사용`하면, 파일을 따로 분리시켜 저장합니다.  
그리고 실제 함수가 필요한 지점에 파일을 불러와서 함수를 사용할 수 있습니다.  
이 함수를 통해 모듈을 불러올 때 모듈에서 default 로 내보낸 것은 result.default 를 참조해야 사용할 수 있습니다.  
```javascript
// notify.js
export default function notify() {
	alert('안녕!');
};
```
```javascript
// App.js
import React from 'react';

function App() {
	const onClick = () => {
		import('./notify')
		.then(result => result.default());
	};
	return (
		<>
			<button onClick={onClick}>Dynamin Import!</button>
		</>
	);
}

export default App;
```


- React.lazy 와 Suspense 사용  
React.lazy 는 컴포넌트를 렌더링하는 시점에서 비동기적으로 로딩할 수 있게 해 주는 유틸 함수 입니다.
```javascript 
const SplitMe = React.lazy(() => import('./SplitMe'));
```

Suspense 는 리액트 내장 컴포넌트로서 코드 스플리팅된 컴포넌트를 로딩하도록 발동시킬 수 있고, 로딩이 끝나지 않았을 때 보여 줄 UI를 설정할 수 있습니다.   
```javascript 
import React, { Suspense } from 'react';

function App() {
	const SplitMe = React.lazy(() => import('./SplitMe'));
	return (
		<Suspense fallback={<div>loading...</div>}>
			<SplitMe />
		</Suspense>
	);
}

export default App;
```


- Loadable Components 를 통한 코드 스플리팅  
Loadable Components 는 `코드 스플리팅을 편하게 하도록 도와주는 서드파티 라이브러리` 입니다.  
이 라이브러리의 이점은 서버 사이트 렌더링을 지원한다는 것입니다. 또한, 렌더링하기 전에 필요할 때 스플리팅된 파일을 미리 불러올 수 있는 기능도 있습니다.  
```javascript 
import React from 'react';
import loadable from '@loadable/component';

const SplitMe = loadable(() => import('./SplitMe'), {
	fallback: <div>loading...</div>
});

// 컴포넌트 미리 불러오기(preload)
//SplitMe.preload();

function App() {
	return (
		<SplitMe />
	);
}
```

-------------------------------------------------------------------------------------------------------------------

# React에서 Stateful 대 Stateless 함수형 컴포넌트
## Props와 State
- props  
```javascript
const Counter = (props) => {
	// props : 부모 컴포넌트로 부터 전달되는 값 (읽기전용)
};
```
```javascript
// typescript  
import React from "react";

type TitleProps = {
	color?: string;
};
const Title: React.FC<TitleProps> = props => {
  	const { color, children } = props; 
	return <h1 style={{ color }}>{children}</h1>;
};

export default Title;
```
```javascript
// typescript
import React, { FC } from "react";

type GreetingProps = {
	name: string;
}

const Greeting:FC<GreetingProps> = ({ name }) => {
	return <h1>Hello {name}</h1>
};

export default Greeting;
```
```javascript
// typescript - FC를 사용하지 않는 방법
import React from "react";

type GreetingProps = {
	name: string;
};

function Greeting(props: GreetingProps) {
  return <p>Hi {props.name}</p>
}

export default Greeting;
```


- state  
```javascript  
class App extends Component {
	constructor(props) {
		// 클래스 component는 props와 함께 기본 생성자를 호출해야 합니다.
		super(props);
		
		// 클래스 컴포넌트를 선택하는 주된 이유는 state를 넣을 수 있다는 것
		this.state = { count: 1 };
	}

	handleCount(value) {
		// React 컴포넌트에는 state를 업데이트하기 위해  setState라는 메서드가 있습니다.
		this.setState({count: this.state.count+ value});
	}
	
	render() {
		return <div></div>;
	}
}
```
```javascript
// typescript 
interface CounterProps {
	name: string
}

interface CounterState {
	count: number
}

class Counter extends React.Component<CounterProps, CounterState> {
	constructor(props: CounterProps) {
		super(props)
		this.state = {
			count: 0,
		}
	}

	componentDidMount() {
		setInterval(this.increase, 1000)
	}

	increase = () => {
		const { count } = this.state
		this.setState({ count: count + 1 })
	}

	render() {
		const { name } = this.props
		const { count } = this.state

		return (
			<React.Fragment>
				<h1>{name} counter</h1>
				<div>count value: {count}</div>
			</React.Fragment>
		);
	}
}
```


- Stateful 컴포넌트  
Stateful 컴포넌트는 늘 클래스 컴포넌트입니다.  
(stateful 컴포넌트에는 생성자에서 초기화되는 state가 있습니다.)  

- Stateless 컴포넌트  
Stateless 컴포넌트를 만드는 데 함수형이나 클래스를 사용하면 됩니다.  

-------------------------------------------------------------------------------------------------------------------

# PureComponent란?
`React.PureComponent`  
동일한 props와 state라는 전제 하에 동일한 결과 값이 확실히 반환된다면 컴포넌트를 순수하다고(pure) 말합니다.  
```javascript 
const HelloWorld = ({name}) => (
	<div>{`Hi ${name}`}</div>
);
```
클래스 컴포넌트도 props와 state가 변하지 않는 한 순수(pure)할 수 있습니다.  
React.PureComponent는 성능을 최적화하는 데 활용됩니다.   
(성능상의 이슈에 맞닥뜨리지 않는 한 이 컴포넌트를 사용해야 하는지 고려해 볼 이유는 없습니다.)