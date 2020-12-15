/*
Consumer 사용하기

ColorBox 라는 컴포넌트를 만들어서 ColorContext (/contexts/color.js) 안에 들어 있는 색상을 보여주겠습니다.
이때 색상을 props 로 받아오는 것이 아니라 
ColorContext 안에 들어 있는 Consumer 라는 컴포넌트를 통해 색상을 조회할 것입니다.


-
useContext Hook 사용하기 - Consumer 대신 Hook (함수형) 또는 static contextType (클래스형) 사용하기 (Consumer 대신 다른 방식을 사용하여 값을 받아오는 방법)
useContext 라는 Hook을 사용하면, 함수형 컴포넌트에서 Context 를 아주 편하게 사용할 수 있습니다.
만약 children 에 함수를 전달하는 Render Props 패턴이 불편하다면, useContext Hook 을 사용하여 훨씬 편하게 Context 값을 조회할 수 있습니다.
그러나 Hook 은 함수형 컴포넌트에서만 사용할 수 있다는 점에 주의하세요. 클래스형 컴포넌트에서는 Hook 을 사용할 수 없습니다.(2019년 8월 기준)


-
static contextType 사용하기 - 클래스형 컴포넌트 - 예: SelectColors.js
클래스형 컴포넌트에서 Context 를 좀 더 쉽게 사용하고 싶다면 static contextType 을 정의하는 방법이 있습니다.
*/
import React, { useContext } from 'react';
import ColorContext, { ColorConsumer } from '../contexts/color';

const ColorBox = () => {
	// 1. Consumer 사용하기
	/*
	Consumer 사이에 중괄호를 열어서 그 안에 함수를 넣어 주었습니다.
	이러한 패턴을 Function as a child, 혹은 Render Props 라고 합니다.
	컴포넌트의 children 이 있어야 할 자리에 일반 JSX혹은 문자열이 아닌 함수를 전달하는 것이죠.
	*/
	/*return (
		<ColorContext.Consumer>
			{value => (
				<div
					style={{
						width: '64px',
						height: '64px',
						background: value.color
					}}
				/>
			)}
		</ColorContext.Consumer>
	);*/

	// 2. Context 내부 Consumer 함께 구현된 것 불러오기
	/*return (
		<ColorConsumer>
			{value => (
				<>
					<div
						style={{
							width: '64px',
							height: '64px',
							background: value.state.color
						}}
					/>
					<div
						style={{
							width: '32px',
							height: '32px',
							background: value.state.subcolor
						}}
					/>
				</>
			)}
		</ColorConsumer>
	);*/

	// 3. useContext Hook 사용하기
	// 리액트에 내장되어 있는 Hooks 중에서 useContext 라는 Hook 을 사용하면, 함수형 컴포넌트에서 Context를 아주 편하게 사용할 수 있습니다.
	const { state } = useContext(ColorContext);
	return (
		<>
			<div
				style={{
					width: '64px',
					height: '64px',
					background: state.color
				}}
			/>
			<div
				style={{
					width: '32px',
					height: '32px',
					background: state.subcolor
				}}
			/>
		</>
	);
};

export default ColorBox;