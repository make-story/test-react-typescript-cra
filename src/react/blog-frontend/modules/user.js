import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import * as authAPI from '../lib/api/auth';
import createRequestSaga from '../lib/createRequestSaga';

const TEMP_SET_USER = 'user/TEMP_SET_USER'; // 새로고침 이후 임시 로그인 처리
const CHECK = 'user/CHECK';
const CHECK_SUCCESS = 'user/CHECK_SUCCESS';
const CHECK_FAILURE = 'user/CHECK_FAILURE';
const LOGOUT = 'user/LOGOUT';

export const tempSetUser = createAction(TEMP_SET_USER, user => {
	// payload
	return user;
});
export const check = createAction(CHECK);
export const logout = createAction(LOGOUT);

// 사가
const checkSaga = createRequestSaga(CHECK, authAPI.check);
function checkFailureSaga() {
	try {
		localStorage.removeItem('user'); // localStorage 에서 user 제거하고
	}catch (e) {
		console.log('localStorage is not working');
	}
}
function* logoutSaga() {
	try {
		yield call(authAPI.logout); // logout API 호출
		localStorage.removeItem('user'); // localStorage 에서 user 제거
	}catch (e) {
		console.log(e);
	}
}
export function* userSaga() {
	// 액션타입(액션이름)이 실행되기 전 실행
	yield takeLatest(CHECK, checkSaga);
	yield takeLatest(CHECK_FAILURE, checkFailureSaga);
	yield takeLatest(LOGOUT, logoutSaga);
}

const initialState = {
	user: null,
	checkError: null
};

export default handleActions(
	{
		[TEMP_SET_USER]: (state, { payload: user }) => ({
			...state,
			user
		}),
		[CHECK_SUCCESS]: (state, { payload: user }) => ({
			...state,
			user,
			checkError: null
		}),
		[CHECK_FAILURE]: (state, { payload: error }) => ({
			...state,
			user: null,
			checkError: error
		}),
		[LOGOUT]: state => ({
			...state,
			user: null,
		}),
	},
	initialState
);