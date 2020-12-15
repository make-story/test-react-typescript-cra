/*
리액트 라우터를 적용할 때 만들어야 하는 페이지는 pages/하위
*/
import React, { useState, useCallback } from 'react';
import axios from 'axios';
import NewsList from './components/NewsList';
import Categories from './components/Categories';
import { Route } from 'react-router-dom';
import NewsPage from './pages/NewsPage';

const App = () => {
    // 테스트 데이터 
    // 네트워크 연결 JSON 받아오기 테스트 
    /*const [data, setData] = useState(null);
    // webpack 설정에 babel 을 지정해 두었기 때문에 babel 이 await / await 코드를 (이것의 구현 모듈인) regeneratorRuntime 로 변환한 것으로 파악
    // https://medium.com/@jongmoon.yoon/mocha-%EB%8B%A8%EC%9C%84-%ED%85%8C%EC%8A%A4%ED%8A%B8-%EC%BD%94%EB%93%9C%EC%97%90-async-await-%EC%A0%81%EC%9A%A9-%EC%9D%B4%EC%8A%88-8d18f81cb44c
    const onClick = async () => {
        try {
            let url = 'https://newsapi.org/v2/top-headlines?country=kr&apiKey=0e685893ce004fa5a0179c7b40ea044c';
            const response = await axios.get(url);
            setData(response.data);
        }catch(e) {
            console.log(e);
        }
    };
    return (
        <div>
            <div>
                <button onClick={onClick}>불러오기</button>
            </div>
            {data && <textarea rows={7} value={JSON.stringify(data, null, 2)} readOnly={true} />}
        </div>
    );*/

    // onSelect 방식 - 뉴스 카테고리, 리스트 페이지 렌더  
    /*const [category, setCategory] = useState('all');
    const onSelect = useCallback(category => setCategory(category), []);
    return (
        <>
            <Categories category={category} onSelect={onSelect} />
            <NewsList category={category} />
        </>
    );*/

    // 리액트 라우터 방식 
    return <Route path="/news/:category?" component={NewsPage} />;
};

export default App;