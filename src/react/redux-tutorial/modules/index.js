/*
루트 리듀서 만들기 - combineReducers 이용해 리듀서를 하나로 합쳐주는 것

-
프로젝트에서 여러 리듀서를 만들었을 경우,
나중에 crateStore 함수를 사용하여 스토어를 만들 때는 리듀서를 하나만 사용해야 합니다.
그렇기 때문에 기존에 만들었던 리듀서를 하나로 합쳐주어야 하는데요.
이 작업은 리덕스에서 제공하는 combineReducers 라는 유틸 함수를 사용하면 쉽게 처리할 수 있습니다.

-
이 루트 리듀서를 index.js 에서,
const store = creteStore(루트 리듀서); 
스토어를 생성한 후,
<Provider store={store}>
    <App />
</Provider>
Provider 로 리액트 프로젝트에 리덕스 적용!
*/
import { combineReducers } from 'redux';
import counter from './counter';
import todos from './todos';

const rootReducer = combineReducers({
    counter,
    todos,
});

export default rootReducer;