import React, { Component } from 'react';
import * as firebase from 'firebase';



class MessageList extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div>{this.props.activeRoom}</div>
        )
    }
}
export default MessageList;