import React, { Component } from 'react';
import axios from 'axios';
import EventCard from './EventCard';

import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import * as firebaseui from 'firebaseui';
// import { ConfigurationServicePlaceholders } from 'aws-sdk/lib/config_service_placeholders';

export default class EventsList extends Component {
	state = {
		name: '',
		url: 'https://pokeapi.co/api/v2/pokemon/',
		eventList: []
	};

	async componentDidMount() {
		firebase.firestore()
		.collection("Elections")
		.get()
		.then((querySnapshot)=>{
			querySnapshot.forEach((doc) => {
				let event = {
					"eventId": doc.id,
					"title": doc.data().title,
					"imageUrl": doc.data()['image-url']
				}
				console.log(event);
				this.setState({ eventList: [...this.state.eventList,event]});
			});;
		});
	}

	render() {
		// get the whole collection
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
									eventId={event.eventId}
									key={event.eventId}
									title={event.title}
									imageUrl={event.imageUrl}
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
