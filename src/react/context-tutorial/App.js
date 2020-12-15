/*
-
Context API - 전역적 상태관리
Context API는 리액트 프로젝트에서 전역적으로 사용할 데이터가 있을 때 유용한 기능입니다.
이를테면 사용자 로그인 정보, 애플리케이션 환경 설정, 테마 등 여러 종류가 있겠지요.

Context API는 리액트 v16.3 부터 사용하기 쉽게 많이 개선되었습니다.
이 기능은 리액트 관련 라이브러리에서도 많이 사용되고 있습니다. 
예를 들면 리덕스, 리액트 라우터, styled-components 등의 라이브러리는 Context API를 기반으로 구현되어 있습니다.


-
기존에는 최상위 컴포넌트에서 여러 컴포넌트를 거쳐 props 로 원하는 상태와 함수르 전달했지만,
Context API 를 사용하면 Context 를 만들어 단 한 번에 원하는 값을 받아 와서 사용할 수 있습니다.


-
정리
기존에는 컴포넌트 간에 상태를 교류해야 할 때 무조건 부모 -> 자식 흐름으로 props 를 통해 전달해 주었는데요.
이제는 Context API 를 통해 더욱 쉽게 상태를 교류할 수 있게 되었습니다.
프로젝트의 컴포넌트 구조가 꽤 간단하고 다루는 상태의 종류가 그다지 많지 않다면, 굳이 Context 를 사용할 필요는 없습니다.
하지만 전역적으로 여기저기서 사용되는 상태가 있고 컴포넌트의 개수가 많은 상황이라면, Context API 를 사용하는 것을 권합니다.

리액트 v16.3 에서 Context API 가 개선되기 전에는 주로 리덕스를 사용하여 전역 상태를 관리해 왔습니다.
(리덕스는 더욱 향상된 성능과 미들웨어 기능, 강력한 개발자 도구, 코드의 높은 유지보수성을 제공)


-
Context / Consumer / Provider 각 용어
Context 만들기
예: contexts/color.js 
const ColorContext = createContext();

Consumer 사용하기 
예: components/ColorBox.js
Context 안에 들어 있는 상태값을 Consumer 을 통해 조회
<ColorContext.Consumer>{value => { 코드 }}</ColorContext.Consumer>

Provider
예: App.js 
Context 의 value (상태값) 를 변경할 수 있음
 <ColorContext.Provider value={{ color: 'red' }}></ColorContext.Provider>
*/
import React from 'react';
import ColorBox from './components/ColorBox';
import ColorContext, { ColorProvider } from './contexts/color';
import SelectColors from './components/SelectColors';

const App = () => {
    // Provider (Context 의 value 를 변경)
    // Provider 방식을 사용할 때는 value 값을 꼭 명시해 주어야 제대로 작동!
    /*return (
        <ColorContext.Provider value={{ color: 'red' }}>
            <div>
                <ColorBox />
            </div>
        </ColorContext.Provider>
    );*/

    return (
        <ColorProvider>
            <div>
                <SelectColors />
                <ColorBox />
            </div>
        </ColorProvider>
    );
};

export default App;