import React from "react";
import { connect } from "react-redux";
import { Segment, Menu } from "semantic-ui-react";
import {
	clearRunningDataItems,
	clearRunningDataColor,
	clearRunningDataConverter,
	clearRunningDataDType,
	clearRunningDataRoute,
	clearRunningDataTrain,
	loadRunningData,
	loadRunningMeta,
	loadSelectedRunningFields,
	focusCardItem,
	getRunningDataFields,
} from "../runningDataObservation/actions";
import { RUNNING_DATA_VIZ, AUTH } from "../main";
import { verifyAuthInfo } from "../authentication";
import "../font-effects/ZCOOLXiaoWei-Regular.css";

class Header extends React.Component {
	state = {
		runningDataActive: true,
		logoutActive: false,
	};

	onRunningDatatabClick = () => {
		if (!this.state.runningDataActive) {
			this.setState({ runningDataActive: true });
			this.props.history.push(RUNNING_DATA_VIZ);
		}
	};

	onLogoutClickHandler = () => {
		if (!this.state.logoutActive) {
			this.setState({ logoutActive: true });
			this.props.history.push(AUTH);
			this.props.verifyAuthInfo(false);
			this.dumpData();
		}
	};

	dumpData = () => {
		window.clearInterval(window.timer);
		this.props.clearRunningDataItems();
		this.props.clearRunningDataColor();
		this.props.clearRunningDataConverter();
		this.props.clearRunningDataDType();
		this.props.clearRunningDataRoute();
		this.props.clearRunningDataTrain();
		this.props.loadRunningData([]);
		this.props.loadRunningMeta(null);
		this.props.loadSelectedRunningFields([]);
		this.props.focusCardItem(null);
		this.props.getRunningDataFields([]);
	};

	render() {
		return (
			<Segment
				raised
				style={{
					height: this.props.offset.height * 0.8,
					padding: this.props.offset.height * 0.1,
					marginBottom: this.props.offset.height * 0.1,
				}}>
				<Menu
					secondary
					style={{
						height: this.props.offset.height * 0.6,
					}}>
					<Menu.Item
						name='运行数据'
						as='h4'
						style={{ fontFamily: "chinese_char_design" }}
						onClick={this.onRunningDatatabClick}
						active={this.state.runningDataActive}
					/>
					<Menu.Item
						name='状态信息'
						as='h4'
						style={{ fontFamily: "chinese_char_design" }}
					/>
					<Menu.Item
						name='分析结果'
						as='h4'
						style={{ fontFamily: "chinese_char_design" }}
					/>
					<Menu.Menu position='right'>
						<Menu.Item
							name='退出登录'
							as='h4'
							style={{ fontFamily: "chinese_char_design" }}
							onClick={this.onLogoutClickHandler}
							active={this.state.logoutActive}
						/>
					</Menu.Menu>
				</Menu>
			</Segment>
		);
	}
}

const mapStateToProps = (state) => {
	return { runningDataContainerOffset: state.runningDataContainerOffset };
};

export default connect(mapStateToProps, {
	verifyAuthInfo,
	clearRunningDataItems,
	clearRunningDataColor,
	clearRunningDataConverter,
	clearRunningDataDType,
	clearRunningDataRoute,
	clearRunningDataTrain,
	loadRunningData,
	loadRunningMeta,
	loadSelectedRunningFields,
	focusCardItem,
	getRunningDataFields,
})(Header);
