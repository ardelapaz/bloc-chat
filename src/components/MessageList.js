import React, { Component } from 'react';
import * as firebase from 'firebase';




class MessageList extends Component {
    constructor(props){
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
            <div>{this.props.activeRoom}
            <form id="messageContent" onSubmit={(e) => {e.preventDefault(); this.createMessage()}} >
            Message: <input type="text" id = "messageContent" value = {this.state.newMessage} onChange = {this.onTextChange.bind(this)} ></input>
            <input type="submit"/>            
            </form>
            </div>
        )
    }
}
export default MessageList;              