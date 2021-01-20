// modules/index.js
import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import counter, { counterSaga } from './counter';

// 루트 리듀서
const rootReducer = combineReducers({
	counter,
});

// 루트 사가
// 추후 다른 리듀서에서도 사가를 만들어 등록할 것
export function* rootSaga() {
	// all 함수는 여러 사가를 합쳐 주는 역할을 합니다.
	yield all([
		counterSaga()
	]);
}

export default rootReducer;