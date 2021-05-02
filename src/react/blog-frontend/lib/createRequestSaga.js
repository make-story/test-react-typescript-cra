import { call, put } from 'redux-saga/effects';
import { startLoading, finishLoading } from '../modules/loading';

// 사가 (제너레이터 함수 생성하여 반환)
export default function createRequestSaga(actionType, reuqest) {
	// actionType: 액션 타입(액션 이름)
	console.log(`createRequestSaga actionType: ${actionType}`);
	const SUCCESS = `${actionType}_SUCCESS`; 
	const FAILURE = `${actionType}_FAILURE`; 

	/*
	> 로딩 redux 참고
	modules/loading.js

	const START_LOADING = 'loading/START_LOADING'; // 로딩 시작
	const FINISH_LOADING = 'loading/FINISH_LOADING'; // 로딩 끝

	export const startLoading = createAction(START_LOADING, requestType => {
		return requestType; // payload
	});
	export const finishLoading = createAction(FINISH_LOADING, requestType => {
		return requestType; // payload
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



	> 각 영역별 redux 참고
	modules/list.js 

	const LIST_POSTS = 'list/LIST_POSTS'; // 시작 콜 type
	const LIST_POSTS_SUCCESS = 'list/LIST_POSTS_SUCCESS'; // 성공 콜 type
	const LIST_POSTS_FAILURE = 'list/LIST_POSTS_FAILURE'; // 실패 콜 type

	export const listPosts = createAction(LIST_POSTS, ({ tag, username, page }) => ({ 
		tag, 
		username, 
		page 
	}));

	const listPostsSaga = createRequestSaga(LIST_POSTS, postsAPI.listPosts);
	export function* listSaga() {
    	yield takeLatest(LIST_POSTS, listPostsSaga);
	}



	> 공통 요청 사가 참고
	lib/createRequestSaga.js
	


	> 각 컨테이너 컴포넌트 참고 - saga 디스패치(호출)
	containers/list/PostListContainer.js

	const { posts, error, loading, user } = useSelector(({ list, loading, user, }) => ({
		posts: list.posts,
		error: list.error,
		loading: loading['list/LIST_POSTS'], // 로딩상태
		user: user.user,
	}));
	useEffect(() => {
		dispatch(listPosts()); // 디스패치
	}, [dispatch);
	*/

	return function* (action) {
		// 디스패치 - 로딩 시작 
		yield put(startLoading(actionType)); // START_LOADING

		try {
			// call(비동기 실행함수, 함꼐 넘길 파라미터 값)
			const response = yield call(reuqest, action.payload); 

			// 디스패치
			yield put({ 
				type: SUCCESS, // 액션 타입 - 예: list/LIST_POSTS_SUCCESS
				payload: response.data,
				meta: response,
			});
		}catch(e) {
			// 디스패치
			yield put({ 
				type: FAILURE, // 액션 타입 - 예: list/LIST_POSTS_FAILURE
				payload: e,
				error: true,
			});
		}

		// 디스패치 - 로딩 끝
		yield put(finishLoading(actionType)); // FINISH_LOADING
	}
}
