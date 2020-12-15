/*
리덕스 미들웨어는 액션을 디스패치했을 때 리듀서에서 이를 처리하기에 앞서 사전에 지정된 작업들을 실행합니다.

미들웨어는 액션과 리듀서 사이의 중간자라고 볼 수 있습니다.
액션 --> 미들웨어 --> 리듀서 --> 스토어

리듀서가 액션을 처리하기 전에 미들웨어가 할 수 있는 작업은 여러 가지가 있습니다.
전달받은 액션을 콘솔에 기록하거나, 전달받은 액션 정보를 기반으로 액션을 아예 취소하거나, 다른 종류의 액션을 추가로 디스패치할 수도 있습니다.
(실제 프로젝트를 작업할 때 미들웨어를 직접 만들어서 사용할 일은 그리 맍지 않습니다. 다른 개발자가 만들어 놓은 미들웨어 사용)
*/
import React from 'react';
import CounterContainer from './containers/CounterContainer';

const App = () => {
    return (
        <div>
            <CounterContainer />
        </div>
    );
};

export default App;