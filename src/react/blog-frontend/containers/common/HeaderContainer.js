import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../../components/common/Header';
import { logout } from '../../modules/user';

const HeaderContainer = () => {
	const { user } = useSelector(({ user, /*각 스토어 list, loading, user 등*/}) => ({ user: user.user }));
	const dispatch = useDispatch();
	const onLogout = () => {
		// 디스패치
		dispatch(logout());
	};

	return <Header user={user} onLogout={onLogout} />;
};

export default HeaderContainer;