/*
클래스형 컴포넌트

컴포넌트를 선언하는 방식은 두 가지 입니다.
하나는 함수형 컴포넌트이고, 또 다른 하나는 클래형 컴포넌트 입니다.

클래스형 컴포넌트와 함수형 컴포넌트의 차이점은 
클래스형 컴포넌트의 경우 state 기능 및 라이프사이클 기능을 사용할 수 있다는 것과 임의 메서드를 사용할 수 있다는 것입니다.

클래스형 컴포넌트에서는 render 함수가 꼭 있어야 하고, 그 안에서 보여 주어야 할 JSX를 반환해야 합니다.

컴포넌트를 선언할 수 있는 두 가지 방법 중 어느 상황에 함수형 컴포넌트를 사용해야 할까요?
함수형 컴포넌트의 장점을 나열해 보면 다음과 같습니다.
우선 클래스형 컴포넌트보다 선언하기가 휠씬 편합니다. 메모리 자원도 클래스형 컴포넌트보다 덜 사용합니다. 또한, 프로젝트를 완성하여 빌드한 후 배포할 때도 함수형 컴포넌트를 사용하는 것이 결과물의 파일 크기가 더 작습니다.
(사실 성능과 파일 크기 면에서 사실상 별 차이가 없으므로 이 부분은 중요하게 여기지 않아도 됩니다)

함수현 컴포넌트의 주요 단점은 state와 라이프사이클 API의 사용이 불가능하다는 점인데요.
이 단점은 리액트 v16.8 업데이트 이후 Hooks 라는 기능이 도입되면서 해결되었습니다.

리액트 공식 매뉴얼에서는 컴포넌트를 새로 작성할 때 함수형 컴포넌트와 Hooks 를 사용하도록 권장하고 있습니다.
하지만 그렇다고 해서 클래스형 컴포넌트가 사라지는 것은 아니므로 클래스형 컴포넌트의 기능은 꼭 알아 두어야 합니다.
*/
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// 함수형
/*function App() {
   const name = '유성민';
   return <div className="react">{name}</div>;
}*/

// 클래스형 
class ClassTest extends Component {
	/*
	> 클래스형 컴포넌트에서 props 사용하기
	클래스형 컴포넌트에서 props 를 사용할 떄는 render 함수에서 this.props 를 조회하면 됩니다.
	*/
	static defaultProps = {
		name: '기본 이름'
	};	
	static propTypes = {
		// 콤포넌트의 필수 props 를 지정하거나 props 의 타입(type) 을 지정할 때는 propType를 사용합니다.
		name: PropTypes.string,
		favoriteNumber: PropTypes.number.isRequired
	};

	render() {
		//const name = '유성민';
		const {name, favoriteNumber, children} = this.props; // 비구조화 할당 방식 
	return <div className="react">{name} / {favoriteNumber}</div>;
	}
}

// props 관련 설정 
/*ClassTest.defaultProps = {
	name: '기본 이름',
};
ClassTest.propTypes = {
	name: PropTypes.string,
	favoriteNumber: PropTypes.number.isRequired, // isRequired 를 사용하여 필수 prop 로 지정
}*/

export default ClassTest;