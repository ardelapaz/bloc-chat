import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';


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
  constructor(props) {
    super(props);
    this.state = {
      activeRoom: '-L5QkdWA-YSxcyxEW4rB',
      roomName: 'Default Room',
      users: []
    }
    this.setUser = this.setUser.bind(this);
  }
  setRoom(room) {
    this.setState({ activeRoom: room.key });
  }
  setUser(user) {
    const newUser = user;
    this.setState({users: newUser});
  }
  render() {
    return (
      <div className="App">
        <main>
          <RoomList firebase= {firebase} setRoom = {this.setRoom.bind(this)} ></RoomList>
          <User firebase = {firebase} setUser = {this.setUser} userState = {this.state.users}></User>
          </main>
          <main>
            <MessageList firebase = {firebase} activeRoom = {this.state.activeRoom} userState = {this.state.users}>
            </MessageList>
            </main>
      </div>
    );
  }
}
//t
export default App;
