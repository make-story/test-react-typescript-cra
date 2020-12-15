/*
커스텀 Hook 만들기 - useReducer 활용
https://blog.bitsrc.io/11-useful-custom-react-hooks-for-your-next-app-c66307cf0f0c
*/
import { useReducer } from 'react';

function reducer(state, action) {
	return {
		...state,
		[action.name]: action.value
	};
}

export default function useInputs(initialForm) {
	const [state, dispatch] = useReducer(reducer, initialForm);
	const onChange = e => {
		dispatch(e.target);
	};
	return [state, onChange];
}

/*
const [stateCustom, dispatchCustom] = useInputs({
	name: '',
	nickname: '',
});
const { name, nickname } = stateCustom;
*/