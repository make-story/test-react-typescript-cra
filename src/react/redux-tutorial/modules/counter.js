/*
리덕스 모듈 만들기 - 상태(action) 정의


> redux-actions
redux-actions 를 사용하면 액션 생성 함수를 더 짧은 코드로 작성할 수 있습니다.
그리고 리듀서를 작성할 때도 switch/case이 아닌 handleActions 라는 함수를 사용하여 각 액션마다 업데이트 함수를 설정하는 형식으로 작성해 줄 수 있습니다.


> createAction - payload
createAction 으로 액션을 만들면,
액션에 필요한 추가 데이터는 payload 라는 이름을 사용합니다.
const MY_ACTION = 'sample/MY_ACTION';
const myAction = createAction(MY_ACTION);
const action = myAction('hello world'); 
결과 : { type: MY_ACTION, payload: 'hello world' }

액션 생성 함수에서 받아 온 파라미터를 그대로 payload 에 넣는 것이 아니라 변형을 주어서 넣고 싶다면,
createAction 의 두 번째 파라미터에 payload 를 정의하는 함수를 따로 선언해서 넣어 주면 됩니다.
const MY_ACTION = 'sample/MY_ACTION';
const myAction = createAction(MY_ACTION, text => `${text}!`);
const action = myAction('hello world'); 
결과 : { type: MY_ACTION, payload: 'hello world!' }
*/
import { createAction, handleActions } from 'redux-actions'; 


/*
-
FSA(Flux Standard Action)
https://github.com/redux-utilities/flux-standard-action  

객체는 액션을 구분할 고유한 문자열을 가진 `type` 필드가 반드시 있으며,   
`payload` 필드에 데이터를 담아 전달한다.   
그 외에 `meta`, `error` 필드를 가질 수도 있다.
{
    type: ACTION_NAME,
    payload: 'createAction 활용할 경우, 두 번째 파라미터 함수 반환 값',
    meta: '사용자값',
    error: '사용자값',
}

-
redux-actions
createAction 활용해 위 규격을 갖춰 구조를 만듦
handleActions 활용해 리듀서(상태값 변경) 간단한 구조로 액션 타입에 따른 분기 설정
*/


// 1. 액션 타입 정의하기 - 상태관리가 필요한 것의 이름
// '모듈이름/액션이름' 과 같은 형태로 작성 (나중에 프로젝트가 커졌을 때 액션의 이름이 출돌되지 않도록)
const INCREASE = 'counter/INCREASE';
const DECREASE = 'counter/DECREASE';


// 2. 액션 생성 함수 만들기 - 액션 객체를 만들어 주는 함수입니다.
/*
액션 객체는 type 필드를 가지고 있음
{
	type: 'INCREASE', // 필수 - type: 액션이름
	사용자추가 데이터키: 값, // 선택적 - 키: 값
}
어떤 변화가 일으켜야 할 때마다 위와 같은 액션 객체를 만들어야 하는데,
매번 액션 객체를 직접 작성하기 번거로울 수도 있고, 만드는 과정에서 실수로 정보를 놓칠 수도 있습니다.
이러한 일을 방지하기 위해 이를 함수로 만들어서 관리합니다.
*/
//export const increase = () => ({type: INCREASE});
//export const decrease = () => ({type: DECREASE});
export const increase = createAction(INCREASE);
export const decrease = createAction(DECREASE);


// 3. 초기 상태 값 (상태는 꼭 객체일 필요가 없습니다. initialState = 0 처럼 숫자값도 작동합니다.)
const initialState = {
	number: 0
};


// 4. 리듀서 함수 만들기 - 리듀서(reducer)는 변화를 일으키는 함수입니다. (상태값 변경)
/*function counter(state=initialState, action) {
	switch(action.type) {
		case INCREASE:
			return {
				number: state.number + 1
			};
		case DECREASE:
			return {
				number: state.number - 1
			};
		default:
			return state;
	}
}*/
// handleActions
const counter = handleActions(
	// 각 액션에 대한 업데이트 함수 
	{
		[INCREASE]: (state, action) => ({ number: state.number + 1 }),
		[DECREASE]: (state, action) => ({ number: state.number - 1 }),
	},
	// 초기 상태 값 
	initialState,
);

export default counter;

