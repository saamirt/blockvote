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
				<StyledLink to={`/event/${this.state.eventIndex}`}>	
					<div className="card mb-3 event-card mx-1">
						<div>
							<img src="https://www.ctvnews.ca/polopoly_fs/1.2065875.1413999058!/httpImage/image.jpg_gen/derivatives/landscape_620/image.jpg" class="card-img-top" alt="..."/>
							<div className="card-body">
								<h3 className="card-title mb-1 font-weight-bold">
									Federal Election (2019)
								</h3>
								{/* <h5 className="card-text mb-1 text-muted font-weight-light">
									Sept. 14, 2019 - Sept. 18, 2019
								</h5> */}
								<h5 className="card-text text-connected font-weight-medium">
									Open For Voting
								</h5>
								<p class="card-text">
									<small class="text-muted">Last updated 3 mins ago</small>
								</p>
							</div>
						</div>
					</div>
				</StyledLink>
			</div>
		);
	}
}
