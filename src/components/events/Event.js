import React, { Component } from 'react';
import Graph from './SensorPlot';
import EventImage from './EventImage';
import { ParentSize } from '@vx/responsive';

import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";


const algosdk = require("algosdk");

export default class Event extends Component {

	state = {
		options: [],
		currentOption: 'Choose an Option'
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

	handleClick = (e, data) =>{
		console.log(data)
		this.setState({currentOption: data});
	}

	handleSubmit = (e) => {
		console.log("sadasdasds");
		// import "./../../../algorand/app";
		// generate the token and host it on port 9100
		const token =
		"ef920e2e7e002953f4b29a8af720efe8e4ecc75ff102b165e0472834b25832c1";
		const server = "http://hackathon.algodev.network";
		const port = "9100";
		const client = new algosdk.Algod(token, server, port);

		(async () => {
		console.log(await client.status());
		})().catch(e => {
		console.log(e);
		});

		const mainAccountMnemonic =
		{"name": "main", "mnemonic": "kitchen evolve rocket post secret gallery found address acoustic figure decrease display luxury nothing gain endorse disease wolf stage bless private abstract inherit above twelve"};

		const liberals =
		{"name": "liberal", "mnemonic": "group clinic resource admit elephant flock comfort favorite pig always marriage merit junior elephant vendor myself limb village throw proof travel then shuffle about gravity"};

		const conservatives =
		{"name": "conservative", "mnemonic": "napkin echo ugly aware notice organ ranch eternal blade crush shy admit miss soldier devote rabbit olympic board melt blue tiger skirt extra absent purpose"};

		const NDP =
		{"name": "new democratic party", "mnemonic": "hamster earn dust siren ostrich soap coil electric foster magnet essence detect casino van science turtle answer key idle jacket typical clerk vapor abstract defy"};

		const bloc =
		{"name": "bloc québécois", "mnemonic": "fuel obvious inflict laptop laptop vacuum gravity wolf tourist category sea admit sand phrase object swallow caught identify brown alone inhale hub airport absent lounge"};

		const greenParty =
		{"name": "green party", "mnemonic": "ring enrich suggest abstract glove mixed canvas exhibit scale cancel stock afraid tomorrow resemble hundred oxygen race solid wheel action people concert armor absorb true"};

		const mnemonic7 =
		{"name": "7", "mnemonic": "traffic sell better grace code staff decide pulse flip entry artwork survey urge noise dentist picture need essay satisfy canal else flight action absorb success"};

		const mainaccount = algosdk.mnemonicToSecretKey(mainAccountMnemonic['mnemonic']);

		const dummy = algosdk.mnemonicToSecretKey(mnemonic7['mnemonic']);

		const candidate1 = algosdk.mnemonicToSecretKey(liberals['mnemonic']);
		const candidate2 = algosdk.mnemonicToSecretKey(conservatives['mnemonic']);
		const candidate3 = algosdk.mnemonicToSecretKey(NDP['mnemonic']);
		const candidate4 = algosdk.mnemonicToSecretKey(bloc['mnemonic']);
		const candidate5 = algosdk.mnemonicToSecretKey(greenParty['mnemonic']);

		const voter = algosdk.generateAccount();
		console.log("voter: ", voter.addr);

		console.log("addresses: ", mainaccount.addr, "----- ");
		//console.log("verified? : ", algosdk.isValidAddress("LOL")); // make sure you know how you're going to verify address

		// picks out the last available block on the algorand network and prints
		// (async () => {
		//   let lastRound = (await client.status()).lastRound;
		//   let block = await client.block(lastRound);
		//   //let textedJson = JSON.stringify(block, undefined, 4);
		//   const obj = {
		//     lastRound,
		//     block,
		//     textedJson
		//   };
		//   //console.log("obj: ", obj);
		// })().catch(e => {
		//   console.log(e);
		// });

		//initial transfer to voter
		(async () => {
		let params = await client.getTransactionParams();
		let endRound = params.lastRound + parseInt(1000);

		let txn = {
		from: mainaccount.addr,
		to: voter.addr,
		fee: 10,
		amount: 500000,
		firstRound: params.lastRound,
		lastRound: endRound,
		//genesisID: params.genesisID,
		genesisHash: params.genesishashb64,
		note: algosdk.encodeObj({})
		};

		let signedTx = algosdk.signTransaction(txn, mainaccount.sk);
		let tx = await client.sendRawTransaction(signedTx.blob);

		console.log("transfer: ", tx.txId);
		})().catch(e => {
		console.log("error: ", e);
		});

		const callback = async () => {
		try {
		let params = await client.getTransactionParams();
		let endRound = params.lastRound + parseInt(1000);

		let vote = {
			from: voter.addr,
			to: dummy.addr,
			fee: 10,
			amount: 100000, //vote
			firstRound: params.lastRound,
			lastRound: endRound,
			genesisID: params.genesisID,
			genesisHash: params.genesishashb64,
			note: algosdk.encodeObj({})
		};

		//sign the vote
		let signedVote = algosdk.signTransaction(vote, voter.sk);

		//send the vote onto the algorand network
		let vt = await client.sendRawTransaction(signedVote.blob);
		console.log("vote: ", vt);
		} catch (e) {
		console.log(e);
		}
		};

		setTimeout(callback, 10000);
	}

	render() {
		return (
			<div>
				<div className="card mt-5 mx-auto" style={{width: "70%"}}>
					{/* <div className="card-header" /> */}
					<div className="card-body p-5">
						<h1 className="mb-4">Your Digital Ballot.</h1>
							<div className="row mb-3">
								<div class="dropdown">
									<button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
										{this.state.currentOption}
									</button>
									<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
										{this.state.options.map((option) => (
											<button onClick={((e) => this.handleClick(e, option))} class="dropdown-item" href="#">{option}</button>
										))}
									</div>
								</div>
								{/* <div className="form-check ml-4">
									<input className="form-check-input" type="radio" name="blankRadio" type="checkbox" value="" id={option}/>
									<label className="form-check-label" for="defaultCheck1">
										{option}
									</label>
								</div> */}
							</div>
						<button type="submit" onClick={((e) => this.handleSubmit(e))} className="btn btn-primary mt-4">Submit</button>
					</div>
					{/* <div className="card-footer text-muted">
						Data from IoT Event Device
					</div> */}
				</div>
			</div>
		);
	}
}
