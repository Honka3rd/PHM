import React from "react";
import { Ref, Button } from "semantic-ui-react";
import $ from "jquery";
import "../../font-effects/ZCOOLXiaoWei-Regular.css";
import { connect } from "react-redux";
import {
	addNewRunningDataConfigItem,
	clearRunningDataColor,
	clearRunningDataDType,
	clearRunningDataConverter,
	clearRunningDataRoute,
	clearRunningDataTrain
} from "../actions";
import _ from "lodash";

class ConfigSubmition extends React.Component {
	constructor(props) {
		super(props);
		this.contextRef = React.createRef();
	}

	state = {
		buttonClientHeight: 0,
	};

	componentDidMount() {
		this.setState({
			buttonClientHeight: $(this.contextRef.current).outerHeight(true),
		});
	}

	arrayContainsSameElement = (curr, old) => {
		const same = curr.find((c, index) => {
			return c === old[index];
		});

		return same ? true : false;
	};

	checkObjValueDup = (obj, importantKey, list) => {
		if (!list.length) {
			return false;
		}

		let arrDup = false;
		let strDup = false;

		for (let elem of list) {
			for (let key in obj) {
				if (!elem[key]) {
					continue;
				}

				if ($.isArray(obj[key])) {
					if (this.arrayContainsSameElement(obj[key], elem[key])) {
						arrDup = true;
					}
				}

				if (key === importantKey) {
					if (obj[key] === elem[key]) {
						strDup = true;
					}
				}
			}
		}

		if (arrDup && strDup) {
			return true;
		}

		return false;
	};

	checkColorFieldsSameLen = (colors, fields) => {
		return colors.length === fields.length;
	};

	addNewConfigItem = () => {
		const {
			runningDataColor,
			runningDataConverter,
			runningDataDType,
			runningDataRoute,
			runningDataTrain,
			rightConfigList,
		} = this.props;

		const item = {
			runningDataColor,
			runningDataConverter,
			runningDataDType,
			runningDataRoute,
			runningDataTrain,
		};

		if (
			this.checkObjValueDup(
				_.omit(item, "runningDataColor"),
				"runningDataConverter",
				rightConfigList
			)
		) {
			return;
		}

		this.props.addNewRunningDataConfigItem(item);
		this.props.clearRunningDataColor();
		this.props.clearRunningDataDType();
		this.props.clearRunningDataConverter();
		this.props.clearRunningDataRoute();
		this.props.clearRunningDataTrain();
	};

	render() {
		const {
			runningDataColor,
			runningDataConverter,
			runningDataDType,
			runningDataRoute,
			runningDataTrain,
		} = this.props;

		const disableBtn =
			[
				runningDataColor,
				runningDataConverter,
				runningDataRoute,
				runningDataTrain,
			].some((element) => _.isNull(element)) ||
			!runningDataDType.length ||
			!this.checkColorFieldsSameLen(runningDataColor, runningDataDType);

		return (
			<Ref innerRef={this.contextRef}>
				<Button
					icon='add circle'
					content='添加该条目'
					fluid
					disabled={disableBtn}
					onClick={this.addNewConfigItem}
					style={{
						top:
							(this.props.clientHeight -
								2 * this.props.segmentPadding -
								this.state.buttonClientHeight) /
							2,
						position: "relative",
						fontFamily: "chinese_char_design",
					}}
				/>
			</Ref>
		);
	}
}

const mapStateToProps = ({
	runningDataColor,
	runningDataConverter,
	runningDataDType,
	runningDataRoute,
	runningDataTrain,
	rightConfigList,
}) => {
	return {
		runningDataColor,
		runningDataConverter,
		runningDataDType,
		runningDataRoute,
		runningDataTrain,
		rightConfigList,
	};
};

export default connect(mapStateToProps, {
	addNewRunningDataConfigItem,
	clearRunningDataColor,
	clearRunningDataDType,
	clearRunningDataConverter,
	clearRunningDataRoute,
	clearRunningDataTrain
})(ConfigSubmition);
