import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga from '../lib/createRequestSaga';
import * as authAPI from '../lib/api/auth';

const SAMPLE_ACTION = 'auth/SAMPLE_ACTION';
const CHANGE_FIELD = 'auth/CHANGE_FIELD';
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';

const REGISTER = 'auth/REGISTER';
const REGISTER_SUCCESS = 'auth/REGISTER_SUCCESS';
const REGISTER_FAILURE = 'auth/REGISTER_FAILURE';
const LOGIN = 'auth/LOGIN';
const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
const LOGIN_FAILURE = 'auth/LOGIN_FAILURE';

export const sampleAction = createAction(SAMPLE_ACTION);
export const changeField = createAction(CHANGE_FIELD, ({ form, key, value }) => {
	// payload
	// dispatch(changeField({ form: '', key: '', value: '' })); 디스패치 호출시 파라미터로 넘기는 값을 
	// handleActions 에서 payload 값으로 받음
	console.log(`form: ${form}, key: ${key}, value: ${value}`);
	return {
		form, // register, login
		key, // username, password, passwordConfirm
		value, // 실제 바꾸려는 값
	};
});
export const initializeForm = createAction(INITIALIZE_FORM, form => {
	// payload
	// dispatch(initializeForm('')); 디스패치 호출시 파라미터로 넘기는 값을 
	// handleActions 에서 payload 값으로 들어가는 값
	return form; // register
}); 
export const register = createAction(REGISTER, ({ username, password }) => {
	// payload
	// authAPI.register 로 넘길 파라미터 값
	return {
		username,
		password,
	};
});
export const login = createAction(LOGIN, ({ username, password }) => {
	// payload
	// authAPI.login 로 넘길 파라미터 값
	return {
		username,
		password,
	};
});

// 비동기 처리가 필요한 것 - saga 생성
/*
보통 2가지 함수 선언
1. call, put 등 실제 비동기 실행이 이루어지는 함수 (제너레이터 함수 또는 일반 함수)
2. takeEvery, takeLatest 등으로 액션타입(액션이름)과 실행 함수를 연결하는 제너레이터 함수

액션이 실행되면 -> 미들웨어 동작(saga) 후 -> 리듀서(handleActions) -> 스토어 저장
*/
const registerSaga = createRequestSaga(REGISTER, authAPI.register); // 제너레이터 함수 반환
const loginSaga = createRequestSaga(LOGIN, authAPI.login); // 제너레이터 함수 반환
export function* authSaga() {
	// REGISTER 디스패치(실행)시 사가에서 액션을 태스크한 후 registerSaga 실행
	yield takeLatest(REGISTER, registerSaga);
	// LOGIN 디스패치(실행)시 사가에서 액션을 태스크한 후 loginSaga 실행
	yield takeLatest(LOGIN, loginSaga);
}

const initialState = {
	register: {
		username: '',
		password: '',
		passwordConfirm: '',
	},
	login: {
		username: '',
		password: '',
	},
	auth: null,
	authError: null,
};

const auth = handleActions(
	{
		[SAMPLE_ACTION]: (state, action) => {
			return state;
		},
		[CHANGE_FIELD]: (state, { payload: { form, key, value } }) => {
			return produce(state, draft => {
				draft[form][key] = value; // 예: state.register.username 값을 바꾼다.
			});
		},
		[INITIALIZE_FORM]: (state, { payload: form }) => {
			return {
				...state,
				[form]: initialState[form],
			};
		},
		// 회원가입 성공
		[REGISTER_SUCCESS]: (state, { payload: auth }) => {
			return {
				...state,
				authError: null,
				auth,
			};
		},
		// 회원가입 실패
		[REGISTER_FAILURE]: (state, { payload: error }) => {
			return {
				...state,
				authError: error,
			};
		},
		// 로그인 성공
		[LOGIN_SUCCESS]: (state, { payload: auth }) => {
			return {
				...state,
				authError: null,
				auth,
			};
		},
		// 로그인 실패
		[LOGIN_FAILURE]: (state, { payload: error }) => {
			return {
				...state,
				authError: error,
			};
		},
	},
	initialState,
);

export default auth;

