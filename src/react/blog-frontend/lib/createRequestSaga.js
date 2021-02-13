import { call, put } from 'redux-saga/effects';
import { startLoading, finishLoading } from '../modules/loading';

// 사가 (제너레이터 함수 생성하여 반환)
export default function createRequestSaga(actionType, reuqest) {
	// actionType: 액션 타입(액션 이름)
	console.log(`createRequestSaga actionType: ${actionType}`);
	const SUCCESS = `${actionType}_SUCCESS`; // auth/REGISTER_SUCCESS, auth/LOGIN_SUCCESS
	const FAILURE = `${actionType}_FAILURE`; // auth/REGISTER_FAILURE, auth/LOGIN_FAILURE

	return function* (action) {
		// 디스패치 - 로딩 시작 
		yield put(startLoading(actionType)); 

		try {
			// call(비동기 실행함수, 함꼐 넘길 파라미터 값)
			const response = yield call(reuqest, action.payload); 

			// 디스패치
			yield put({ 
				type: SUCCESS, // 액션 타입
				payload: response.data,
				meta: response,
			});
		}catch(e) {
			// 디스패치
			yield put({ 
				type: FAILURE, // 액션 타입 
				payload: e,
				error: true,
			});
		}

		// 디스패치 - 로딩 끝
		yield put(finishLoading(actionType)); 
	}
}
