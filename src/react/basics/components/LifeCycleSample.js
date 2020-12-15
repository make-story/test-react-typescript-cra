import React, { Component } from 'react';

/*
컴포넌트의 라이프사이클 - 라이프사이클 메서드 - 클래스형 컴포넌트에서만 사용(함수형은 Hooks 기능을 사용하여 비슷한 작업)

모든 리액트 컴포넌트에는 라이프사이클(수명 주기)이 존재합니다. 
컴포넌트의 수명은 페이지에 렌더링되기 전인 준비 과정에서 시작하여 페이지에서 사라질 때 끝납니다.

리액트 프로젝트를 진행하다 보면 가끔 컴포넌트를 처음으로 렌더링할 때 어떤 작업을 처리해야 하거나 컴포넌트를 업데이트하기 전후로 어떤 작업을 처리해야 할 수도 있고, 또 불필요한 업데이트를 방지 할 수도 있습니다.

이때는 컴포넌트의 라이프사이클 메서드를 사용합니다. 참고로 라이프사이클 메서드는 클래스형 컴포넌트에서만 사용할 수 있습니다.
함수형 컴포넌트에서는 사용할 수 없는데요. 그 대신에 Hooks 기능을 사용하여 비슷한 작업을 처리할 수 있습니다.

> 라이프사이클 메서드의 이해
라이프사이클 메서드의 종류는 총 아홉 가지 입니다.
Will 접두사가 붙은 메서드는 어떤 작업을 작동하기 전에 실행되는 메서드이고,
Did 접두사가 붙은 메서드는 어떤 작업을 작동한 후에 실행되는 메서드 입니다.

이 메서드들은 우리가 컴포넌트 클래스에서 덮어 써 선언함으로써 사용할 수 있습니다.

라이프사이클은 총 세가지, 즉 마운트, 업데이트, 언마운트 카테고리로 나눕니다.

> 마운트
DOM이 생성되고 웹 브라우저상에 나타나는 것을 마운트(mount)라고 합니다.

마운트 할 때 호출하는 메서드
- constructor : 
컴포넌트를 새로 만들 때마다 호출되는 클래스 생성자 메서드 입니다.

- getDerivedStateFromProps : 
props 에 있는 값을 state 에 넣을 때 사용하는 메서드 입니다.

- render : 
우리가 준비한 UI를 렌더링하는 메서드 입니다.

- componentDidMount : 
컴포넌트가 웹 브라우저상에 나타난 후 호출하는 메서드 입니다.


> 업데이트
컴포넌트는 다음과 같은 총 네 가지 경우에 업데이트 합니다.
props 가 바뀔 때
state 가 바뀔 때
부모 컴포넌트가 리렌더링 될 때
this.forceUpdate 로 강제로 렝더링을 트리거할 때

업데이트 할 때 호출하는 메서드
- getDerivedStateFormProps : 
이 메서드는 마운트 과정에서 호출되며, 업데이트가 시작하기 전에도 호출됩니다.
props 의 변화에 따라 state 갑에도 변화를 주고 싶을 때 사용합니다.

- shouldComponentUpdate : 
컴포넌트가 리렌더링을 해야 할지 말아야 할지를 결정하는 메서드 입니다.
이 메서드는 true 혹은 false 값을 반환하며, true를 반환하면 다음 라이프사이클을 계속 실행하고, false를 반환하면 작업을 중지 합니다. (즉, 컴포넌트가 리렌더링 되지 않습니다.)

- render :
컴포넌트를 리렌더링 합니다.

- getSnapshotBeforeUpdate : 
컴포넌트 변화를 DOM에 반영하기 바로 직전에 호출하는 메서드 입니다.

- componentDidUpdate : 
컴포넌트의 업데이트 작업이 끝난 후 호출하는 메서드 입니다.


> 언마운트
마운트의 반대 과정, 즉 컴포넌트를 DOM에서 제거하는 것을 언마운트(unmount)라고 합니다.

언마운트할 때 호출하는 메서드
- compontWillUnmount : 
컴포넌트가 웹 브라우저상에서 사라지기 전에 호출하는 메서드 입니다.

*/

class LifeCycleSample extends Component {
	state = {
		number: 0,
		color: null
	}

	myRef = null; // ref 를 설정할 부분

	constructor(props) {
		super(props);
		console.log('constructor');
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		console.log('getDerivedStateFromProps');
		if(nextProps.color !== prevState.color) {
			return { color: nextProps.color };
		}
		return null;
	}

	componentDidMount() {
		console.log('componentDidMount');
	}

	shouldComponentUpdate(nextProps, nextState) {
		console.log('shouldComponentUpdate', nextProps, nextState);
		// 숫자의 마지막 자리가 4면 리렌더링하지 않습니다.
		return nextState.number % 10 !== 4;
	}

	componentWillUnmount() {
		console.log('componentWillUnmount');
	}

	handleClick = () => {
		this.setState({
			number: this.state.number + 1
		});
	}

	getSnapshotBeforeUpdate(prevProps, prevState) {
		console.log('getSnapshotBeforeUpdate');
		if(prevProps.color !== this.props.color) {
			return this.myRef.style.color;
		}
		return null;
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		console.log('componentDidUpdate', prevProps, prevState);
		if(snapshot) {
			console.log('업데이트되기 직전 색상: ', snapshot);
		}
	}

	render() {
		console.log('render');

		const style = {
			color: this.props.color
		};

		return (
			<div>
				<h1 style={style} ref={ref => this.myRef=ref}>
					{this.state.number}
				</h1>
				<p>color: {this.state.color}</p>
				<button onClick={this.handleClick}>더하기</button>
			</div>
		)
	}
}

export default LifeCycleSample;