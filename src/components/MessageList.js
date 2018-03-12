import React, { Component } from 'react';
import * as firebase from 'firebase';




class MessageList extends Component {
    constructor(props) {
        super(props);
        this.state =
            {
                messages: [],
                newMessage: ''
            }
        this.messagesRef = firebase.database().ref('messages');
        this.createMesssage = this.createMessage.bind(this);
    }

    componentDidMount() {
        this.messagesRef.on('child_added', snapshot => {
            const message = snapshot.val();
            message.key = snapshot.key;
            this.setState({ messages: this.state.messages.concat(message) });
        });
    }
    createMessage() {
        this.messagesRef.push({
            username: this.props.activeUser,
            content: this.state.newMessage,
            sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
            roomID: this.props.activeRoom
        });
        this.setState({ newMessage: '' });
    }

    onTextChange(e) {
        const message = e.target.value;
        this.setState({ newMessage: message })
    }

    formatTime(time) {
        const formatted = new Date(time);
        const newTime = String(formatted);
        return newTime;
    }

    


    render() {
        return (
            <div id = "messageList" className = "pre-scrollable">
                <h1 id="activeRoomName"> {this.props.roonName}</h1>
                <ul id="messageList" className = "list-group">
                    {
                        this.state.messages.map((id, index) => {
                            if (id.roomID === this.props.activeRoom) {
                                return (
                                    <li key={index} id="messages">
                                        <div id="contents">
                                            <h3 id="username">{id.username}</h3>
                                            <p id="content">{id.content}</p>
                                            <p id="time">Sent at {this.formatTime(id.sentAt)}</p>
                                        </div>

                                    </li>
                                )
                            }
                        })}
                </ul>
                <div id="messageBox">
                    <form id="messageContent" onSubmit={(e) => { e.preventDefault(); this.createMessage() }} >
                        <input className = "form-control" placeholder = "Send a message here" type="text" id="messageContent" value={this.state.newMessage} onChange={this.onTextChange.bind(this)} ></input>
                    </form>
                </div>
            </div>
        )
    }
}
export default MessageList;              