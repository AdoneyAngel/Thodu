import React from "react";

import '../../styles/sign.css'

export default class SigninForm extends React.Component{

    state = {
        mail: '',
        pass: ''
    }
    
    handleSubmit = (e) => {
        e.preventDefault()

        this.props.signIn(this.state.mail, this.state.pass)
    }

    getValues = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render(){
        return (
            <form onSubmit={this.handleSubmit}>
                <h1>Sign in</h1>
                <input onChange={this.getValues} name="mail" type="mail" placeholder='User mail' />
                <input onChange={this.getValues} name="pass" type="password" placeholder="Password" />
                <button>Entry</button>
            </form>
        )
    }
}