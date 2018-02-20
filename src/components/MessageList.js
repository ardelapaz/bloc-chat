import React, { Component } from 'react';
import * as firebase from 'firebase';




class MessageList extends Component {
    constructor(props){
        super(props);
        this.state = 
            {
<<<<<<< HEAD
             messages: [],
             newMessage: ''
=======
                messages: [],
                newMessage: ''
>>>>>>> BoostrapApplication
            }
            this.messagesRef = firebase.database().ref('messages');
            this.createMesssage = this.createMessage.bind(this);
        }

        componentDidMount() {
            this.messagesRef.on('child_added', snapshot => {
                const message = snapshot.val();
                message.key = snapshot.key;
                this.setState({ messages: this.state.messages.concat(message)});
            });
        } 
        createMessage() {
            console.log("lh");
            this.messagesRef.push({
                username: "<USERNAME HERE>",
                content: this.state.newMessage,
                sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
                roomID: this.props.activeRoom
              });
              this.setState({newMessage: ''});

        }

        onTextChange(e) {
            const message = e.target.value;
            this.setState({ newMessage: message})
        }


    render() {
        return (
            <div>
            <h2 id = "activeRoomName"> {this.props.roomName}</h2>
            <ul id = "messageList">
            {
            this.state.messages.map((id, index) => {
                if (id.roomID === this.props.activeRoom) {
                    return(
                <li key = {index} id = "messages">
                    <div id = "contents">
                        <h3 id = "username">{id.userName}</h3>
                        <p id = "content">{id.content}</p>
                        <p id = "time">{id.sentAt}</p>
                    </div>
                    
                </li>
                    )
                }
            })}
            </ul>
            <form id="messageContent" onSubmit={(e) => {e.preventDefault(); this.createMessage()}} >
            Message: <input type="text" id = "messageContent" value = {this.state.newMessage} onChange = {this.onTextChange.bind(this)} ></input>
            <input type="submit"/>            
            </form>
            </div>
        )
    }
}
export default MessageList;              