import React from "react";
import ConfigBase from "../configBarBaseItem";
import { connect } from "react-redux";
import { selectRunningDataConverter } from "../../../actions";

class ConverterSelection extends React.Component {
	componentType = "变流器";

	onChangeHandler = (value) => {
		const res = this.props.options.find((opt) => {
			return opt.value === value;
		});
		if (res) {
			this.props.selectRunningDataConverter(value);
		}
	}

	render() {
		return (
			<ConfigBase
				componentType={this.componentType}
				clientHeight={this.props.clientHeight}
				segmentPadding={this.props.segmentPadding}
				options={this.props.options}
				onChange={this.onChangeHandler}
				value={this.props.runningDataConverter}
			/>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		runningDataConverter: state.runningDataConverter,
	};
};

export default connect(mapStateToProps, { selectRunningDataConverter })(
	ConverterSelection
);
