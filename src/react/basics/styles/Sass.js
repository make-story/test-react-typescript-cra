/*
Sass : 자주 사용되는 CSS 전처리기(pre-processor) 중 하나로 확장된 CSS 문법을 사용하여 CSS 코드를 더욱 쉽게 작성할 수 있도록 해 줍니다.
styled-components : 스타일을 자바스크립트 파일에 내장시키는 방식으로 스타일을 작성함과 동시에 해당 스타일이 적용된 컴포넌트를 만들 수 있게 해 줍니다.

Sass 는 CSS 전처리기로 복잡한 작업을 쉽게 할 수 있도록 해주고, 
스타일 코드의 재활용성을 높여 줄 뿐만 아니라 코드의 가독성을 높여서 유지 보수를 더욱 쉽게 해 줍니다.
*/
import React from 'react';
import './Sass.scss';

const SassComponent = () => {
	return (
		<div className="SassComponent">
			<div className="box red"></div>
			<div className="box orange"></div>
			<div className="box yellow"></div>
			<div className="box green"></div>
			<div className="box blue"></div>
			<div className="box indigo"></div>
			<div className="box violet"></div>
		</div>
	);
};

export default SassComponent;