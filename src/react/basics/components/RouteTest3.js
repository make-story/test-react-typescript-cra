import React from 'react';
import { Link, Route } from 'react-router-dom';

const Profiles = () => {
	return (
		<div>
			<h3>사용자 목록</h3>
			<ul>
				<li>
					<Link to="/profiles/test1">test1</Link>
				</li>
				<li>
					<Link to="/profiles/test2">test2</Link>
				</li>
			</ul>
			서브 라우트
			<Route 
				path="/profiles"
				exact
				render={() => <div>사용자를 선택해 주세요.</div>}
			/>
		</div>
	);
};

export default Profiles;