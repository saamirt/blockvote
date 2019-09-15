import React, { Component } from 'react';
import EventList from '../events/EventsList';

export default class Dashboard extends Component {
	render() {
		return (
			<div className="row">
				<div className="col">
					<EventList />
				</div>
			</div>
		);
	}
}
