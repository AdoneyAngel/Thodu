import React from "react";

import '../../styles/sign.css'

export default class SignupForm extends React.Component{

    state = {
        mail: '',
        pass: '',
        name: ''
    }
    
    handleSubmit = (e) => {
        e.preventDefault()

        if(this.state.name.length > 0 && this.state.mail.length > 0 && this.state.pass.length > 0){
            this.props.checkUser(this.state.name, this.state.mail, this.state.pass)

        }else{
            this.props.notificationAlert('Type into all fields')

        }
    }

    getValues = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render(){
        return (
            <form onSubmit={this.handleSubmit}>
                <h1>Sign up</h1>
                <input onChange={this.getValues} name="name" type="text" placeholder='User name' />
                <input onChange={this.getValues} name="mail" type="mail" placeholder='User mail' required />
                <input onChange={this.getValues} name="pass" type="password" placeholder="Password" />
                <button>Join</button>
            </form>
        )
    }
}