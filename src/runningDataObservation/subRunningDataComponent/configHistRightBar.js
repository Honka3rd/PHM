import React from "react";
import { connect } from "react-redux";
import { Segment } from "semantic-ui-react";

class RunningDataHistRightBar extends React.Component {
	render() {
		const clientHeight = this.props.offset.clientHeight;
		return (
			<Segment
				style={{
					height: clientHeight * 0.95,
					maxHeight: clientHeight,
                    paddingTop: clientHeight * 0.025,
                    paddingBottom: clientHeight * 0.025,
				}}></Segment>
		);
	}
}

export default connect()(RunningDataHistRightBar);
