import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import NewsItem from './NewsItem';
import axios from 'axios';

const NewsListBlock = styled.div`
    box-sizing: border-box;
    padding-bottom: 3rem;
    width: 768px;
    margin: 0 auto;
    margin-top: 2rem;
    @media screen and (max-width: 768px) {
        width: 100%;
        padding-left: 1rem;
        padding-right: 1rem;
    }
`;

const sampleArticle = {
    title: '제목',
    description: '내용',
    url: 'https://google.com',
    urlToImage: 'https://via.placeholder.com/160',
};

const NewsList = ({ category }) => {
    const [articles, setArticles] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // async 를 사용하는 함수 따로 선언
        const fetchData = async () => {
            setLoading(true);
            try {
                let query = category === 'all' ? '' : `&category=${category};`
                let url = `https://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=0e685893ce004fa5a0179c7b40ea044c`;
                const response = await axios.get(url);
                console.log('news response', response);
                setArticles(response.data.articles);
            }catch(e) {
                console.log(e);
            }
            setLoading(false);
        };
        fetchData();
    }, [category]);

    if(loading) {
        return <NewsListBlock>대기중...</NewsListBlock>;
    }
    if(!articles) {
        return null;
    }
    return (
        <NewsListBlock>
            {articles.map(article => (
                <NewsItem key={article.url} article={article} />
            ))}
        </NewsListBlock>
    );
};

export default NewsList;