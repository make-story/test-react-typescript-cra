/*
Todo 프로젝트 설계 순서

1. App 컴포넌트 초기화(생성)

2. UI 구성하기
 - TodoTemplate 
	화면을 가운데에 정렬시켜 주며, 앱 타이틀(일정관리)을 보여줍니다.
	children 으로 내부 JSX 를 props로 받아 와서 렌더링해 줍니다.
 - TodoInsert
	새로운 항목을 입력하고 추가할 수 있는 컴포넌트입니다. 
	state를 통해 인풋의 상태를 관리합니다.
 - TodoListItem
	각 할 일 항목에 대한 정보를 보여 주는 컴포넌트입니다.
	todo 객체를 props로 받아 와서 상태에 따라 다른 스타일의 UI를 보여 줍니다.
 - TodoList
	todos 배열을 props 로 받아온 후, 이를 배열 내장 함수 map 을 사용해서 여러 개의 TodoItem 컴포넌트로 변환하여 보여 줍니다.

3. 기능 구현하기
	일정 항목에 대한 상태들은 모두 App 컴포넌트에서 관리합니다.
	App 에서 useState 를 사용사여 todos 라는 상태를 정의하고, todos 를 TodoList 의 props 로 전달
*/
import React, { useState, useReducer, useRef, useCallback, Component } from 'react';
import TodoTemplate from './components/TodoTemplate';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';

// 성능 테스트를 위한 초기 데이터 (많은 데이터 만들고, 렌더링 등 테스트)
function createBulkTodos() {
	const array = [];
	for(let i = 1; i <= 2500; i++) {
		array.push({
			id: i,
			text: `할 일 ${i}`,
			checked: false,
		});
	}
	return array;
}

// useReducer 를 사용한 성능 개선
// useReducer 를 사용하는 방법은, 상태를 업데이트하는 로직을 모아서 컴포넌트 바깥에 둘 수 있다는 정점
function todoReducer(todos, action) {
	switch(action.type) {
		case 'INSERT': // 새로추가 
			// { typd: ''INSERT', todo: { id: 1, text: 'todo', checked: false } }
			return todos.concat(action.todo);
		case 'REMOVE': // 제거 
			// { type: 'REMOVE' id: 1 }
			return todos.filter(todo => todo.id !== action.id);
		case 'TOGGLE': // 토글 
			// { type: 'TOGGLE', id: 1}
			return todos.map(todo => todo.id === action.id ? { ...todo, checked: !todo.checked } : todo);
		default:
			return todos;
	}
}

// 초기값
const initialState = [
	{
		id: 1,
		text: '리액트의 기초 알아보기',
		checked: true,
	},
	{
		id: 2,
		text: '컴포넌트 스타일링해 보기',
		checked: true,
	},
	{
		id: 3,
		text: '일정 관리 앱 만들어 보기',
		checked: false,
	},
];

