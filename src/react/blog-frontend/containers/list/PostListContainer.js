import React, { useEffect } from 'react';
import qs from 'qs';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PostList from '../../components/list/PostList';
import { listPosts } from '../../modules/list';

const PostListContainer = ({ location }) => {
	const dispatch = useDispatch();
	const { posts, error, loading, user } = useSelector(({ list, loading, user, /*각 스토어 list, loading, user 등*/}) => ({
		posts: list.posts,
		error: list.error,
		loading: loading['list/LIST_POSTS'],
		user: user.user,
	}));

	useEffect(() => {
		// 브라우저 url 정보 
		const { tag, username, page } = qs.parse(location.search, {	
			ignoreQueryPrefix: true,
		});
		dispatch(listPosts({ tag, username, page }));
	}, [dispatch, location.search]);

	return (
		<PostList
			loading={loading}
			error={error}
			posts={posts}
			showWriteButton={user}
		/>
	);
};

export default withRouter(PostListContainer);