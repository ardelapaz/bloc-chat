import React, { Component } from 'react';
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
      activeRoom: '-L7L6cFP8edexitCXgkP',
      roomName: 'Default Room',
      users: [],
      activeUser: ''
    }
    this.setUser = this.setUser.bind(this);
  }
  setRoom(room) {
    this.setState({ activeRoom: room.key });
  }
  setUser(user) {
    const newUser = user;
    this.setState({users: newUser});
    this.setState({ activeUser: newUser ? newUser.displayName : 'Guest' });
  }
  render() {
    return (
      <div className="App">
        <main>
          <RoomList firebase= {firebase} setRoom = {this.setRoom.bind(this)}></RoomList>
          <User firebase = {firebase} setUser = {this.setUser} activeUser = {this.state.activeUser}></User>
          </main>
          <main>
            <MessageList firebase = {firebase} activeUser = {this.state.activeUser} activeRoom = {this.state.activeRoom} userState = {this.state.users}>
            </MessageList>
            </main>
      </div>
    );
  }
}

export default App;
