
import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';

import LifeCycleSample from './components/LifeCycleSample';
import ErrorBoundary from './components/ErrorBoundary';

import PropsTest from './components/Props';
import ChildrenTest from './components/Children';
import StateTest from './components/State';
import ClassTest from './components/Class';
import EventTest from './components/Event';
import RefTest from './components/REF';
import HookTest from './components/Hook';
import ImmerTest from './components/Immer';

import RouteTest from './components/Route';
import WithRouteTest from './components/WithRouter';
import SwitchTest from './components/Switch';

import CSSTest from './styles/CSS';
import CSSModuleTest from './styles/CSSModule';
import SassTest from './styles/Sass';
import StyledComponentsTest from './styles/StyledComponents';

//
const Box = styled.div`
	/* props 로 넣어 준 값을 직접 전달해 줄 수 있습니다. */
	margin: 10px;
	padding: 10px;
	border-bottom: 1px solid #ccc;
`;

// 랜덤 색상을 생성합니다.
function getRandomColor() {
	return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

class App extends Component {
	state = {
		color: '#000000'
	}

	handleClick = () => {
		this.setState({
			color: getRandomColor()
		})
	}

	render() {
		return (
			<>
				<Box>
					<h1>Props</h1>
					<PropsTest name="props" />
				</Box>
				<Box>
					<h1>Children</h1>
					<ChildrenTest>children</ChildrenTest>
				</Box>
				<Box>
					<h1>Class</h1>
					<ClassTest favoriteNumber={1} />
				</Box>
				<Box>
					<h1>State</h1>
					<StateTest />
				</Box>
				<Box>
					<h1>Event</h1>
					<EventTest />
				</Box>
				<Box>
					<h1>ref</h1>
					<RefTest />
				</Box>
				<Box>
					<h1>Hook</h1>
					<HookTest />
				</Box>
				<Box>
					<h1>Immer</h1>
					<ImmerTest />
				</Box>
				<Box>
					<h1>Route</h1>
					<BrowserRouter>
						<RouteTest />
						<WithRouteTest />
						<SwitchTest />
					</BrowserRouter>
				</Box>
				<Box>
					<h1>LifeCycle</h1>
					<button onClick={this.handleClick}>랜덤 색상</button>
					<ErrorBoundary>
						<LifeCycleSample color={this.state.color}/>
					</ErrorBoundary>
				</Box>

				<hr />
				
				<Box>
					<h1>CSS</h1>
					<CSSTest />
				</Box>
				<Box>
					<h1>CSS Module</h1>
					<CSSModuleTest />
				</Box>
				<Box>
					<h1>Scss</h1>
					<SassTest />
				</Box>
				<Box>
					<h1>StyledComponents</h1>
					<StyledComponentsTest />
				</Box>
			</>
		);
	}
}

export default App;