import React from "react";

import SigninForm from './SigninForm'

export default class Signin extends React.Component{

    signIn = (mail, pass) => {
        this.props.loadUsers().then((result) => {
            let userChecked = result.filter(user => user.data().mail === mail && user.data().pass === pass)

            if(userChecked.length > 0){
                this.props.logInUser(userChecked[0].data().name, userChecked[0].data().mail)
                window.location = '/tasksHome/tasks'
            }else{
                this.props.notificationAlert('The user mail or password are not valid')
            }
        })
    }

    render(){
        return (
            <div className="sign" style={this.props.style}>
                <SigninForm signIn={this.signIn} />
            </div>
        )
    }
}