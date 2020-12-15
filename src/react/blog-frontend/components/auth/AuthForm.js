import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import palette from '../../lib/styles/palette';
import Button from '../common/Button';
/**
 * 회원가입 또는 로그인 폼을 보여줍니다.
 */

// 각 컴포넌트의 최상위 컴포넌트를 선언할 때 이름 뒤에 Block 이라는 단어를 붙여 줍니다. (일부 책 설명)
// styled-components 를 사용할 때 꼭 Block 이 아니라도 Warpper 이라는 단어를 붙이거나,
// 또는 이름 앞에 Styled 라는 단어를 붙이기도 합니다. (StyledAuthFrom)
const AuthFormBlock = styled.div`
	h3 {
		margin: 0;
		color: ${palette.gray[8]};
		margin-bottom: 1rem;
	}
`;

/*
스타일링된 input
*/
const StyledInput = styled.input`
	font-size: 1rem;
	border: none;
	border-bottom: 1px solid ${palette.gray[5]};
	padding-bottom: 0.5rem;
	outline: none;
	width: 100%;
	&:focus {
		color: $oc-teal-7;
		border-bottom: 1px solid ${palette.gray[7]};
	}
	& + & {
		margin-top: 1rem;
	}
`;

/*
폼 하단에 로그인 혹은 회원가입 링크를 보여 줌
*/
const Footer = styled.div`
	margin-top: 2rem;
	text-align: right;
	a {
		color: ${palette.gray[6]};
		text-decoration: underline;
		&:hover {
			color: ${palette.gray[9]};
		}
	}
`;

/*
styled 함수를 사용하여 새로운 컴포넌트 이름 정의
*/
const ButtonWithMarginTop = styled(Button)`
	margin-top: 1rem;
`;

// type props 에 따르 사용되는 문구 처리
const textMap = {
	login: '로그인',
	register: '회원가입',
};

/*
에러를 보여 줍니다.
*/
const ErrorMessage = styled.div`
	color: red;
	text-align: center;
	font-size: 0.875rem;
	margin-top: 1rem;
`;

const AuthForm = ({ type, form, onChange, onSubmit, error }) => {
	const text = textMap[type];
	return (
		<AuthFormBlock>
			<h3>{text}</h3>
			<form onSubmit={onSubmit}>
				<StyledInput 
					autoComplete="username" 
					name="username" 
					placeholder="아이디" 
					onChange={onChange}
					value={form.username}
				/>
				<StyledInput
					 autoComplete="new-password"
					 name="password"
					 placeholder="비밀번호"
					 type="password"
					 onChange={onChange}
					 value={form.password}
				/>
				{type === 'register' && (
					<StyledInput
						autoComplete="new-password"
						name="passwordConfirm"
						placeholder="비밀번호 확인"
						type="password"
						onChange={onChange}
						value={form.passwordConfirm}
					/>
				)}
				{error && <ErrorMessage>{error}</ErrorMessage>}
				<ButtonWithMarginTop cyan={true} fullWidth={true} style={{ marginTop: '1rem' }}>
					로그인
				</ButtonWithMarginTop>
			</form>
			<Footer>
				{type === 'login' ? (
					<Link to="/register">회원가입</Link>
				) : (
					<Link to="/login">로그인</Link>	
				)}
			</Footer>
		</AuthFormBlock>
	);
};

export default AuthForm;