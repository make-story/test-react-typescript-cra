/*
loading 모듈
*/
import { createAction, handleActions } from 'redux-actions';

const START_LOADING = 'loading/START_LOADING';
const FINISH_LOADING = 'loading/FINISH_LOADING';

/*
요청을 위한 액션타입을 payload 로 설정합니다. (예: "sample/GET_POST")
*/
export const startLoading = createAction(
    // 액션 이름
    START_LOADING,
    // payload 값 변형해주는 함수 정의
    requestType => requestType,
);

export const finishLoading = createAction(
    // 액션 이름
    FINISH_LOADING,
    // payload 값 변형해주는 함수 정의
    requestType => requestType,
);

const initialState = {};

const loading = handleActions(
    {
        [START_LOADING]: (state, action) => ({
            ...state,
            // createAction - payload
            [action.payload]: true,
        }),
        [FINISH_LOADING]: (state, action) => ({
            ...state,
            // createAction - payload
            [action.payload]: false,
        }),
    },
    initialState,
);

export default loading;
