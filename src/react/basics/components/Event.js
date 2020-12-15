import React, { Component, useState } from 'react';

/*
> 리액트의 이벤트를 사용할 때 주의 사항

1 이벤트 이름은 카멜 표기법으로 작성합니다.
예를 들어E, HTML의 onclick 은 리액트에서는 onClick 으로 작성해야 합니다.

2 이벤트에 실행할 자바스크립트 코드를 전달하는 것이 아니라, 함수 형태의 값을 전달합니다.
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

3 DOM 요소에만 이벤트를 설정할 수 있습니다.
div, button, input, form 등의 DOM 요소에는 이벤트를 설정할 수 있지만, 우리가 직접 만든 컴포넌트에는 이벤트를 자체적으로 설정할 수 없습니다.
하지만, 전달받은 props 를 컴포넌트 내부의 DOM 이벤트로 설정할 수는 있습니다.
<div onClick={this.props.onClick}>
   // ...
</div>
*/


/*
> Property Initializer Syntax 를 사용한 메서드 작성
바벨의 transform-class-properties 문법을 사용하여 화살표 함수 형태로 메서드를 정의

class EventPractice extends Component {
	state = {
		message: ''
	}

	handleChange = (e) => {
		this.setState({ message: e.target.value });
	}

	handleClick = () => {
		alert(this.state.message);
		this.setState({ message: '' });
	}

	render() {
		renturn (
			<div>
				<input
					type="text"
					name="message"
					value={this.state.message}
					onChange={this.handleChange}
				/>
				<button onClick={this.handleClick}>확인</button>
			</div>
      )
   }
}
*/


/*
> input 여러 개 다루기
event 객체를 활용, e.target.name 값을 사용하여 해당 input 의 name 을 알 수 있습니다.

class EventPractice extends Component {
	state = {
		username: '',
		message: ''
	}

	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	handleClick = () => {
		alert(this.state.username + ': ' + this.state.message);
		this.setState({
			username: '',
			message: ''
		});
	}

	render() {
		return (
			<div>
				<input
					type="text"
					name="username"
					value={this.state.username}
					onChange={this.handleChange}
				/>
				<input
					type="text"
					name="message"
					value={this.state.message}
					onChange={this.handleChange}
				/>
				<button onClick={this.handleClick}>확인</button>
			</div>
		);
	}
}
*/


/*
> 함수형 컴포넌트로 구현해 보기
*/
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