import React from "react";
import ConfigBase from "../configBarBaseItem";
import { connect } from "react-redux";
import { selectRunningDataColor } from "../../../actions";
import { colorOptions } from "../../../constants";

class ColorSelection extends React.Component {
	componentType = "选取颜色(可多选)";

	onChangeHandler = (value) => {
		this.props.selectRunningDataColor(value);
	};

	render() {
		return (
			<ConfigBase
				componentType={this.componentType}
				clientHeight={this.props.clientHeight}
				segmentPadding={this.props.segmentPadding}
				options={colorOptions}
				onChange={this.onChangeHandler}
				multiple={true}
				value={this.props.runningDataColor}
			/>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		runningDataColor: state.runningDataColor,
	};
};

export default connect(mapStateToProps, { selectRunningDataColor })(
	ColorSelection
);
