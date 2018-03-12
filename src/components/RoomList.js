import React, { Component } from 'react';
import * as firebase from 'firebase';
import { Button, Modal } from 'react-bootstrap';




class RoomList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rooms: [],
            roomName: '',
            show: false
        };
        this.roomsRef = firebase.database().ref('rooms');
        this.createRoom = this.createRoom.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    componentDidMount() {
        this.roomsRef.on('child_added', snapshot => {
            const room = snapshot.val();
            room.key = snapshot.key;
            this.setState({ rooms: this.state.rooms.concat(room) });
        });
    }

    createRoom() {
        this.setState({ show: false });
        this.roomsRef.push({ roomName: this.state.roomName });
        this.setState({ roomName: '' });
    }

    onTextChange(e) {
        const name = e.target.value;
        this.setState({ roomName: name });
    }
    handleClose() {
        this.setState({ show: false });
      }
    
      handleShow() {
        this.setState({ show: true });
      }

    setClass() {
        if (this.props.activeRoom === this.props.roomName) {
            return "list-group-item active"
        } else return "list-group-item"
    }
    


    render() {
        return (
            <div id="roomList">
                <div className="btn-group-vertical">
                    {
                        this.state.rooms.map((room, index) =>
                            <button type="button" className={"list-group-item" + ((this.props.activeRoom === room.roomName) ? 'active' : '')} id="roomlist" key={room.key} onClick={() => this.props.setRoom(room)}>{room.roomName}</button>
                        )}
                    <div>
                    <Button bsStyle="primary" bsSize="large" onClick={this.handleShow}>Create a new chatroom</Button>
                        <Modal show={this.state.show} onHide={this.handleClose}>
                            <Modal.Header>
                                <Modal.Title>Create a room</Modal.Title>
                            </Modal.Header>

                            <Modal.Body><input type = "text" id = "roomName" onChange = {this.onTextChange}></input> </Modal.Body>

                            <Modal.Footer>
                                <Button onClick = {this.handleClose}>Cancel</Button>
                                <Button bsStyle="primary" onClick = {this.createRoom}>Create room</Button>
                            </Modal.Footer>
                            </Modal>
                    </div>
                    
                {/* <form id="newroombox" onSubmit={(e) => { e.preventDefault(); this.createRoom() }}>
                    Room name: <input type="text" id="newRoom" value={this.state.roomName} onChange={this.onTextChange.bind(this)} ></input>
                    <input type="button" value="Create a new chatroom" onClick={this.createRoom} />
                </form> */}
                </div>
            </div>
        );
    }

}


export default RoomList;