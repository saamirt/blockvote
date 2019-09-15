import React, { Component } from 'react';
import axios from 'axios';
import EventCard from './EventCard';

export default class EventsList extends Component {
	state = {
		name: '',
		url: 'https://pokeapi.co/api/v2/pokemon/',
		eventList: null,
		event: null
	};

	async componentDidMount() {
		const res = await axios.get(this.state.url);

		this.setState({
			eventList: res.data['results'].slice(0, 6).map(g => {
				let c1 = ['ffffff', 'ff7373', '6779ff'][
					Math.floor(Math.random() * 3)
				];
				let c2 = ['acff90', 'ff7373', '6779ff'][
					Math.floor(Math.random() * 3)
				];
				while (c2 === c1) {
					c2 = ['acff90', 'ff7373', '6779ff'][
						Math.floor(Math.random() * 3)
					];
				}
				return Object.assign(g, {
					eventIcon: {
						primColor: c1,
						secColor: c2,
						beardColor: [
							'FF954D',
							'E2E2E2',
							'934118',
							'C46937',
							'FFFF6C'
						][Math.floor(Math.random() * 5)],
						skinColor: 'ffe2cc'
					}
				});
			})
		});

		this.setState({ event: res.data['results'] });
	}

	render() {
		return (
			<React.Fragment>
				{this.state.eventList ? (
					<React.Fragment>
						<div className="mb-5" style={{borderBottom: "3px solid #dedede"}}>
							<h1 style={{color: "#545454"}}>Your Events</h1>
						</div>
						<div className="row mx-auto" style={{width: "80%"}}>
							{this.state.eventList.map(event => (
								<EventCard
									key={event.name}
									name={event.name}
									url={event.url}
								/>
							))}
						</div>
						
				</React.Fragment>
				) : (
					<h1>Loading Events...</h1>
				)}
			</React.Fragment>
		);
	}
}
