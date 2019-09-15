import React, { Component } from 'react';
import Graph from './SensorPlot';
import EventImage from './EventImage';
import { ParentSize } from '@vx/responsive';

import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

export default class Event extends Component {
	state = {
		name: '',
		data: { temp: 23.4, humidity: 40, light: 425 },
		graphWid: 400
	};

	async componentDidMount() {
		this.setState({ name: this.props.name });
	}

	toTitleCase = s => {
		return s
			.toLowerCase()
			.split('-')
			.map(
				letter => letter.charAt(0).toUpperCase() + letter.substring(1)
			)
			.join(' ');
	};

	render() {
		let boxes = [];
		for (let i = 0; i < 4; i++){
			boxes.push(
			<div className="row mb-3">
				<div class="form-check ml-4">
					<input class="form-check-input" type="checkbox" value="" id="defaultCheck1"/>
					<label class="form-check-label" for="defaultCheck1">
						Default checkbox
					</label>
				</div>
			</div>
			)
		}	
		return (
			<div>
				<div className="card mt-5 mx-auto" style={{width: "70%"}}>
					{/* <div className="card-header" /> */}
					<div className="card-body p-5">
						<h1 className="mb-4">Your Digital Ballot.</h1>
						{boxes}
						<button type="submit" class="btn btn-primary mt-4">Submit</button>
					</div>
					{/* <div className="card-footer text-muted">
						Data from IoT Event Device
					</div> */}
				</div>
			</div>
		);
	}
}
