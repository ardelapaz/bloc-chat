import React, { Component } from 'react';
import * as firebase from 'firebase';



class RoomList extends Component {
    constructor(props){
        super(props);

        this.state = {
            rooms: []
        };
        this.roomsRef = this.props.firebase.database().ref('rooms');
    }

    componentDidMount() {
        this.roomsRef.on('child_added', snapshot => {
            const room = snapshot.val();
            room.key = snapshot.key;
            this.setState({ rooms: this.state.rooms.concat( room )});
        });
    }

    createRoom() {
        var roomName = document.getElementById("newRoom").value;
        console.log(roomName);
        var newPostKey = firebase.database().ref().child('rooms').push({name: roomName});
        document.getElementById("newRoom").value = "";
    }


    render() {
        return (
        <div>
            {
            this.state.rooms.map((room, index) =>
                <button id="roomlist"key={room.key} onClick={ () => this.props.setRoom(room) }>{room.name}</button>
            )}

            <form id="newroombox">
            Room name: <input type="text" id = "newRoom" ></input>
            <input type="button" value="Create a new chatroom" onClick={this.createRoom}/>            
            </form>
        </div>
        );}

}

export default RoomList;