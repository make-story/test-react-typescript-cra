/*
props 는 properties 를 줄인 표현으로 컴포넌트 속성을 설정할 때 사용하는 요소입니다.
props 값은 해당 컴포넌트를 불러와 사용하는 부모 컴포넌트에서 설정할 수 있습니다.
*/
import React from 'react';
import PropTypes from 'prop-types';

const Props = props => {
	return <div>제 이름은 {props.name} 입니다.</div>;
};

/*
> props 기본값 설정: defaultProps (name="" 속성 자체가 설정되지 않았을 경우)
*/
Props.defaultProps = {
	name: 'ysm'
};

/*
> proTypes 를 통한 props 검증
컴포넌트의 필수 props 를 지정하거나 props 의 타입(type)을 지정할 때는 propTypes 를 사용합니다.
컴포넌트의 propTypes 를 지정하는 방법은 defaultProp 을 설정하는 것과 비슷합니다.
*/
Props.propTypes = {
	name: PropTypes.string
};

/*
> isRequired 를 사용하여 필수 propTypes 설정
propTypes 를 지정하지 않았을 때 경고 메시지를 띄워 주는 것은 propTypes 를 지정할 때 뒤에 isRequired 를 붙여주면 됩니다.
*/
Props.propTypes = {
	name: PropTypes.string,
	favoriteNumber: PropTypes.number.isRequired
};

export default Props;