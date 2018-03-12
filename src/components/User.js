import React, { Component } from 'react';



class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn : false,
            status : "Log In",
            username: 'Guest'
        }
        this.logIn = this.logIn.bind(this);
        this.logOut = this.logOut.bind(this);
        this.isLoggedIn = this.isLoggedIn.bind(this);
    }

    componentDidMount() {
        this.props.firebase.auth().onAuthStateChanged(user => {
            if (user) {
            this.props.setUser(user);
            }
        });
    }

    isLoggedIn() {
        if (this.state.isLoggedIn !== true) {
            this.logIn();
            this.setState({ isLoggedIn: true })
            this.setState({ status: "Log Out"});
            this.setState({username: this.props.activeUser});            
        } else {
            this.logOut();
            this.setState({ isLoggedIn: false })
            this.setState({ status: "Log In"});
        }
    }

    logIn() {
        const provider = new this.props.firebase.auth.GoogleAuthProvider();
        this.props.firebase.auth().signInWithPopup(provider);
    }
    logOut() {
        this.props.firebase.auth().signOut();
        this.setState({username: "Guest"});
    }
  
    

    render() {
        return (
            <div id="loginbox">
                <p id = "username" >{this.state.username}</p>
                <button type="button" className="btn btn-info btn-lg" data-toggle="modal" data-target="#newRoomModal" id="Signin" onClick={this.isLoggedIn}>{this.state.status}</button>

                {/* <button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#newRoomModal" id="Signin" onClick={this.logIn}>Sign In</button>
                <button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#newRoomModal" id="Signin" onClick={this.logOut}>Sign Out</button> */}
            </div>
        );
    }
}

export default User;