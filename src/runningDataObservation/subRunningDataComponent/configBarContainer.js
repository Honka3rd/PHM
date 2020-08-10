import React from "react";
import { connect } from "react-redux";
import { Segment, Ref } from "semantic-ui-react";
import $ from "jquery";
import SelectColor from "./configBarSubComponent/highOrderBarItems/selectColor";
import SelectConverter from "./configBarSubComponent/highOrderBarItems/selectConverter";
import SelectDataType from "./configBarSubComponent/highOrderBarItems/selectDataType";
import SelectRoute from "./configBarSubComponent/highOrderBarItems/selectRoute";
import SelectTrain from "./configBarSubComponent/highOrderBarItems/selectTrain";
import ConfigSubmition from "./ConfigItemSubmition";
import { converterOptions, routeOptions, trainOptions } from "../constants";

class ConfigBarContainer extends React.Component {
	constructor(props) {
		super(props);
		this.contextRef = React.createRef();
	}

	state = {
		segmentPadding: 0,
	};

	componentDidMount() {
		this.setState({
			segmentPadding: parseFloat($(this.contextRef.current).css("padding")),
		});
	}

	render() {
		const offset = {
			clientHeight: this.props.runningDataContainerOffset.h * 0.1,
			clientWidth: this.props.runningDataContainerOffset.w,
		};
		return (
			<Segment.Group
				horizontal
				style={{
					marginTop: offset.clientHeight * 0.1,
					marginBottom: offset.clientHeight * 0.1,
					height: offset.clientHeight * 0.8,
					maxHeight: offset.clientHeight * 0.8,
				}}>
				<Segment>
					<SelectConverter
						clientHeight={offset.clientHeight * 0.8}
						segmentPadding={this.state.segmentPadding}
						options={converterOptions}
					/>
				</Segment>

				<Segment>
					<SelectRoute
						clientHeight={offset.clientHeight * 0.8}
						segmentPadding={this.state.segmentPadding}
						options={routeOptions}
					/>
				</Segment>
				<Segment>
					<SelectTrain
						clientHeight={offset.clientHeight * 0.8}
						segmentPadding={this.state.segmentPadding}
						options={trainOptions}
					/>
				</Segment>
				<Segment>
					<SelectDataType
						clientHeight={offset.clientHeight * 0.8}
						segmentPadding={this.state.segmentPadding}
					/>
				</Segment>
				<Ref innerRef={this.contextRef}>
					<Segment>
						<SelectColor
							clientHeight={offset.clientHeight * 0.8}
							segmentPadding={this.state.segmentPadding}
						/>
					</Segment>
				</Ref>
				<Segment>
					<ConfigSubmition
						clientHeight={offset.clientHeight * 0.8}
						segmentPadding={this.state.segmentPadding}
					/>
				</Segment>
			</Segment.Group>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		runningDataContainerOffset: state.runningDataContainerOffset,
	};
};

export default connect(mapStateToProps)(ConfigBarContainer);
