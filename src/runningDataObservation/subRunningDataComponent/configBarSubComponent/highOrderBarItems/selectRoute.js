import React from "react";
import ConfigBase from "../configBarBaseItem";
import { connect } from "react-redux";
import { selectRunningDataRoute } from "../../../actions";

class RouteSelection extends React.Component {
	componentType = "线路";

	onChangeHandler = (value) => {
		const res = this.props.options.find((opt) => {
			return opt.value === value;
		});
		if (res) {
			this.props.selectRunningDataRoute(value);
		}
	};

	render() {
		return (
			<ConfigBase
				componentType={this.componentType}
				clientHeight={this.props.clientHeight}
				segmentPadding={this.props.segmentPadding}
				options={this.props.options}
				onChange={this.onChangeHandler}
				value={this.props.runningDataRoute}
			/>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		runningDataRoute: state.runningDataRoute,
	};
};

export default connect(mapStateToProps, { selectRunningDataRoute })(
	RouteSelection
);
