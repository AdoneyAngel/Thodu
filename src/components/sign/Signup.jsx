import { addDoc, collection } from "firebase/firestore";
import React from "react";
import db from "../../db";

import SignupForm from './SignupForm'

export default class Signup extends React.Component{

    checkUser = (name, mail, pass) => {
        this.props.loadUsers().then(result => {
            const users = result

            if(users.filter(user => user.data().mail === mail).length > 0){
                this.props.notificationAlert('The user mail is already in use')

            }else if(users.filter(user => user.data().name === name).length > 0){
                this.props.notificationAlert('The user name is already in use')

            }else{
                this.signup(name, mail, pass)
            }
        })
    }

    signup = async (name, mail, pass) => {
        await addDoc(collection(db, 'users'), {
            name: name,
            mail: mail,
            pass: pass,
            taskCategories: [],
            tasks: []
        })

        this.props.logInUser(name, mail)

        window.location = 'tasksHome/tasks'
    }

    render(){
        return (
            <div className="sign" style={this.props.style}>
                <SignupForm notificationAlert={this.props.notificationAlert} checkUser={this.checkUser} />
            </div>
        )
    }
}