const App = () => {
	// 초기 상태 정의
	//const [todos, setToodos] = useState(initialState);
	//const [todos, setTodos] = useState(createBulkTodos);


	// useReducer 를 활용한 성능 개선
	/*
	useReducer 를 사용할 때는 원래 두 번째 파라미터에 초기 상태를 넣어 주어야 합니다.
	지금은 그 대신 두 번째 파라미터에 undefined 를 넣고, 세 번째 파라미터에 초기 상태를 만들어 주는 함수인 createBulkTodos 를 넣어 주었는데요.
	이렇게 하면 컴포넌트가 맨 처음 렌더링 될 때만 createBulkTodos 함수가 호출됩니다.
	*/
	//const [todos, dispatch] = useReducer(todoReducer, undefined, createBulkTodos/*두 번째 파라미터에 undefind, 세 번째 파라미터에 초기 상태를 만들어 주는 함수, 맨 처음 렌더링 될 때만 호출*/);
	const [todos, dispatch] = useReducer(todoReducer, initialState);
	

	// 고유값으로 사용될 id
	// ref 를 사용하여 변수 담기 
	/*
	useState 가 아닌 useRef 를 사용하여 컴포넌트에서 사용할 변수를 만드는 이유는 무엇일까요?
	id 값은 렌더링되는 정보가 아니기 때문입니다.
	예를 들어 이 값은 화면에 보이지도 않고, 이 값이 바뀐다고 해서 컴포넌트가 리렌더링될 필요도 없습니다.
	단순히 새로운 항목을 만들 때 참조되는 값일 뿐입니다.
	*/
	const nextId = useRef(todos.length + 1);


	// 힐일 추가 - 성능개선 전 
	/*const onInsert = useCallback(
		text => {
			const todo = {
				id: nextId.current,
				text,
				checked: false,
			};
			setToodos(todos.concat(todo));
			nextId.current += 1; // nextId 1씩 더하기 
		}, 
		[todos]
	);*/
	/*
	todos 배열이 업데이트 되면 onRemove 와 onToggle 함수도 새롭게 바뀜 (onToggle, onRemove 가 계속 새로워지는 문제)
	onRemove 와 onToggle 함수는 배열 상태를 업데이트하는 과정에서 최신 상태의 todos 를 참조하기 때문에 todos 배열이 바뀔 때마다 함수가 새로 만들어 집니다.
	이렇게 함수가 계속 만들어지는 상황을 방지하는 방법은 두가지 입니다.
	
	첫번째 방법은 useState 의 함수형 업데이트 기능을 사용하는 것이고,
	두번째 방법은 useReducer 를 사용하는 것입니다.
	(성능상 두 방법 비슷)

	기존 setTodos 함수를 사용할 때는 새로운 상태를 파라미터로 넣어 주었습니다.
	setTodos 를 사용할 때 새로운 상태를 파라미터로 넣는 대신, 상태 업데이트를 어떻게 할지 정의해 주는 업데이트 함수를 넣을 수도 있습니다.
	이를 함수형 업데이트라고 부릅니다.
	setTodos 를 사용할 때 그 안에 todos => 만 넣어 주면 됩니다.
	*/
	// 힐일 추가 - 성능개선 후 useState
	/*const onInsert = useCallback(
		text => {
			const todo = {
				id: nextId.current,
				text,
				checked: false,
			};
			setTodos(todos => todos.concat(todo));
			nextId.current += 1; // nextId 1씩 더하기 
		}, 
		[]
	);
	*/
	// 힐일 추가 - 성능개선 후 useReducer
	const onInsert = useCallback(
		text => {
			const todo = {
				id: nextId.current,
				text,
				checked: false
			};
			dispatch({ type: 'INSERT', todo });
			nextId.current += 1; // nextId 1씩 더하기 
		}
	);


	// 힐일 삭제 - 성능개선 전
	/*const onRemove =useCallback(
		id => {
			setToodos(todos.filter(todo => todo.id !== id));
		},
		[todos],
	);*/
	// 힐일 삭제 - 성능개선 후 useState
	/*const onRemove = useCallback(
		id => {
			setTodos(todos => todos.filter(todo => todo.id !== id));
		}, 
		[]
	);*/
	// 힐일 삭제 - 성능개선 후 useReducer
	const onRemove = useCallback(
		id => {
			dispatch({ type: 'REMOVE', id });
		}, 
		[]
	);


	// 힐일 수정 - 성능개선 전 
	/*const onToggle = useCallback(
		id => {
			setToodos(
				todos.map(todo => 
					todo.id === id ? {...todo, checked: !todo.checked} : todo,
				),
			);
		},
		[todos],
	);*/
	// 힐일 수정 - 성능개선 후 useState
	/*const onToggle = useCallback(
		id => {
			setTodos(todos => 
				todos.map(todo =>
					todo.id === id ? { ...todo, checked: !todo.checked } : todo,
				),
			);
		}, 
		[]
	);*/
	// 힐일 수정 - 성능개선 후 useReducer
	const onToggle = useCallback(
		id => {
			dispatch({ type: 'TOGGLE', id });
		}, 
		[]
	);


	// TodoTemplate 에 태그와 태그사이 내용을 넘겨준다.
	return (
		<TodoTemplate>
			<TodoInsert onInsert={onInsert} />
			<TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
		</TodoTemplate>
	);
};

export default App;