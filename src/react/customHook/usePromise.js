import { useState, useEffect } from 'react';

export default function usePromise(promiseTarget, dependence=[]) {
	const [loading, setLoading] = useState(false);
	const [resolve, setResolve] = useState(null); // 정상
	const [reject, setReject] = useState(null); // 에러

	useEffect(() => {
		const process = async () => {
			// 로딩상태 변경
			setLoading(true);
			// 실행
			try {
				const result = await promiseTarget();
				setResolve(result);
			}catch (error) {
				setReject(error);
			}
			// 로딩상태 변경
			setLoading(false);
		};
		process();
	}, dependence);

	return [loading, resolve, reject];
};

/*
-
사용 예

const [loading, response, error] = usePromise(() => {
	return axios.get('url');
}, [category]);
*/