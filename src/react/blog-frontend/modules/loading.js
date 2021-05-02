import { createAction, handleActions } from "redux-actions";

const START_LOADING = 'loading/START_LOADING';
const FINISH_LOADING = 'loading/FINISH_LOADING';

export const startLoading = createAction(START_LOADING, requestType => {
	// payload
	console.log('startLoading', requestType);
	return requestType; // 로딩 구분(컴포넌트) 값으로 활용
});
export const finishLoading = createAction(FINISH_LOADING, requestType => {
	// payload
	console.log('finishLoading', requestType);
	return requestType; // 로딩 구분(컴포넌트) 값으로 활용
});

const initialState = {};

const loading = handleActions(
	{
		[START_LOADING]: (state, action) => {
			return {
				...state,
				[action.payload]: true, // requestType 요청 구분
			};
		},
		[FINISH_LOADING]: (state, action) => {
			return {
				...state,
				[action.payload]: false, // requestType 요청 구분
			};
		}
	},
	initialState,
);

export default loading;