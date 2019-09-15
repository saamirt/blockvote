import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router} from 'react-router-dom'
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Amplify from "aws-amplify";
import config from "./config";
import * as firebase from "firebase/app";
import "firebase/auth";
import { FirebaseAuthProvider} from "@react-firebase/auth";

Amplify.configure({
    Auth: {
      mandatorySignIn: true,
      region: config.cognito.REGION,
      userPoolId: config.cognito.USER_POOL_ID,
      identityPoolId: config.cognito.IDENTITY_POOL_ID,
      userPoolWebClientId: config.cognito.APP_CLIENT_ID
    },
    API: {
      endpoints: [
        {
          name: "",
          endpoint: config.apiGateway.URL,
          region: config.apiGateway.REGION
        },
      ]
    }
  });

  ReactDOM.render(
    <Router>
    <FirebaseAuthProvider {...config} firebase={firebase}>
      <App />
      </FirebaseAuthProvider>
    </Router>,
    document.getElementById("root")
  );
  
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
