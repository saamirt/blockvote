import React, { Component } from 'react';
import Graph from './SensorPlot';
import EventImage from './EventImage';
import { ParentSize } from '@vx/responsive';

import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

export default class Event extends Component {
	state = {
		options: []
	};

	async componentDidMount() {
		firebase.firestore()
		.collection("Elections")
		.get()
		.then((querySnapshot)=>{
			querySnapshot.forEach((doc) => {
				console.log(doc.data().Options)
				this.setState({ options: doc.data().Options });
			});;
		});
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
		return (
			<div>
				<div className="card mt-5 mx-auto" style={{width: "70%"}}>
					{/* <div className="card-header" /> */}
					<div className="card-body p-5">
						<h1 className="mb-4">Your Digital Ballot.</h1>
						{this.state.options.map((option) => (
							<div className="row mb-3">
								<div className="form-check ml-4">
									<input className="form-check-input" type="checkbox" value="" id="defaultCheck1"/>
									<label className="form-check-label" for="defaultCheck1">
										{option}
									</label>
								</div>
							</div>
						))}
						<button type="submit" className="btn btn-primary mt-4">Submit</button>
					</div>
					{/* <div className="card-footer text-muted">
						Data from IoT Event Device
					</div> */}
				</div>
			</div>
		);
	}
}
