import React, { Component } from 'react';
import * as firebase from 'firebase';



class RoomList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rooms: [],
            roomName: ''
        };
        this.roomsRef = firebase.database().ref('rooms');
        this.createRoom = this.createRoom.bind(this);
    }

    componentDidMount() {
        this.roomsRef.on('child_added', snapshot => {
            const room = snapshot.val();
            room.key = snapshot.key;
            this.setState({ rooms: this.state.rooms.concat(room) });
        });
    }

    createRoom() {
        this.roomsRef.push({ roomName: this.state.roomName });
        this.setState({ roomName: '' });
    }

    onTextChange(e) {
        const name = e.target.value;
        this.setState({ roomName: name });
    }


    render() {
        return (
            <div class="btn-group-vertical">
                {
                    this.state.rooms.map((room, index) =>
                        <button type="button" class="btn btn-primary" class="list-group-item list-group-item-action" id="roomlist" key={room.key} onClick={() => this.props.setRoom(room)}>{room.roomName}</button>
                    )}
                <button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#newRoomModal" id="roomlist">Create a new chatroom</button>


                {/* <!-- Modal --> */}
                <div id="#newRoomModal" class="modal fade" role="dialog">
                    <div class="modal-dialog">

                        {/* <!-- Modal content--> */}
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                                <h4 class="modal-title">Modal Header</h4>
                            </div>
                            <div class="modal-body">
                                <p>Some text in the modal.</p>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                            </div>
                        </div>

                    </div>
                </div>

                {/* <form id="newroombox" onSubmit={(e) => { e.preventDefault(); this.createRoom() }}>
                    Room name: <input type="text" id="newRoom" value={this.state.roomName} onChange={this.onTextChange.bind(this)} ></input>
                    <input type="button" value="Create a new chatroom" onClick={this.createRoom} />
                </form> */}
            </div>
        );
    }

}


export default RoomList;