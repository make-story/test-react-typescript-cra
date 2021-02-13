import axios from 'axios';

const client = axios.create();

/*
-
설정값 우선순위 
인스턴스 호출 메서드 옵션 > 인스턴스.defaults 설정 옵션 > 인스턴스.create()에 설정된 옵션

-
axios 사용자 정의 인스턴스 기본 설정 예

const client = axios.create();

client.defaults.baseURL = 'https://api.example.com';
client.defaults.headers.common['Authorization'] = AUTH_TOKEN;
client.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// 요청 인터셉터 추가
client.interceptors.request.use(
	function (config) {
		// 요청을 보내기 전에 수행할 일
		// ...
		return config;
	},
	function (error) {
		// 오류 요청을 보내기전 수행할 일
		// ...
		return Promise.reject(error);
	}
);

// 응답 인터셉터 추가
client.interceptors.response.use(
	function (response) {
		// 응답 데이터를 가공
		// ...
		return response;
	},
	function (error) {
		// 오류 응답을 처리
		// ...
		return Promise.reject(error);
	}
);
*/

export default client;