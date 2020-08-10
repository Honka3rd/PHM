import React from "react";
import { connect } from "react-redux";
import { Route, Router } from "react-router-dom";
import Authentication from "./authentication";
import RunningDataVizContainer from "./runningDataObservation";
import history from "./history";
import Header from "./header";

const DETECT_PANNEL_OFFSET = "DETECT_PANNEL_OFFSET";
export const AUTH = "/";
export const RUNNING_DATA_VIZ = "/RUNNING_DATA_VIZ";
export const VERIFY_LOGIN_INFO = "VERIFY_LOGIN_INFO";

const detectRunningDataContainerOffset = (offset) => {
	return {
		type: DETECT_PANNEL_OFFSET,
		payload: offset,
	};
};

export const runningDataContainerOffset = (state = { w: 0, h: 0 }, action) => {
	if (action.type === DETECT_PANNEL_OFFSET) {
		return action.payload;
	}

	return state;
};

class Main extends React.Component {
	componentDidMount() {
		this.props.detectRunningDataContainerOffset({
			w: window.outerWidth,
			h: window.outerHeight,
		});
	}

	renderHeader = () => {
		if (!this.props.verified) {
			return null;
		}

		return (
			<Header
				key={0}
				history={history}
				offset={{
					height: this.props.runningDataContainerOffset.h * 0.1,
					width: this.props.runningDataContainerOffset.w,
				}}
			/>
		);
	};

	render() {
		return [
			this.renderHeader(),
			<Router history={history} key={1}>
				<Route path={AUTH} exact component={Authentication}></Route>
				<Route
					path={RUNNING_DATA_VIZ}
					exact
					component={RunningDataVizContainer}></Route>
			</Router>,
		];
	}
}

const mapStateToProps = (state) => {
	return {
		runningDataContainerOffset: state.runningDataContainerOffset,
		verified: state.verified,
	};
};

export default connect(mapStateToProps, { detectRunningDataContainerOffset })(
	Main
);
