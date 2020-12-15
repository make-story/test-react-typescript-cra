/*
immer 를 사용하면 불변성을 유지하는 작업을 매우 간단하게 처리할 수 있습니다.

produce 라는 함수는 두 가지 파라미터를 받습니다.
첫 번째 파라미터는 수정하고 싶은 상태이고, 
두 번째 파라미터는 상태를 어떻게 업데이트할지 정의하는 함수입니다.
두 번째 파라미터로 전달되는 함수 내부에서 원하는 값을 변경하면, produce 함수가 불변성 유지를 대신해 주면서 새로운 상태를 생성해 줍니다.


-
useState 의 함수형 업데이트와 immer 함께 쓰기
immer 에서 제공하는 produce 함수를 호출할 때, 첫 번째 파라미터가 함수형태라면 업데이트 함수를 반환합니다.
*/
import React, { useRef, useState, useCallback } from 'react';
import produce from 'immer';

// 간단한 예제
/*const originalState = [
	{
		id: 1,
		todo: '작업 1',
		checked: true,
	},
	{
		id: 2,
		todo: '작업 2',
		checked: false,
	},
];
const nextState = produce(originalState, draft => {
	// id 가 2인 항목의 checked 값을 true 로 설정
	const todo = draft.find(t => t.id === 2); // id 로 항목 찾기
	todo.checked = true;

	// 배열에 새로운 데이터 추가
	draft.push({
		id: 3,
		todo: '작업 3',
		checked: false,
	});

	// id === 1 인 항목을 제거하기
	draft.splice(draft.findIndex(t => t.id === 1), 1);
});*/


const App = () => {
	const nextId = useRef(1);
	const [form, setForm] = useState({ name: '', username: '' });
	const [data, setData] = useState({
		array: [],
		uselessValue: null,
	});

	// input 수정을 위한 함수
	const onChange = useCallback(
		e => {
			const { name, value } = e.target;

			/*setForm({
				...form,
				[name]: [value]
			});*/
			// immer 활용
			/*setForm(
				produce(form, draft => {
					// 바꾸고 싶은 값만 바꾸기
					draft[name] = value;
				})
			);*/
			// useState 의 함수형 업데이트와 immer 함께 쓰기
			setForm(
				// 첫 번째 파라미터가 함수형태라면 업데이트 함수를 반환합니다.
				produce(draft => {
					// 바꾸고 싶은 값만 바꾸기
					draft[name] = value;
				})
			);
		},
		[form]
	);

	// form 등록을 위한 함수
	const onSubmit = useCallback(
		e => {
			e.preventDefault();

			const info = {
				id: nextId.current,
				name: form.name,
				username: form.username
			};

			// array에 새 항목 등록
			/*setData({
				...data,
				array: data.array.concat(info)
			});*/
			// immer 활용
			/*setData(
				produce(data, draft => {
					// 바꾸고 싶은 값만 바꾸기
					draft.array.push(info);
				})
			);*/
			// useState 의 함수형 업데이트와 immer 함께 쓰기
			setData(
				// 첫 번째 파라미터가 함수형태라면 업데이트 함수를 반환합니다.
				produce(draft => {
					// 바꾸고 싶은 값만 바꾸기
					draft.array.push(info);
				})
			);

			// form 초기화
			setForm({
				name: '',
				username: ''
			});
			nextId.current += 1;
		},
		[data, form.name, form.username]
	);

	// 항목을 삭제하는 함수
	const onRemove = useCallback(
		id => {
			/*setData({
				...data,
				array: data.array.filter(info => info.id !== id)
			});*/
			// immer 활용
			setData(
				produce(data, draft => {
					// 바꾸고 싶은 값만 바꾸기
					draft.array.splice(draft.array.findIndex(info => info.id === id), 1);
				})
			);
		},
		[data]
	);

	return (
		<div>
			<form onSubmit={onSubmit}>
				<input
					name="username"
					placeholder="아이디"
					value={form.username}
					onChange={onChange}
				/>
				<input
					name="name"
					placeholder="이름"
					value={form.name}
					onChange={onChange}
				/>
				<button type="submit">등록</button>
			</form>
			<div>
				<ul>
					{data.array.map(info => (
						<li key={info.id} onClick={() => onRemove(info.id)}>
							{info.username} ({info.name})
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default App;