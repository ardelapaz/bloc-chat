import React, { Component } from 'react';
import * as firebase from 'firebase';



class User extends Component {
    constructor(props) {
        super(props);
        this.logIn = this.logIn.bind(this);
        this.logOut = this.logOut.bind(this);
        this.userName = this.userName.bind(this);
    }

    componentDidMount() {
        this.props.firebase.auth().onAuthStateChanged(user => {
            this.props.setUser(user);
        });
    }

    logIn() {
        const provider = new this.props.firebase.auth.GoogleAuthProvider();
        this.props.firebase.auth().signInWithPopup(provider);
    }
    logOut() {
        this.props.firebase.auth().signOut();
    }
    userName() {
        if (this.props.userState === null) {
            return "Guest"
        } else return this.props.userState.displayName;
    }
    

    render() {
        return (
            <div>
                <button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#newRoomModal" id="Signin" onClick={this.logIn}>Sign In</button>
                <p>{this.userName()}</p>
                <button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#newRoomModal" id="Signin" onClick={this.logOut}>Sign Out</button>
            </div>
        );
    }
}

export default User;