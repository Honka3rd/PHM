import React from "react";
import { connect } from "react-redux";
import { Segment } from "semantic-ui-react";
import ConfigListItem from "./configLeftItem";

class RunningDataLeftList extends React.Component {
	processRunningData = (dataframe) => {
		let lines = dataframe.split("\n");
		const header = lines[0].split(",");
		let result = [];
		for (let i = 4; i < lines.length; i++) {
			let obj = {};
			let currentline = lines[i].split(",");
			if (currentline.length > 1) {
				for (let j = 0; j < header.length; j++) {
					const val = parseFloat(currentline[j]);
					obj[header[j]] = isNaN(val) ? 0 : val;
				}
				result.push(obj);
			}
		}

		return result;
	};

	renderConfigTabItems = () => {
		return this.props.rightConfigList.map((item, index) => {
			return (
				<ConfigListItem
					key={index}
					id={index}
					item={item}
					processRunningData={this.processRunningData}
				/>
			);
		});
	};

	render() {
		return (
			<Segment
				style={{ maxHeight: this.props.offset.clientHeight, overflow: "auto" }}>
				{this.renderConfigTabItems()}
			</Segment>
		);
	}
}

const mapStateToProps = (state) => {
	// console.log(state.rightConfigList)
	return {
		rightConfigList: state.rightConfigList,
		runningDataFields: state.runningDataFields
	};
};

export default connect(mapStateToProps)(RunningDataLeftList);
