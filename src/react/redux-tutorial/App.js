/*
리덕스를 사용하여 리액트 애플리케이션 상태 관리하기

리액트 프로젝트에서 리덕스를 사용할 때 가장 많이 사용하는 패턴은 프레젠테이셔널 컴포넌트와 컨테이너 컴포넌트를 분리하는 것입니다.
여기서 프레젠테이셔널 컴포넌트란 주로 상태 관리가 이루어지지 않고, 그저 props 를 받아 와서 화면에 UI를 보여 주기만 하는 컴포넌트를 말합니다.
이와 달리 컨테이너 컴포넌트는 리덕스와 연동되어 있는 컴포넌트로, 리덕스로부터 상태를 받아오기도 하고, 리덕스 스토어에 액션을 디스패치(액션발생시키기)하기도 합니다.


-
리덕스 설계 순서
1. modules/counter 리덕스 모듈 만들기 
    - 상태 정의
2. modules/index 루트 리듀서 만들기 
    - 각 리듀스 모듈 하나로 합침
3. index.js 에 스토어를 생성한 후, Provider 로 리액트 프로젝트에 리덕스를 적용 
    - createStore 통해 스토어 생성, <Provider store={store}><App /></Provider>
4. components/Counter 프레젠케이셔널 컴포넌트 만들기 
    - 그저 props 를 받아 와서 화면에 UI를 보여주기만 하는 컴포넌트
5. containers/CounterContainer 컨테이너 컴포넌트 만들기 
    - 리덕스 스토어와 연동된 컴포넌트 
6. App 에서 CounterContainer 를 렌더링


-
개념 (용어설명)
1. 액션 - 액션 이름 정의
상태에 어떠한 변화가 필요하면 액션(action)이란 것이 발생합니다. 이는 하나의 객체로 표현
액션 객체는 type 필드를 반드시 가지고 있어야 합니다.
이 값을 액션의 이름이라고 생각하면 됩니다.
그리고 그 외의 값들은 나중에 상태 업데이트를 살 때 참고해야할 값으로 넣을 수 있음
{ type: 'TOGGLE_VALUE }

2. 액션 생성 함수 - 액션 객체 생성
액션 생성 함수(action creator)는 액션 객체를 만들어 주는 함수입니다.
어떤 변화를 일으켜야 할 때마다 액션 객체를 만들어야 하는데 매번 액션 객체를 직접 작성하기 번거로울 수도 있고, 만드는 과정에서 실수로 정보를 놓칠 수도 있습니다. 
이러한 일을 방지하기 위해 이를 함수로 만들어서 관리합니다.
const toggleValue = () => ({ type: 'TOGGLE_VALUE '});

3. 리듀서 - 상태 값 변경
리듀서(reducer)는 변화를 일으키는 함수입니다.
액션을 만들어서 발생시키면 리듀서가 현재 상태와 전달받은 액션 객체를 파라미터로 받아옵니다.
그리고 두 값을 참고하여 새로운 상태를 만들어서 반환해 줍니다.
const reducer = (state, action) => {
    switch(action.type) {
        case 'TOGGLE_VALUE':
            return {
                ...state,
                // 변경
            }
    }
}

4. 스토어
프로젝트에 리덕스를 적용하기 위해 스토어(store)를 만듭니다.
한 개의 프로젝트는 단 하나의 스토어만 가질 수 있습니다.

5. 디스패치 - 리듀서 함수 실행
디스패치(dispatch, 보내다/해치우다)는 스토어의 내장 함수 중 하나입니다.
디스패치는 '액션을 발생시키는 것'이라고 이해하면 됩니다.
이 함수는 dispatch(action) 과 같은 형태로 액션 객체를 파라미터로 넣어서 호출합니다.
이 함수가 호출되면 스토어는 리듀서 함수를 실행시켜서 새로운 상태를 만들어 줍니다.

6. 구독
구독(subscribe)도 스토어의 내장 함수 중 하나입니다.
subscribe 함수 안에 리스너 함수를 파라미터로 넣어서 호출해 주면,
이 리스너 함수가 액션이 디스패치되어 상태가 업데이트될 때마다 호출됩니다.
const listener = () => console.log('상태변경됨');
const unsubscribe = store.subscribe(listener);
unsubscribe(); // 추후 구독을 비활성화할 때 함수를 호출
*/

import React from 'react';
//import Counter from './components/Counter';
import CounterContainer from './containers/CounterContainer';
//import Todos from './components/Todos';
import TodosContainer from './containers/TodosContainer';

/*const App = () => {
    return (
        <div>
            <Counter number={0} />
            <hr />
            <Todos />
        </div>
    );
};*/
const App = () => {
    return (
        <div>
            <CounterContainer />
            <hr />
            <TodosContainer />
        </div>
    );
};

export default App;