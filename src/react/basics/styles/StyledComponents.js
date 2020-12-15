/*
컴포넌트 스타일링의 또 다른 패러다임은 자바스크립트 파일 안에 스타일을 선언하는 방식입니다.
이 방식을 'CSS-in-JS'라고 부르는데요. 이와 관련된 라이브러리는 정말 많습니다.
https://github.com/MicheleBertoli/css-in-js

-
styled-components 를 사용하면 자바스크립트 파일 하나에 스타일까지 작성할 수 있기 때문에
.css 또는 .scss 확장자를 가진 스타일 파일을 따로 만들지 않아도 된다는 큰 이점이 있습니다.

-
styled-components 와 일반 className 를 사용하는 CSS/Sass 를 비교했을 때,
가장 큰 장점은 props 값으로 전달해 주는 값을 쉽게 스타일에 적용할 수 있다는 것입니다.
(VS Code 의 마켓플레이스에서 vscode-styled-components 를 검색하여 설치하면 스타일 색상이 정상적으로 노출)

-
Tagged 템플릿 리터럴 (템플릿 문자열)
Tagged 템플릿 리터럴을 사용하면 템플릿 사이사이에 들어가는 자바스크립트 객체나 함수의 원본 값을 그대로 추출할 수 있습니다.
styled-components 로 만든 컴포넌트의 props 를 스타일 쪽에서 쉽게 조회할 수 있도록 해줍니다.

함수를 작성하고 나서 해당 함수 뒤에 템플릿 리터럴을 넣어 준다면, 템플릿 안에 넣은 값을 온전히 추출할 수 있습니다.
function tagged(...args) { // '...' 펼침연산자
	console.log(args);
}
tagged`hello ${{foo: 'bar'}} ${() => 'world'}!`;
*/
import React from 'react';
import styled, { css } from 'styled-components';

// 반응형웹 styled-components 매뉴얼에서 제공하는 유틸 함수
// size 값에 따라 자동으로 midea 쿼리 함수를 만들어 줍니다.
// 참고 : https://www.styled-components.com/docs/advanced#media-templates
const sizes = {
	desktop: 1024,
	tablet: 768,
};
const media = Object.keys(sizes).reduce((acc, label) => {
	acc[label] = (...args) => css`
		@media (max-width: ${sizes[label] / 16}em) {
			${css(...args)};
		}
	`;
	
	return acc;
}, {});

const Box = styled.div`
	/* props 로 넣어 준 값을 직접 전달해 줄 수 있습니다. */
	background: ${props => props.color || 'blue'};
	padding: 1rem;
	display: flex;

	/*
	기본적으로는 가로 크기 1024px에 가운데 정렬을 하고
	가로 크기가 작어짐에 따라 크기를 줄이고
	768px 미만이 되면 꽉 채웁니다.
	*/
	width: 1024px;
	margin: 0 auto;
	/*@media (max-width: 1024px) {
		width: 768px
	}
	@media (max-width: 768px) {
		width: 100%;
	}*/
	${media.desktop`width: 768px;`}
	${media.tablet`width: 100%;`}
`;

const Button = styled.button`
	background: white;
    color: black;
    border-radius: 4px;
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    font-size: 1rem;
	font-weight: 600;
	
	/* 다음 코드는 inverted 값이 true 일 때 특정 스타일을 부여해 줍니다. */
    ${props => 
        props.inverted && 
        css `
            background: none;
            border: 2px solid white;
            color: white;
            &:hover {
                background: white;
                color: black;
            }
		`
	}
	& + button {
		margin-left: 1rem;
	}
`;

const ButtonWithMartinTop = styled(Button/*기존 styled 컴포넌트에 스타일 추가하여 생성*/)`
	margin-top: 1rem;
`;

const StyledComponent = () => {
	return (
		<Box color="block">
			<Button>안녕하세요.</Button>
			<Button inverted={true}>테두리만</Button>
			<ButtonWithMartinTop inverted={false}>여백추가</ButtonWithMartinTop>
		</Box>
	);
};

export default StyledComponent;