import React, { useEffect } from 'react';
import qs from 'qs';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PostList from '../../components/list/PostList';
import { listPosts } from '../../modules/posts';

const PostListContainer = ({ location }) => {
	const dispatch = useDispatch();
	const { posts, error, loading, user } = useSelector(({ posts, loading, user }) => ({
		posts: posts.posts,
		error: posts.error,
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