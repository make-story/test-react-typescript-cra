/*
커스텀 Hook 만들기 - 비동기 데이터 호출 로딩/에러/결과데이터
*/
import React, { useState, useEffect, } from 'react';

const useArticleApi = () => {
	const [articles, setArticles] = useState([]);
	const [isError, setIsError] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const getArticlesPromise = () => {
		return new Promise ((resolve, reject) => {
			setTimeout(() => {
				resolve([
					{id: 1, title: 'article title sample1'},
					{id: 2, title: 'article title sample2'},
					{id: 3, title: 'article title sample3'},
					{id: 4, title: 'article title sample4'},
					{id: 5, title: 'article title sample5'}
				]);
			}, 1000);
		});
	};

	// useEffect(async () => {  async 함수는 promise 객체를 리턴하기 때문에 useEffect 함수 자체를 async 함수로 사용할 수는 없다. useEffect 함수는 반드시 함수만을 리턴해야하기 때문 (2019년)
	useEffect(() => {
		const process = async () => {
			setIsError(false);
			setIsLoading(true);
			try {
				// 데이터 호출!
				const resolvedData = await getArticlesPromise();
				setArticles(resolvedData);
			}catch (error) {
				setIsError(true);
			}
			setIsLoading(false);
		}
		process();
	}, []);
	
	return [articles, isError, isLoading];
}

export default useArticleApi;