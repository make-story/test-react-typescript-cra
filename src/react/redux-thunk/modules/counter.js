/*
redux-thunk 는 액션 생성 함수에서 일반 액션 객체를 반환하는 대신에 함수를 반환합니다.
*/
import { createAction, handleActions } from 'redux-actions';

// 액션 이름 정의
const INCREASE = 'counter/INCREASE';
const DECREASE = 'counter/DECREASE';

// 액션 객체 생성 - { type: 액션이름, 사용자 추가 데이터키: 값 } 형태의 객체
export const increase = createAction(INCREASE);
export const decrease = createAction(DECREASE);

// 1초 뒤에 increase 혹은 decrease 함수를 디스패치함 
export const increaseAsync = () => dispatch => {
	setTimeout(() => {
		dispatch(increase());
	}, 1000);
};
export const decreaseAsync = () => dispatch => {
	setTimeout(() => {
		dispatch(decrease());
	}, 1000);
};

// 상태 초기값
const initialState = 0;

// 리듀서 (액션 상태값 변경)
const counter = handleActions(
	{
		[INCREASE]: state => state + 1,
		[DECREASE]: state => state - 1
	},
	initialState
);

export default counter;