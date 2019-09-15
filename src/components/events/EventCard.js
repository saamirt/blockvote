import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import EventImage from './EventImage';

const StyledLink = styled(Link)`
	text-decoration: none;
	color: black;
	cursor: default;
	&:focus,
	&:hover,
	&:visited,
	&:link,
	&:active {
		text-decoration: none;
		color: black;
	}
`;

export default class EventCard extends Component {
	state = {
		name: '',
		imageURL: '',
		status: 0,
		eventIndex: '',
		imageLoading: true,
		tooManyReq: false
	};

	async componentDidMount() {
		const { name, url } = this.props;
		const eventIndex = url.split('/')[url.split('/').length - 2];
		const res = await axios.get(url);
		this.setState({
			name,
			eventIndex,
			imageURL: res.data.sprites['front_default']
		});
	}

	toTitleCase = s => {
		return s
			.toLowerCase()
			.split(' ')
			.map(
				letter => letter.charAt(0).toUpperCase() + letter.substring(1)
			)
			.join(' ');
	};

	render() {
		return (
			<div className="col-xl-4 col-lg-6 mb-4">
				<StyledLink to={`event/${this.state.eventIndex}`}>
					<div className="card mb-3 event-card p-2">
						<div className="row no-gutters align-items-center justify-content-between">
							<div>
								<div className="card-body">
									<h3 className="card-title mb-1 font-weight-bold">
										Event {this.state.eventIndex}
									</h3>
									<h5 className="card-text mb-1 text-muted font-weight-light">
										Last updated 3 mins ago
									</h5>
									<h5 className="card-text text-connected font-weight-medium">
										Connected
									</h5>
								</div>
							</div>
							<div className="text-center p-4">
								<div className="card-body bg-yellow rounded-circle square float-right">
									<EventImage />
								</div>
							</div>
						</div>
					</div>
				</StyledLink>
			</div>
		);
	}
}
