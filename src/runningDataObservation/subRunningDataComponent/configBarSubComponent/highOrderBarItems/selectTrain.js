import React from "react";
import ConfigBase from "../configBarBaseItem";
import { connect } from "react-redux";
import { selectRunningDataTrain } from "../../../actions";

class TrainSelection extends React.Component {
	componentType = "列车";

	onChangeHandler = (value) => {
		const res = this.props.options.find((opt) => {
			return opt.value === value;
		});
		if (res) {
			this.props.selectRunningDataTrain(value);
		}
	};

	render() {
		return (
			<ConfigBase
				componentType={this.componentType}
				clientHeight={this.props.clientHeight}
				segmentPadding={this.props.segmentPadding}
				options={this.props.options}
				onChange={this.props.selectRunningDataTrain}
				value={this.props.runningDataTrain}
			/>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		runningDataTrain: state.runningDataTrain,
	};
};

export default connect(mapStateToProps, { selectRunningDataTrain })(
	TrainSelection
);
