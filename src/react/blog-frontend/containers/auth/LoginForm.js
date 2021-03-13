import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { changeField, initializeForm, login } from '../../modules/auth';
import AuthForm from '../../components/auth/AuthForm';
import { check } from '../../modules/user';

const LoginForm = ({ history }) => {
	const [error, setError] = useState(null);
	const dispatch = useDispatch();
	const { form, auth, authError, user } = useSelector(({ auth, user /*각 스토어 list, loading, user 등*/}) => ({
		form: auth.login,
		auth: auth.auth,
		authError: auth.authError,
		user: user.user,
	}));

	// 인풋 변경 이벤트 핸들러
	const onChange = event => {
		const { value, name } = event.target;

		// 디스패치
		dispatch(changeField({
			form: 'login',
			key: name,
			value,
		}));
	};

	// 폼 등록 이벤트 핸들러
	const onSubmit = event => {
		event.preventDefault();
		const { username, password } = form;

		// 디스패치
		dispatch(login({ username, password }));
	};

	// 컴포넌트가 처음 렌더링 될 때 form 을 초기화함
	useEffect(() => {
		// 디스패치
		dispatch(initializeForm('login'));
	}, [dispatch]);

	useEffect(() => {
		if(authError) {
			console.log('오류 발생');
			console.log(authError);
			setError('로그인 실패');
			return;
		}
		if(auth) {
			console.log('로그인 성공');

			// 디스패치
			dispatch(check());
		}
	}, [auth, authError, dispatch]);

	useEffect(() => {
		if(user) {
			history.push('/');
			try {
				localStorage.setItem('user', JSON.stringify(user));
			}catch (e) {
				console.log('localStorage is not working');
			}
		}
	}, [history, user]);

	return (
		<AuthForm type="login" form={form} onChange={onChange} onSubmit={onSubmit} error={error} />
	);
};

export default withRouter(LoginForm);