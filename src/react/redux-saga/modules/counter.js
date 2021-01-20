// modules/counter.js
import { createAction, handleActions } from 'redux-actions';
import { delay, put, takeEvery, takeLatest } from 'redux-saga/effects';

// 액션 타입
const INCREASE = 'counter/INCREASE';
const DECREASE = 'counter/DECREASE';
const INCREASE_ASYNC = 'counter/INCREASE_ASYNC';
const DECREASE_ASYNC = 'counter/DECREASE_ASYNC';

// 액션 생성함수
export const increase = createAction(INCREASE);
export const decrease = createAction(DECREASE);
// 마우스 클릭 이벤트가 payload 안에 들어가지 않도록
// () => undefined 를 두 번째 파라미터로 넣어 줍니다.
export const increaseAsync = createAction(INCREASE_ASYNC, () => undefined);
export const decreaseAsync = createAction(DECREASE_ASYNC, () => undefined);

// 비동기 처리가 필요한 것 - saga 적용
function* increaseSaga() {
	yield delay(1000); // 1초를 기다립니다. - 비동기 통신이 발생한 것을 가정
	yield put(increase()); // 특정 액션을 디스패치 합니다.
}
function* decreaseSaga() {
	yield delay(1000); // 1초를 기다립니다. - 비동기 통신이 발생한 것을 가정
	yield put(decrease()); // 특정 액션을 디스패치 합니다.
}
export function* counterSaga() {
	// takeEvery 는 들어오는 모든 액션에 대해 특정 작업을 처리해 줍니다.
	// 즉, '+1' 버튼을 연속클릭하면 해당 작업이 모두 실행된다.
	yield takeEvery(INCREASE_ASYNC, increaseSaga);

	// takeLatest 는 기존에 진행 중이던 작업이 있다면 취소 처리하고
	// 가장 마지막으로 실행된 작업만 수행합니다.
	// 즉, '-1' 버튼을 연속클릭하면 마지막 작업이 실행되며 최종적으로 한번 실행한 효과가 된다.
	yield takeLatest(DECREASE_ASYNC, decreaseSaga);
}

// 초기값
const initialState = 0;

// 액션 함수(리듀서)
const counter = handleActions(
	{
		[INCREASE]: state => state + 1,
		[DECREASE]: state => state - 1,
	},
	initialState
);

export default counter;