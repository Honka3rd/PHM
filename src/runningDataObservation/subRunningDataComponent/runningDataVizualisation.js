import React from "react";
import { connect } from "react-redux";
import { Segment, Ref } from "semantic-ui-react";
import $ from "jquery";
import * as D3 from "d3";

class RunningDataVizPannel extends React.Component {
	contextRef = React.createRef();

	svg = "running_data_virsualization";
	x = "Time";

	extractRowAndColumns = (row, cols, fullData, selectedCols, dataset) => {
		for (let d of dataset) {
			let o = {};
			let full = {};
			for (let key in d) {
				if (key === this.x) {
					row.push(d[key]);
				}

				if (["Time", ...selectedCols].indexOf(key) !== -1) {
					full[key] = d[key];
				}

				if (selectedCols.indexOf(key) !== -1) {
					o[key] = d[key];
				}
			}
			cols.push(o);
			fullData.push(full);
		}
	};

	valueExtension = (selectedCols) => {
		const valueList = [];
		for (let o of selectedCols) {
			for (let key in o) {
				valueList.push(o[key]);
			}
		}

		return D3.extent(valueList);
	};

	createAndUpdateAxis = (xAxis, yAxis) => {
		const svg = D3.select(`#${this.svg}`);
		const x = $("#xAxis")[0];
		if (x) {
			D3.select("#xAxis").transition().duration(500).call(xAxis);
		} else {
			svg
				.append("g")
				.attr("id", "xAxis")
				.attr("class", "axis")
				.attr("transform", `translate(0, ${this.state.svgClientHeight * 0.95})`)
				.transition()
				.duration(2000)
				.call(xAxis);
		}

		const y = $("#yAxis")[0];
		if (y) {
			D3.select("#yAxis").transition().duration(500).call(yAxis);
		} else {
			svg
				.append("g")
				.attr("id", "yAxis")
				.attr("class", "axis")
				.attr("transform", `translate(${this.state.svgClientWidth * 0.045}, 0)`)
				.transition()
				.duration(2000)
				.call(yAxis);
		}
	};

	lineClasses = {};

	depictChartBody = (data, selectedCols, xScale, yScale, meta) => {
		const timelineScale = (d) => xScale(d.Time);
		const valueScales = [];
		for (let field of selectedCols) {
			valueScales.push((d) => yScale(d[field]));
		}

		let index = 0;
		for (let fieldScale of valueScales) {
			const valLine = D3.line()
				.x(timelineScale)
				.y(fieldScale)
				.curve(D3.curveBasis);

			const lineClass = `curve_${meta.cardId}_${index}`;
			this.lineClasses[lineClass] = lineClass;

			const line = D3.select(`#${this.svg}`)
				.selectAll(`.${lineClass}`)
				.data(data);

			line
				.enter()
				.append("path")
				.attr("class", lineClass)
				.merge(line)
				.transition()
				.duration(2000)
				.attr("d", valLine(data))
				.attr("fill", "none")
				.attr("stroke", meta.runningDataColor[index])
				.attr("stroke-width", 1)
				.style("opacity", 0.8);

			index++;
		}
	};

	visualizeRunningData = (dataset, selectedCols, meta) => {
		const xScale = D3.scaleLinear()
			.domain(D3.extent(dataset, (d) => d[this.x]))
			.range([
				this.state.svgClientWidth * 0.05,
				this.state.svgClientWidth * 0.95,
			]);

		const xs = [];
		const extractedVal = [];
		const fullData = [];

		this.extractRowAndColumns(
			xs,
			extractedVal,
			fullData,
			selectedCols,
			dataset
		);

		const yScale = D3.scaleLinear()
			.domain(this.valueExtension(extractedVal))
			.range([
				this.state.svgClientHeight * 0.95,
				this.state.svgClientHeight * 0.05,
			]);

		const xAxis = D3.axisBottom().scale(xScale).tickValues(xs);
		const yAxis = D3.axisLeft().scale(yScale).ticks(10);

		this.createAndUpdateAxis(xAxis, yAxis);
		this.depictChartBody(fullData, selectedCols, xScale, yScale, meta);
	};

	cleanUpChart = () => {
		const $svg = $(`#${this.svg}`);
		if ($svg.children().first()[0]) {
			$svg.empty();
		}
	};

	state = {
		chartClientHeight: 0,
		chartClientWidth: 0,
	};

	componentDidMount() {
		this.setState({
			chartClientHeight: $(this.contextRef.current).outerHeight(true),
			chartClientWidth: $(this.contextRef.current).outerWidth(true),
			svgClientHeight: $(this.contextRef.current).height(),
			svgClientWidth: $(this.contextRef.current).width(),
		});
	}

	componentDidUpdate(preProps) {
		if (
			this.props.runningDataSet.length &&
			this.props.selectedRunningFields.length &&
			this.props.runningMeta
		) {
			if (this.props.runningMeta !== preProps.runningMeta) {
				D3.select(`#${this.svg}`).selectAll("path").remove();
			}
			this.visualizeRunningData(
				this.props.runningDataSet,
				this.props.selectedRunningFields,
				this.props.runningMeta
			);
		} else {
			this.cleanUpChart();
		}
	}

	render() {
		return (
			<Ref innerRef={this.contextRef}>
				<Segment
					style={{
						maxHeight: this.props.offset.clientHeight,
						overflow: "auto",
					}}>
					<svg
						id={this.svg}
						width={this.state.svgClientWidth}
						height={this.state.svgClientHeight}></svg>
				</Segment>
			</Ref>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		runningDataSet: state.runningDataSet,
		selectedRunningFields: state.selectedRunningFields,
		runningMeta: state.runningMeta,
		cardItemId: state.cardItemId,
	};
};

export default connect(mapStateToProps)(RunningDataVizPannel);
