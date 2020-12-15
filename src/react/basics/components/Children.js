/*
태그 사이의 내용을 보여 주는 children
리액트 컴포넌트를 사용할 때 컴포넌트 태그 사이의 내용을 보여 주는 props가 있는데요. 바로 children 입니다.
*/
import React from 'react';

const Children = props => {
	return (
		<div>제 이름은 {props.children} 입니다.</div>
	);
};

/*
> 이 컴포넌트를 사용하는 컴포넌트에서 태그사이에 값을 명시
import React from ‘react’;
import Children from ‘./Children;

const App = () => {
   return <Children>유성민</Children>
};

export default App;
*/

export default Children;