import React from "react";
import { connect } from "react-redux";
import { Card, Icon, Transition, Ref } from "semantic-ui-react";
import $ from "jquery";
import "../../font-effects/ZCOOLXiaoWei-Regular.css";
import "../../font-effects/AnticSlab-Regular.css";
import {
	loadRunningData,
	loadSelectedRunningFields,
	loadRunningMeta,
	removeSingleItemRunningData,
	focusCardItem,
} from "../actions";

class RunningDataLeftItem extends React.Component {
	closeIconRef = React.createRef();
	state = {
		cardVisable: false,
		animeDirection: "fade right",
		clickAim: null,
	};

	componentDidMount() {
		this.setState({ cardVisable: false });
		const delay = window.setTimeout(() => {
			this.setState({ cardVisable: true });
			window.clearTimeout(delay);
		}, 0);
	}

	componentDidUpdate(preProps, preState) {
		if (
			preState.clickAim !== this.state.clickAim &&
			this.state.clickAim === "remove"
		) {
			if (this.props.id === this.props.cardItemId) {
				this.props.loadRunningData([]);
				this.stop();
				this.props.focusCardItem(null);
			}
			this.props.removeSingleItemRunningData(this.props.item);
		}
	}

	realTimeLoad = (data) => {
		const processed = this.props.processRunningData(data);

		const rowEachFrame = 10;

		const leftLen = processed.length % rowEachFrame;
		const wholeLen = processed.length - leftLen;

		const frame = 2000;
		const duration = leftLen
			? (wholeLen / rowEachFrame) * 1000 + 1000
			: (wholeLen / rowEachFrame) * 1000;

		window.timer = null;

		const time = { ms: 0 };
		run(time, this.props);
		window.timer = window.setInterval(() => {
			if (time.ms >= duration) {
				this.stop();
			}

			run(time, this.props);
		}, frame);

		function run(time, props) {
			let index = (time.ms * rowEachFrame) / frame;
			props.loadRunningData(processed.slice(index, index + rowEachFrame));

			const mile = time.ms;

			time.ms = mile + frame;
		}
	};

	stop = () => {
		window.clearInterval(window.timer);
		window.timer = null;
	};

	asyncLoadRemoteData = () => {
		this.stop();
		$.ajax({
			url: "./r1-4.csv",
			success: (data) => {
				this.realTimeLoad(data);
				this.props.loadSelectedRunningFields(this.props.item.runningDataDType);
			},
		});
	};

	removeTabHandler = (e) => {
		e.stopPropagation();
		if (e.target === this.closeIconRef.current) {
			this.setState({ clickAim: "remove" });
		}
	};

	onCardClickHandler = () => {
		this.props.focusCardItem(this.props.id);
		this.setState({ clickAim: "load" });
		const {
			runningDataColor,
			runningDataConverter,
			runningDataRoute,
			runningDataTrain,
		} = this.props.item;
		this.props.loadRunningMeta({
			cardId: this.props.id, 
			runningDataColor,
			runningDataConverter,
			runningDataRoute,
			runningDataTrain,
		});
		this.asyncLoadRemoteData();
	};

	renderCardInnerContents = () => {
		const { runningDataDType, runningDataColor } = this.props.item;
		return runningDataColor.map((color, index) => {
			return (
				<Card.Content key={index} style={{ color, opacity: 0.8 }}>
					{runningDataDType[index]}
				</Card.Content>
			);
		});
	};

	render() {
		const {
			runningDataConverter,
			runningDataRoute,
			runningDataTrain,
		} = this.props.item;
		return (
			<Transition
				visible={this.state.cardVisable}
				duration={300}
				animation={this.state.animeDirection}>
				<Card
					link
					onClick={this.onCardClickHandler}
					style={{
						fontFamily: "chinese_char_design, en_char_design",
						cursor: "pointer",
						overflow: "auto",
						backgroundColor:
							this.props.id === this.props.cardItemId
								? "rgba(0,0,0,.03)"
								: "white",
					}}>
					<Card.Content>
						<Ref innerRef={this.closeIconRef}>
							<Icon
								name='window close'
								color="grey"
								style={{ position: "absolute", right: 0, opacity: 0.65 }}
								onClick={this.removeTabHandler}
							/>
						</Ref>

						<Card.Header>
							<span
								style={{
									opacity: 0.65,
									fontFamily: "chinese_char_design, en_char_design",
								}}>
								{runningDataConverter}变流器
							</span>
						</Card.Header>
						<Card.Meta content={`线路：${runningDataRoute}`} />
						<Card.Meta content={`列车：${runningDataTrain}`} />
						<Card.Description>
							{this.renderCardInnerContents()}
						</Card.Description>
					</Card.Content>
				</Card>
			</Transition>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		cardItemId: state.cardItemId,
	};
};

export default connect(mapStateToProps, {
	loadRunningData,
	loadSelectedRunningFields,
	loadRunningMeta,
	removeSingleItemRunningData,
	focusCardItem,
})(RunningDataLeftItem);
