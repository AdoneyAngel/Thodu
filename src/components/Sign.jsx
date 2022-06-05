import React from "react";

import '../styles/signMain.css'

import Signin from "./sign/Signin";
import Signup from "./sign/Signup";

import thoduIlustration from '../images/thoduIlustration.png'
import cross from '../images/cross.png'

export default class Sign extends React.Component{

    state = {
        openSignForm: false,
        sign: false
    }

    openSignForm = (sign) => {
        document.querySelector('header > h1').style.marginLeft = '-100%'
        document.querySelector('section').style.marginLeft = '180%'
        document.querySelector('header > section > p').style.visibility = 'hidden'

        this.setState({
            openSignForm: true
        }, () => {
            setTimeout(() => {
                this.setState({
                    sign: sign === 'in' ? 'in' : 'up'
                })

                document.querySelector('header > h1').style.visibility = 'hidden'
            }, 400)
        })
    }

    closeSignForm = () => {
        document.querySelector('header > h1').style.marginLeft = '35px'
        document.querySelector('header > h1').style.visibility = 'visible'
        document.querySelector('section').style.marginLeft = '0%'
        document.querySelector('header > section > p').style.visibility = 'visible'

        this.setState({
                sign: false,
                openSignForm: false
        })
    }

    logInUser = (name, mail) => {
        this.props.setCookie('userName', name)
        this.props.setCookie('userMail', mail)
    }

    render(){
        let headerStyle = {
            '--beforeLeft': this.state.openSignForm ? '-100%' : '0%'
        }
        let signinStyle = {
            display: this.state.sign === 'in' ? 'flex' : 'none'
        }
        let signupStyle = {
            display: this.state.sign === 'up' ? 'flex' : 'none'
        }

        return (
            <main className="Sign">
                <header className="signHeader" style={headerStyle}>
                    {this.state.openSignForm ? <img onClick={this.closeSignForm} src={cross} alt="" /> : null}
                    <Signin logInUser={this.logInUser} notificationAlert={this.props.notificationAlert} loadUsers={this.props.loadUsers} style={signinStyle}/>
                    <Signup notificationAlert={this.props.notificationAlert} loadUsers={this.props.loadUsers} style={signupStyle}/>

                    <h1>Thodu</h1>
                    <section>
                        <img src={thoduIlustration} alt="" />
                        <div>
                            <button onClick={() => this.openSignForm('in')}>Sign in</button>
                            <button onClick={() => this.openSignForm('up')}>Sign up</button>
                        </div>
                        <p>A ToDo app which you can put all the annotations you want</p>
                    </section>
                </header>
            </main>
        )
    }
}