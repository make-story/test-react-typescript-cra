/*
루트 리듀서 만들기 - combineReducers 이용해 리듀서를 하나로 합쳐주는 것
*/
import { combineReducers } from 'redux';
import counter from './counter';

const rootReducer = combineReducers({
    counter,
});

export default rootReducer;