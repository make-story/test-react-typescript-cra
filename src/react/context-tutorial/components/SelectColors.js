/*
색상 선택 컴포넌트 만들기
Context 의 actions 에 넣어 준 함수(contexts/color.js)를 호출하는 컴포넌트를 만들어 보겠습니다.
*/
import React, { useContext } from 'react';
import ColorContext, { ColorConsumer } from '../contexts/color';

const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];

// Consumer
const SelectColors = () => {
	return (
		<div>
			<h2>색상을 선택하세요.</h2>
			<ColorConsumer>
				{(value) => (
					<div style={{display: 'flex'}}>
						{colors.map(color => (
							<div
								key={color}
								style={{
									background: color,
									width: '24px',
									height: '24px',
									cursor: 'pointer'
								}}
								onClick={() => value.actions.setColor(color)}
								onContextMenu={e => {
									// 마우스 오른쪽 버튼 클릭 이벤트는 onContextMenu 를 사용하면 됩니다.
									e.preventDefault(); // 마우스 오른쪽 버튼 클릭 시 메뉴가 뜨는 것을 무시함
									value.actions.setSubcolor(color);
								}}
							/>
						))}
					</div>
				)}
			</ColorConsumer>
			<hr />
		</div>
	);
};

// static contextType 사용하기 - 클래스형 컴포넌트 
/*class SelectColors extends Comment {
	static contextType = ColorContext;

	handleSetColor = color => {
		// this.context 를 조회했을 때 현재 Context 의 value 를 가리키게 됩니다.
		this.context.actions.setColor(color);
	}

	render() {
		<div>
            <h2>색상을 선택하세요.</h2>
            <div style={{ display: 'flex' }}>
				{colors.map(color => (
					<div
						key={color}
						style={{
							background: color,
							width: '24px',
							height: '24px',
							cursor: 'pointer'
						}}
						onClick={() => this.handleSetColor(color)}
						onContextMenu={e => {
							e.preventDefault();
							this.handleSetColor(color);
						}}
					/>
				))}
			</div>
            <hr />
        </div>
	}
}*/

export default SelectColors;