import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';


firebase.initializeApp({
    apiKey: "AIzaSyBVI6zNyG9H2pq2OMRaJrV5Clf7zTpGvI0",
    authDomain: "clonegram-1c26c.firebaseapp.com",
    databaseURL: "https://clonegram-1c26c.firebaseio.com",
    projectId: "clonegram-1c26c",
    storageBucket: "",
    messagingSenderId: "56608186317"
});

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
