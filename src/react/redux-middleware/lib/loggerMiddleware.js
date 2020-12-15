/*
액션이 디스패치될 때마다 액션의 정보와 액션이 디스패치되기 전후의 상태를 
콘솔에 보여주는 로깅 미들웨어
*/

/*const loggerMiddleware = function loggerMiddleware(store) {
    // 미들웨어는 결국 함수를 반환하는 함수 입니다.
    // store : 리덕스 스토어 인스턴스
    // next : 함수 형태이며, store.dispatch 와 비슷한 역할을 합니다. - 차이점은 next(action) 을 호출하면 그 다음 처리해야 할 미들웨어에게 액션을 넘겨주고, 만약 그 다음 미들웨어가 없다면 리듀서에게 액션을 넘겨준다는 것
    // action : 디스패치된 액션
    return function(next) {
        return function(action) {
            // 미들웨어 기본 구조 
        };
    };
};*/
const loggerMiddleware = store => next => action => { // 화살표 함수 사용
    // 미들웨어 기본 구조
    /*
    다음 정보를 순차적으로 콘솔에 보여 줍니다.
    1. 이전 상태
    2. 액션 정보
    3. 새로워진 상태
    */
   console.group(action && action.type); // 액션 타입으로 log 를 그룹화함
   console.log('이전 상태', store.getState());
   console.log('액션', action);
   next(action); // 다음 미들웨어 혹은 리듀서에게 전달
   console.log('다음 상태', store.getState()); // 업데이트된 상태
   console.groupEnd(); // 그룹 끝
};

export default loggerMiddleware;