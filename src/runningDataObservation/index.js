import React from "react";
import { connect } from "react-redux";
import { Grid, Header } from "semantic-ui-react";
import RunningDataHistRightBar from "./subRunningDataComponent/configHistRightBar";
import RunningDataLeftList from "./subRunningDataComponent/configLeftList";
import RunningDataVizPannel from "./subRunningDataComponent/runningDataVizualisation";
import ConfigBarContainer from "./subRunningDataComponent/configBarContainer";

class RunningDataVizContainer extends React.Component {
	render() {
		if (!this.props.verified) {
			return <Header>404 not found</Header>;
		}

		const offset = {
			clientHeight: this.props.runningDataContainerOffset.h * 0.8,
			clientWidth: this.props.runningDataContainerOffset.w,
		};
		return [
			<ConfigBarContainer key={0} />,
			<Grid
				key={1}
				columns={3}
				divided
				style={{ border: "1px solid rgba(34,36,38,0)" }}>
				<Grid.Row
					stretched
					style={{
						height: offset.clientHeight * 0.8,
						maxHeight: offset.clientHeight * 0.8,
						paddingTop: this.props.runningDataContainerOffset.h * 0.01,
						paddingBottom: 0,
					}}>
					<Grid.Column width={3}>
						<RunningDataLeftList
							offset={{ clientHeight: offset.clientHeight * 0.8 }}
						/>
					</Grid.Column>
					<Grid.Column width={10}>
						<RunningDataVizPannel
							offset={{ clientHeight: offset.clientHeight * 0.8 }}
						/>
					</Grid.Column>
					<Grid.Column width={3}>
						<RunningDataHistRightBar
							offset={{ clientHeight: offset.clientHeight * 0.8 }}
						/>
					</Grid.Column>
				</Grid.Row>
			</Grid>,
		];
	}
}

const mapStateToProps = (state) => {
	return {
		runningDataContainerOffset: state.runningDataContainerOffset,
		verified: state.verified,
	};
};

export default connect(mapStateToProps)(RunningDataVizContainer);
