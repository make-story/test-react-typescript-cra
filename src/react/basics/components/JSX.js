/*
JSX는 자바스크립트의 확장 문법이며 XML과 매우 비슷하게 생겼습니다.
이런 형식으로 작성한 코드는 브라우저에서 실행되기 전에 코드가 번들링되는 과정에서 바벨을 사용하여 일반 자바스크립트 형태의 코드로 변환됩니다.
*/

import React from 'react';

const JSX = () => {
	/*
	> 요소는 하나의 부모로 감싸져 있어야 한다.
	리액트 컴포넌트에서 요소 여러 개를 왜 하나의 요소로 꼭 감싸 주어야 할까요?
	그것은 Virtual DOM에서 컴포넌트 변화를 감지해 낼 때 효율적으로 비교할 수 있도록 컴포넌트 내부는 하나의 DOM트리 구조로 이루어져야 한다는 규칙이 있기 때문입니다.
	*/
	/*return (
		<div>
		   <h1>test1</h1>
		   <h2>test2</h2>
		</div>
	);*/


	/*
	> 꼭 div 요소를 사용하고 싶지 않을 수도 있습니다.
	그런 경우에는 리액트 v16이상 부터 도입된 Fragment 라는 기능을 사용하면 됩니다.
	<Fragment></Fragment> 또는 <></>
	*/
	/*return (
		<Fragment>
		   <h1>test1</h1>
		   <h2>test2</h2>
		</Fragment>
	);*/


	/*
	> jsx 안에는 자바스크립트 표현식을 쓸 수 있습니다.
	자바스크립트 표현식을 작성하려면 JSX내부에서 코드를 { } 로 감싸면 됩니다.
	*/
	/*const name1 = ‘유성민’;
	return (
		<>
			<h1>{name1}</h1>
		</>
	);*/


	/*
	> JSX 내부의 자바스크립트 표현식에서 if 문을 사용할 수는 없습니다.
	하지만 조건에 따라 다른 내용을 렌더링해야 할 때는 JSX 밖에서 if문을 사용하여 사전에 값을 설정하거나,
	{ } 안에 조건부 연산자를 사용하면 됩니다.
	*/
	/*const name2 = 'ysm';
	return <div>{name2 === ‘ysm’ ? <h1>유성민</h1> : null}</div>;*/


	/*
	> 인라인 스타일링
	*/
	/*const style = {
		backgrountColor: 'black',
		color: 'aqua',
	};
	return <div style={style}>ysm</div>;*/


	/*
	> class 대신 className
	일반 HTML에서 CSS 클래스를 사용할 때는 <div class=“myclass”></div>와 같이 class 라는 속성을 설정합니다.
	하지만 JSX에서는 class 가 아닌 className 으로 설정해 주어야 합니다.

	이전에는 class 로 CSS 클래스를 설정할 때 오류가 발생하고 CSS 클래스가 적용되지 않았는데, 
	리액트 v16 이상부터는 class 를 className 으로 변환시켜 주고 경고를 띄웁니다.
	*/
	//return <div className="test">ysm</div>;

	
	/*
	> 꼭 닫아야 하는 태그
	JSX 에서는 <br> 처럼 태그를 닫지 않으면 오류가 발생합니다.
	태그 사이에 별도의 내용이 들어가지 않는 경우에는 self-closing 태그로 선언하면서 동시에 닫을 수 있습니다.
	*/
	return (
		<>
			<div>ysm</div>
			<br />
		</>
	);
};

export default JSX;