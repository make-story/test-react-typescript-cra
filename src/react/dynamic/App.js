import React, { Component } from 'react';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './components/Home';
import DynamicPage from './components/DynamicPage';
import NoMatch from './components/NoMatch';
import './index.css';

const App = () => {
	return (
		<Router>
			<div>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route exact path="/dynamic" component={DynamicPage} />
					<Route component={NoMatch} />
				</Switch>
			</div>
		</Router>
	);
};

export default App;