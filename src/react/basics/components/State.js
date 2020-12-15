/*
리액트에서 state는 컴포넌트 내부에서 바뀔 수 있는 값을 의미합니다.
props 는 컴포넌트가 사용되는 과정에서 부모 컴포넌트가 설정하는 값이며, 
컴포넌트 자신은 해당 props 를 읽기 전용으로만 사용할 수 있습니다. 
props 를 바꾸려면 부모 컴포넌트에서 부꾸어 주어야 합니다.

리액트에서는 두 가지 종류의 state 가 있습니다.
하나는 클래스형 컴포넌트가 지니고 있는 state이고,
다른 하나는 함수형 컴포넌트에서 useState 라는 함수를 통해 사용하는 state 입니다.

-
props 와 state 는 둘 다 컴포넌트에서 사용거나 렌더링할 데이터를 담고 있으므로 비슷해 보일 수 있지만, 그 역할은 매우 다릅니다.
props 는 부모 컴포넌트가 설정하고, state 는 컴포넌트 자체적으로 지닌 값으로 컴포넌트 내부에서 값을 업데이트할 수 있습니다.

props 를 사용한다고 해서 값이 무조건 고정적이지는 않습니다.
부모 컴포넌트의 state 를 자식 컴포넌트의 props 로 전달하고, 
자식 컴포넌트에서 특정 이벤트가 발생했을 때 부모 컴포넌트의 메서드를 호출하면 props 도 유동적으로 사용할 수 있습니다.

부모컴포넌트 (state) -> 컴포넌트 (props / state)
*/
import React, { Component } from 'react';

/*
> 클래스형 컴포넌트의 state - this.setState() - 이 함수가 state 값을 바꿀 수 있게 해 줍니다.
*/
/*class Counter extends Component {
	// 컴포넌트의 생성자 메서드
	constructor(props) {
		// 클래스형 컴포넌트에서 constructor 를 작성할 때는 반드시 super(props)를 호출해 주어야 합니다.
		// 이 함수가 호출되면 현재 클래스형 컴포넌트가 상속하고 있는 리액트의 Component 클래스가 지닌 생성자 함수를 호출해 줍니다.
		super(props);

		// state 의 초기값 설정하기
		this.state = { 
			number: 0,
			fixedNumber: 0
		};
	}
	
	render() {
		const { number } = this.state; // state 를 조회할 때는 this.state로 조회합니다.
		return (
			<div>
				<h1>{number}</h1>
				<h2>setState 로 바꾸지 않을 값: {fixedNumber}</h2>
				<button onClick={()=>{
					// this.setState 를 사용하여 state에 새로운 값을 넣을 수 있습니다.
					// this.setState 함수는 인자로 전달된 객체 안에 들어 있는 값만 바꾸어 줍니다.
					this.setState({number: number+1});
				}}>+1</button>
			</div>
		);
	}
}*/

/*
> state를 constructor 에서 꺼내기
state의 초기값을 지정하기 위해 constructor 메서드를 선언해 주었으나, 
또 다른 방식으로 state 의 초기값을 지정해 줄 수 있습니다.
*/
class Counter extends Component {
	// state 의 초기값 지정
	// constructor 메서드를 선언하지 않고도 state 초기값을 설정할 수 있습니다.
	state = {
		number: 0,
		fixedNumber: 0,
	};

	render() {
		const { number, fixedNumber } = this.state; // state 를 조회할 때는 this.state 로 조회합니다.
		return (
			<div>
				현재 number / fixedNumber 값 : {number} / {fixedNumber}
				<button onClick={()=> {
					// this.setState 에 객체 대신 함수 인자 전달하기
					/*
					this.setState 를 두 번 호출하면 어떻게 될까요?
					this.setState({ number: number + 1 });
					this.setState({ number: this.state.number + 1 });
					코드를 위와 같이 작성하면 this.setState 를 두 번 사용하는 것임에도 불구하고 버튼을 클릭힐 때 숫자가 1씩 더해집니다.
					
					this.setState 를 사용한다고 해서 state 값이 바로 바뀌지 않기 때문입니다.
					이에 대한 해결책은 this.setState 를 사용할 때 '객체 대신에 함수를 인자로 넣어 주는 것'입니다.
					만약 업데이트하는 과정에서 props 가 필요하지 않다면 생략해도 됩니다.
					*/
					this.setState((prevState, props) => {
						// prevState 는 기존 상태이고, props 는 현재 지니고 있는 props를 가리킵니다.
						return {
							number: prevState + 1
						};
					});
					// 위 코드와 아해 코드는 완전히 똑같은 기능을 합니다.
					// 아래 코드는 함수에서 바로 객체를 반환한다는 의미입니다.
					this.setState(prevState => ({
						number: prevState.number + 1
					}));
				}}>+1 (this.setState 에 객체 대신 함수 인자 전달하기)</button>
				
				<button onClick={() => {
					// this.setState 가 끝난 후 특정 작업 실행하기 
					this.setState(
						{ number: this.state.number + 1 }, 
						()=>{console.log('콜백!');}
					);
				}}>+1 (this.setState 가 끝난 후 특정 작업 실행하기)</button>
			</div>
		);
	}
 }

export default Counter;