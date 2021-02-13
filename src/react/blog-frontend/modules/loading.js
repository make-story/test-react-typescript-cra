import { createAction, handleActions } from "redux-actions";

const START_LOADING = 'loading/START_LOADING';
const FINISH_LOADING = 'loading/FINISH_LOADING';

/*
요청을 위한 액션 타입을 payload로 설정합니다.
(예: sample/GET_POST)
*/

export const startLoading = createAction(START_LOADING, requestType => {
	// payload
	console.log('startLoading', requestType);
	return requestType; // 액션 타입(액션 이름)을 상태 키 값으로 사용
});
export const finishLoading = createAction(FINISH_LOADING, requestType => {
	// payload
	console.log('finishLoading', requestType);
	return requestType; // 액션 타입(액션 이름)을 상태 키 값으로 사용
});

const initialState = {};

const loading = handleActions(
	{
		[START_LOADING]: (state, action) => {
			return {
				...state,
				[action.payload]: true,
			};
		},
		[FINISH_LOADING]: (state, action) => {
			return {
				...state,
				[action.payload]: false,
			};
		}
	},
	initialState,
);

export default loading;