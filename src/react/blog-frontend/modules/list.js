import { createAction, handleActions } from 'redux-actions';
import createRequestSaga from '../lib/createRequestSaga';
import * as postsAPI from '../lib/api/posts';
import { takeLatest } from 'redux-saga/effects';

const LIST_POSTS = 'list/LIST_POSTS';
const LIST_POSTS_SUCCESS = 'list/LIST_POSTS_SUCCESS';
const LIST_POSTS_FAILURE = 'list/LIST_POSTS_FAILURE';

export const listPosts = createAction(LIST_POSTS, ({ tag, username, page }) => ({ 
    tag, 
    username, 
    page 
}));

// 사가
const listPostsSaga = createRequestSaga(LIST_POSTS, postsAPI.listPosts);
export function* listSaga() {
    yield takeLatest(LIST_POSTS, listPostsSaga);
}

const initialState = {
    posts: null,
    error: null,
    lastPage: 1,
};

const list = handleActions(
    {
        [LIST_POSTS_SUCCESS]: (state, { payload: posts, meta: response }) => ({
            ...state,
            posts,
            lastPage: parseInt(response.headers['last-page'], 10), // 문자열을 숫자로 변환
        }),
        [LIST_POSTS_FAILURE]: (state, { payload: error }) => ({
            ...state,
            error,
        }),
    },
    initialState,
);

export default list;