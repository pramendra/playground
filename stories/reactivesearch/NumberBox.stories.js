import React, { Component } from "react";
import {
	ReactiveBase,
	ResultCard,
	NumberBox,
	AppbaseSensorHelper as helper
} from "@appbaseio/reactivesearch";

export default class NumberBoxRSDefault extends Component {
	constructor(props) {
		super(props);
		this.onData = this.onData.bind(this);
	}

	componentDidMount() {
		helper.ResponsiveStory();
	}

	onData(res) {
		return {
			image: res.image,
			title: res.name,
			desc: (
				<div>
					<div className="price">${res.price}</div>
					<span className="host" style={{"backgroundImage": `url(${res.host_image})`}}></span>
					<p>{res.room_type} · {res.accommodates} guests</p>
				</div>
			),
			url: res.listing_url
		};
	}

	render() {
		return (
			<ReactiveBase
				app="housing"
				credentials="0aL1X5Vts:1ee67be1-9195-4f4b-bd4f-a91cd1b5e4b5"
				type="listing"
				theme="rbc-red"
			>
				<div className="row">
					<div className="col s6 col-xs-6">
						<NumberBox
							componentId="GuestSensor"
							appbaseField="accommodates"
							title="Guests"
							{...this.props}
						/>
					</div>

					<div className="col s6 col-xs-6">
						<ResultCard
							componentId="SearchResult"
							appbaseField="name"
							from={0}
							size={40}
							onData={this.onData}
							showPagination={true}
							react={{
								and: ["GuestSensor"]
							}}
						/>
					</div>
				</div>
			</ReactiveBase>
		);
	}
}
