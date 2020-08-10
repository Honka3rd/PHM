import React from "react";
import ConfigBase from "../configBarBaseItem";
import { connect } from "react-redux";
import $ from "jquery";
import { selectRunningDataDType, getRunningDataFields } from "../../../actions";

class DataTypeSelection extends React.Component {
	componentType = "选取变量(可多选)";

	state = {
		dataFieldOptions: [],
	};

	componentDidUpdate(preProps) {
		if (preProps.runningDataFields !== this.props.runningDataFields) {
			if (this.props.runningDataFields.length) {
				const fields = [];
				let index = 0;
				for (let field of this.props.runningDataFields) {
					fields.push({ key: index, value: field, text: field });
					index++;
				}
				this.setState({ dataFieldOptions: fields });
			}
		}
	}

	asyncLoadDataFields = () => {
		$.ajax({
			url: "./r1-4.csv",
			success: (data) => {
				const header = data.split("\n")[0].split(",");
				header.splice(header.indexOf("Time"), 1);
				this.props.getRunningDataFields(header);
			},
		});
	};

	onChangeHandler = (values) => {
		this.props.selectRunningDataDType(values);
	};

	componentDidMount() {
		this.asyncLoadDataFields();
	}

	render() {
		return (
			<ConfigBase
				componentType={this.componentType}
				clientHeight={this.props.clientHeight}
				segmentPadding={this.props.segmentPadding}
				options={this.state.dataFieldOptions}
				onChange={this.onChangeHandler}
				multiple={true}
				value={this.props.runningDataDType}
			/>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		runningDataFields: state.runningDataFields,
		runningDataDType: state.runningDataDType,
	};
};

export default connect(mapStateToProps, {
	selectRunningDataDType,
	getRunningDataFields,
})(DataTypeSelection);
