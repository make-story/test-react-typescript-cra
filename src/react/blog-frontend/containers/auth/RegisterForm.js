import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initializeForm, register } from '../../modules/auth';
import AuthForm from '../../components/auth/AuthForm';
import { check } from '../../modules/user';
import { withRouter } from 'react-router-dom'; // 히스토리 관리 

const RegisterForm = ({ history }) => {
	const [error, setError] = useState(null);
	const dispatch = useDispatch();
	const { form, auth, authError, user } = useSelector(({ auth, user /*각 스토어 list, loading, user 등*/}) => {
		return {
			form: auth.register,
			auth: auth.auth,
			authError: auth.authError,
			user: user.user,
		};
	});

	// 인풋 변경 이벤트 핸들러
	const onChange = event => {
		const { value, name } = event.target;
		console.log(`value: ${value}, name: ${name}`);

		// 디스패치
		dispatch(changeField({
			form: 'register',
			key: name,
			value,
		}));
	};

	// 폼 등록 이벤트 핸들러
	const onSubmit = event => {
		event.preventDefault();

		const { username, password, passwordConfirm } = form;

		// 하나라도 비어있다면
		if([username, password, passwordConfirm].includes('')) {
			//alert('값 비어있음');
			setError('빈 칸을 모두 입력하세요.');
			return;
		}
		
		// 비밀번호가 일치하지 않는다면
		if(password !== passwordConfirm) {
			//alert('비밀번호가 일치하지 않습니다.');
			setError('비밀번호가 일치하지 않습니다.');

			// 디스패치
			dispatch(changeField({ form: 'register', key: 'password', value: '' }));
			dispatch(changeField({ form: 'register', key: 'passwordConfirm', value: '' }));
			return;
		}

		// 디스패치
		dispatch(register({ username, password }));
	};

	// 컴포넌트가 처음 렌더링될 때 form을 초기화함
	useEffect(() => {
		// 디스패치
		dispatch(initializeForm('rigister'));
	}, [dispatch]);

	// 회원가입 성공 / 실패 처리
	useEffect(() => {
		if(authError) {
			console.log('회원가입 실패');
			console.log(authError);
			setError('회원가입 실패');
			return;
		}
	
		if(auth) {
			console.log('회원가입 성공');
			console.log(auth);

			// 디스패치
			dispatch(check());
		}
	}, [auth, authError, dispatch]);

	// user 값이 잘 설정되었는지 확인
	useEffect(() => {
		if(user) {
			console.log('check API 성공');
			console.log(user);
			history.push('/'); // 홈 화면으로 이동
			try {
				localStorage.setItem('user', JSON.stringify(user));
			}catch (e) {
				console.log('localStorage is not working');
			}
		}
	}, [history, user]);

	return (
		<AuthForm type="register" form={form} onChange={onChange} onSubmit={onSubmit} error={error} />
	);
};

export default withRouter(RegisterForm);