/*
> 자바스크립트 배열의 map() 함수
자바스크립트 배열 객체의 내장 함수인 map 함수를 사용하여 반복되는 컴포넌트를 렌더링할 수 있습니다.
arr.map(callback, [thisArg])

const IterationSample = () => {
    const names = ['눈사람', '얼음', '눈', '바람'];
    const nameList = names.map(name => <li>{name}</li>);
    return <ul>{nameList}</ul>;
};

위 코드는 key 가 없다는 경고메시지가 출력됩니다!!


> key
리액트에서 key는 컴포넌트 배열을 렌더링했을 때 어떤 원소에 변동이 있었는지 알아내려고 사용합니다.
key 값은 언제나 유일해야 합니다. 따라서 데이터가 가진 고유값을 key 값으로 설정해야 합니다.

const IterationSample = () => {
	const names = ['눈사람', '얼음', '눈', '바람'];
	const nameList = names.map((name, index) => <li key={index}>{name}</li>);
	return <ul>{nameList}</ul>;
};

index를 key로 사용하면 배열이 변경될 때 효율적으로 리렌더링하지 못합니다.
*/

