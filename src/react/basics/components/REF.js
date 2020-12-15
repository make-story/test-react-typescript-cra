/*
ref(reference 의 줄임말)

HTML 에서 id 속성을 사용하여 DOM에 이름(유일한이름)을 다는 것처럼 리액트 프로젝트 내부에서 DOM에 이름을 다는 방법이 있습니다.
바로  ref (reference 의 줄임말) 개념 입니다.

> 리액트 컴포넌트 안에서는 id를 사용하면 안 되나요?
JSX 안에서 DOM에 id 를 달면 해당 DOM을 렌더링할 때 그대로 전달됩니다.
하지만 특수한 경우가 아니면 사용을 권장하지 않습니다.
예를 들어 같은 컴포넌트를 여러 번 사용한다고 가정해 보세요. HTML 에서 DOM의 id는 유일(unique)해야 하는데, 이런 상황에서는 중복 id를 가진 DOM이 여러 개 생기니 잘못된 사용입니다.
ref 는 전역적으로 작동하지 않고 컴포넌트 내부에서만 작동하기 때문에 이런 문제가 생기지 않습니다.


> ref 는 어떤 상황에서 사용해야 할까?
‘DOM 을 꼭 직접적으로 건드려야 할 때’
 - 특정 input에 포커스 주기
 - 스크롤 박스 조작하기
 - Canvas 요소에 그림 그리기 등


> 콜백 함수를 통한 ref 설정
ref를 만드는 가장 기본적인 방법은 콜백 함수를 사용하는 것입니다.
ref를 달고자 하는 요소에 ref라는 콜백 함수를 props 로 전달해 주면 됩니다. 이 콜백 함수는 ref 값을 파라미터로 전달받습니다.
그리고 함수 내부에서 파라미터로 받은 ref를 컴포넌트의 멤버 변수로 설정해 줍니다.

<input ref={(ref) => {this.input=ref}} />

이렇게 하면 앞으로 this.input 은 input 요소의 DOM을 가리킵니다.
ref의 이름은 원하는 것으로 자유롭게 지정할 수 있습니다.


> createRef 를 통한 ref 설정
ref 를 만드는 또 다른 방법은 리액트에 내장되어 있는 createRef 라는 함수를 사용하는 것입니다.
이 함수를 사용해서 만들면 더 적은 코드로 쉽게 사용할 수 있습니다. 
이 기능은 리액트 v16.3 부터 도입되었으며 이전 버전에서는 작동하지 않습니다.
*/
import React, { Component } from 'react';

class RefSample extends Component {
	// ref 를 설정해 준 DOM에 접근하려면 this.input.current 를 조회하면 됩니다.
	// 콜백 함수를 사용할 때와 다른 점은 이렇게 뒷부분에 .current 를 넣어 주어야 한다는 것입니다.
	input = React.createRef();
 
	handleFocus = () => {
		this.input.current.focus();
	}
 
	render() {
		return (
			<div>
				<input ref={this.input} />
			</div>
		)
	}
}


/*
> 컴포넌트에 ref 달기
리액트에서는 컴포넌트에도 ref를 달 수 있습니다.
이 방법은 주로 컴포넌트 내부에 있는 DOM을 컴포넌트 외부에서 사용할 때 씁니다.
컴포넌트에 ref를 다는 방법은 DOM 에 ref 를 다는 방법과 똑같습니다.

<MyComponent
   ref={(ref) => {this.myComponent=ref}}
/>

이렇게 하면 MyComponent 내부의 메서드 및 멤버 변수에도 접근할 수 있습니다.
즉, 내부의 ref 에도 접근할 수 있습니다.
*/

export default RefSample;