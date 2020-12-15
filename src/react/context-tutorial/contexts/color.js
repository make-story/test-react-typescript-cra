/*
새 Context 만들기 - Context 만 반환할지, Provider 까지 함께 반환할지 선택적

새 Context 를 만들 때는 createContext 함수를 사용합니다. 
파라미터에는 해당 Context의 기본상태를 지정합니다.
(Context 의 value 에는 무조건 상태 값만 있어야 하는 것은 아닙니다. 함수를 전달해 줄 수도 있습니다.)


-
Consumer - Context 안에 들어 있는 상태값을 Consumer 을 통해 조회
Provider - Context 의 value (상태값) 를 변경할 수 있음
*/
import React, { createContext, useState } from 'react';

// Context 생성
//const ColorContext = createContext({ color: 'black' }); // 기본값(상태값)은 Provider 를 사용하지 않았을 때만 사용됩니다. 
const ColorContext = createContext({
	// createContext 의 기본값은 실제 Provider 의 value 에 넣는 객체의 형태와 일치시켜 주는 것이 좋습니다.
	// 그렇게 하면 Context 코드를 볼 때 내부 값이 어떻게 구성되어 있는지 파악하기도 쉽고, 
	// 실수로 Provider 를 사용하지 않았을 때 리액트 애플리케이션에서 에러가 발생하지 않습니다.
	state: { 
		color: 'black', 
		subcolor: 'red' 
	},
	// Context 의 value 에는 무조건 상태 값만 있어야 하는 것은 아닙니다.
	// 함수를 전달해 줄 수도 있습니다. 
	actions: {
		setColor: () => {},
		setSubcolor: () => {}
	}
}); 

// Provider 생성
// Provider 를 사용하면 Context 의 value 를 변경할 수 있습니다.
const ColorProvider = ({ children }) => {
	const [color, setColor] = useState('black');
	const [subcolor, setSubcolor] = useState('red');

	// Provider 의 value 에는 state로, 업데이트 함수는 actions 로 묶어서 전달하고 있습니다.
	// Context 에서 값을 동적으로 사용할 때 반드시 묶어줄 필요는 없지만,
	// 이렇게 state와 actions 객체를 따로따로 분리해 주면 나중에 다른 컴포넌트에서 Context 의 값을 사용할 때 편합니다.
	const value = {
		state: {color, subcolor},
		actions: {setColor, setSubcolor}
	};

	// Provider 를 사용할 때는 value 값을 명시해 주어야 제대로 작동한다는 것을 꼭 기억하세요!
	// Context 의 value 에는 무조건 상태 값만 있어야 하는 것은 아닙니다. 함수를 전달해 줄 수도 있습니다.
	return (
		<ColorContext.Provider value={value}>{children}</ColorContext.Provider>
	);
};

// Consumer
const { Consumer: ColorConsumer } = ColorContext; // const ColorConsumer = ColorContext.Consumer 와 같은 의미

// ColorProvider 와 ColorConsumer 내보내기 
export { ColorProvider, ColorConsumer };

export default ColorContext;