import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import { Route, Link } from 'react-router-dom';


  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCGq3M4KVfzbwmnZix0Uz-I3LdEIyZrUE4",
    authDomain: "bloc-chat-13193.firebaseapp.com",
    databaseURL: "https://bloc-chat-13193.firebaseio.com",
    projectId: "bloc-chat-13193",
    storageBucket: "bloc-chat-13193.appspot.com",
    messagingSenderId: "288716000715"
  };
  firebase.initializeApp(config);

class App extends Component {
  render() {
    return (
      <div className="App">
        <main>
          {/* <Route exact path="/" component={RoomList} /> */} <RoomList firebase= {firebase}></RoomList>
          </main>
      </div>
    );
  }
}

export default App;
