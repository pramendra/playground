import React, { Component } from "react";
import {
	ReactiveBase,
	DataController,
	ResultCard,
	AppbaseSensorHelper as helper
} from "@appbaseio/reactivesearch";

export default class DataControllerRSDefault extends Component {
	constructor(props) {
		super(props);
		this.onData = this.onData.bind(this);
		this.customQuery = this.customQuery.bind(this);
	}

	componentDidMount() {
		helper.ResponsiveStory();
	}

	customQuery(value) {
		return {
			query: {
				match_all: {}
			}
		};
	}

	onData(res) {
		const result = {
			image: "https://www.enterprise.com/content/dam/global-vehicle-images/cars/FORD_FOCU_2012-1.png",
			title: res.name,
			rating: res.rating,
			desc: res.brand,
			url: "#"
		};
		return result;
	}

	render() {
		return (
			<ReactiveBase
				app="car-store"
				credentials="cf7QByt5e:d2d60548-82a9-43cc-8b40-93cbbe75c34c"
			>
				<div className="row">
					<div className="col s6 col-xs-6">
						<DataController
							componentId="CustomSensor"
							appbaseField="name"
							customQuery={this.customQuery}
							{...this.props}
						/>
					</div>

					<div className="col s6 col-xs-6">
						<ResultCard
							componentId="SearchResult"
							appbaseField="name"
							title="Results"
							from={0}
							size={20}
							onData={this.onData}
							react={{
								and: "CustomSensor"
							}}
						/>
					</div>
				</div>
			</ReactiveBase>
		);
	}
}
