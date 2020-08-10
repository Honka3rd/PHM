import React from "react";
import { Dropdown, Ref } from "semantic-ui-react";
import { connect } from "react-redux";
import $ from "jquery";
import "../../../font-effects/ZCOOLXiaoWei-Regular.css";
import "../../../font-effects/AnticSlab-Regular.css";

class ConfigBase extends React.Component {
	constructor(props) {
		super(props);
		this.contextRef = React.createRef();
	}

	state = {
		dropDownClientHeight: 0,
	};

	componentDidMount() {
		this.setState({
			dropDownClientHeight: $(this.contextRef.current).outerHeight(true),
		});
	}

	onChangeHandler = (e, { value }) => {
		this.props.onChange(value);
	};

	render() {
		return (
			<Ref innerRef={this.contextRef}>
				<Dropdown
					style={{
						top:
							(this.props.clientHeight -
								2 * this.props.segmentPadding -
								this.state.dropDownClientHeight) /
							2,
						fontFamily: "chinese_char_design, en_char_design",
					}}
					multiple={this.props.multiple ? true : false}
					floating
					fluid
					options={this.props.options}
					onChange={this.onChangeHandler}
					value={this.props.value}
					search
					selection
					placeholder={`选择${this.props.componentType}`}
					noResultsMessage={`暂无${this.props.componentType}`}
				/>
			</Ref>
		);
	}
}

export default connect()(ConfigBase);
