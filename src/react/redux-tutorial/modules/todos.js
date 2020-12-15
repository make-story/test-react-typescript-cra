/*
redux-actions 를 사용하면 액션 생성 함수를 더 짧은 코드로 작성할 수 있습니다.
*/
import { createAction, handleActions } from 'redux-actions';
import produce from 'immer'; // 불변성 관리 라이브러리 


// 1. 액션 타입 정의하기 - 상태관리가 필요한 것의 이름
const CHANGE_INPUT = 'todos/CHANGE_INPUT'; // 인풋 값을 변경함
const INSERT = 'todos/INSERT'; // 새로운 todo를 등록함
const TOGGLE = 'todos/TOGGLE'; // todo를 체크/해제함
const REMOVE = 'todos/REMOVE'; // todo를 제거함


// 2. 액션 생성 함수 만들기 - 액션 객체를 만들어 주는 함수입니다.
/*export const changeInput = input => ({
    // 액션 객체는 type 필드는 반드시 가지고 있어야 합니다.
    type: CHANGE_INPUT,
    // 나중에 상태 업테이트를 할 때 참고해야 할 값(작성자 마음대로 넣는 값)
    input
});
let id = 3; // insert 가 호출될 때마다 1씩 더해집니다.
export const insert = text => ({
    // 액션 객체는 type 필드는 반드시 가지고 있어야 합니다.
    type: INSERT,
    // 나중에 상태 업테이트를 할 때 참고해야 할 값(작성자 마음대로 넣는 값)
    todo: {
        id: id++,
        text,
        done: false // checked 속성 
    }
});
export const toggle = id => ({
    // 액션 객체는 type 필드는 반드시 가지고 있어야 합니다.
    type: TOGGLE,
    // 나중에 상태 업테이트를 할 때 참고해야 할 값(작성자 마음대로 넣는 값)
    id
});
export const remove = id => ({
    // 액션 객체는 type 필드는 반드시 가지고 있어야 합니다.
    type: REMOVE,
    // 나중에 상태 업테이트를 할 때 참고해야 할 값(작성자 마음대로 넣는 값)
    id
});*/
// createAction 
export const changeInput = createAction(CHANGE_INPUT, /*payload 값에 변형을 주고 싶을 경우, 정의하는 함수(선택적)*/input => input);
let id = 3;
export const insert = createAction(INSERT, /*payload 값에 변형을 주고 싶을 경우, 정의하는 함수(선택적)*/text => ({
    id: id++,
    text,
    done: false,
}));
export const toggle = createAction(TOGGLE, /*payload 값에 변형을 주고 싶을 경우, 정의하는 함수(선택적)*/id => id);
export const remove = createAction(REMOVE, /*payload 값에 변형을 주고 싶을 경우, 정의하는 함수(선택적)*/id => id);


// 3. 초기 상태 값
const initialState = {
    input: '',
    todos: [
        {
            id: 1,
            text: '리덕스 기초 배우기',
            done: true
        },
        {
            id: 2,
            text: '리액트와 리덕스 사용하기',
            done: false
        }
    ]
};


// 4. 리듀서 함수 만들기 - 리듀서(reducer)는 변화를 일으키는 함수입니다. (상태값 변경)
/*function todos(state=initialState, action) {
    switch(action.type) {
        case CHANGE_INPUT:
            return {
                ...state,
                input: action.input
            };
        case INSERT:
            return {
                ...state,
                todos: state.todos.concat(action.todo)
            };
        case TOGGLE:
            return {
                ...state,
                todos: state.todos.map(todo => todo.id === action.id ? {...todo, done: !todo.done} : todo)
            };
        case REMOVE:
            return {
                ...state,
                todos: state.todos.filter(todo => todo.id !== action.id)
            };
        default:
            return state;
    }
}*/
// handleActions
/*const todos = handleActions(
    {
        [CHANGE_INPUT]: (state, {payload: input}) => ({...state, input: input}),
        [INSERT]: (state, {payload: todo}) => ({
            ...state,
            todos: state.todos.concat(todo),
        }),
        [TOGGLE]: (state, {payload: id}) => ({
            ...state,
            todos: state.todos.map(todo => todo.id === id ? {...todo, done: !todo.done} : todo),
        }),
        [REMOVE]: (state, {payload: id}) => ({
            ...state,
            todos: state.todos.filter(todo => todo.id !== id),
        }),
    },
    initialState,
);*/
// immer 사용하여 쉽게 불변성 관리 (... 연산자를 사용하는 방식이 아닌 produce 사용)
// immer 를 사용한다고 해서 모든 업데이트 함수에 immer를 적용할 필요는 없습니다.
const todos = handleActions(
    {
        [CHANGE_INPUT]: (state, {payload: input}) => 
            produce(state, draft => {
                draft.input = input;
            }),
        [INSERT]: (state, {payload: todo}) => 
            produce(state, draft => {
                draft.todos.push(todo);
            }),
        [TOGGLE]: (state, {payload: id}) => 
            produce(state, draft => {
                const todo = draft.todos.find(todo => todo.id === id);
                todo.done = !todo.done;
            }),
        [REMOVE]: (state, {payload: id}) => 
            produce(state, draft => {
                const index = draft.todos.findIndex(todo => todo.id === id);
                draft.todos.splice(index, 1);
            }),
    },
    initialState,
);

export default todos;