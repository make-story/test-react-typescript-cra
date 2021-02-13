import React from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import PostListContainer from '../containers/list/PostListContainer';
import PaginationContainer from '../containers/list/PaginationContainer';

const PostListPage = () => {
	return (
		<>
			<HeaderContainer />
			<PostListContainer />
			<PaginationContainer />
		</>
	);
};

export default PostListPage;