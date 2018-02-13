import React, { Component } from 'react';


class RoomList extends Component {
    constructor(props){
        super(props);

        this.state = {
            rooms: [],
            roomsRef: 0
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

    render() {
        return (
        <div>
            {
            this.state.rooms.map((room, index) =>
                <h1 id="roomlist"key={room.key}>{room.name}</h1>
            )}
        </div>
        );}

}

export default RoomList;