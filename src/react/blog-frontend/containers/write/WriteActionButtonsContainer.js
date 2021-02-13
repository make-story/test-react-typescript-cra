import React, { useEffect } from 'react';
import WriteActionButtons from '../../components/write/WriteActionButtons';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { writePost, updatePost } from '../../modules/write';

const WriteActionButtonsContainer = ({ history }) => {
	const dispatch = useDispatch();
	const { title, body, tags, post, postError, originalPostId } = useSelector(({ write }) => ({
		title: write.title,
		body: write.body,
		tags: write.tags,
		post: write.post,
		postError: write.postError,
		originalPostId: write.originalPostId,
	}));

	// 포스트 등록
	// 포스트 등록 버튼을 클릭하면, 현재 리덕스 스토어 안에 들어 있는 값을 사용하여 새 포스트를 작성합니다.
	const onPublish = () => {
		// 수정
		if(originalPostId) {
			dispatch(updatePost({ title, body, tags, id: originalPostId }));
			return;
		}
		// 등록
		dispatch(writePost({
			title,
			body,
			tags,
		}));
	};

	// 취소
	const onCancel = () => {
		history.goBack();
	};

	// 성공 혹은 실패시 할 작업
	useEffect(() => {
		if(post) {
			const { _id, user } = post;
			history.push(`/@${user.username}/${_id}`);
		}
		if(postError) {
			console.log(postError);
		}
	}, [history, post, postError]);

	return (
		<WriteActionButtons
			onPublish={onPublish}
			onCancel={onCancel}
			isEdit={!!originalPostId}
		/>
	);
};

export default withRouter(WriteActionButtonsContainer);