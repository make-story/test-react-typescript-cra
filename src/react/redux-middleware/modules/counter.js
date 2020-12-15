/*
리덕스 모듈 만들기 - 상태(action) 정의
*/
import { createAction, handleActions } from 'redux-actions';

// 1. 액션 타입(이름) 정의하기
const INCREASE = 'counter/INCREASE';
const DECREASE = 'counter/DECREASE';

// 2. 액션 생성 함수 만들기
export const increase = createAction(INCREASE);
export const decrease = createAction(DECREASE);

// 3. 초기 상태 값
const initialState = 0; // 상태는 꼭 객체일 필요가 없습니다. 숫자도 작동

// 4. 리듀서 함수 만들기 (상태 값 변경)
const counter = handleActions(
    {
        [INCREASE]: state => state + 1,
        [DECREASE]: state => state - 1
    },
    initialState
);

export default counter;