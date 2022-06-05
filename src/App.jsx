import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { collection, getDocs } from 'firebase/firestore'

import db from './db'

import './styles/app.css'

//Components
import Sign from "./components/Sign";
import AlertNotification from "./components/AlertNotification";
import TasksHome from "./components/TasksHome";

export default class App extends React.Component{

    state = {
        notificationAlert: false,
        notificationAlertTxt: 'Err'
    }

    loadUsers = async () => {
        const users = await getDocs(collection(db, 'users'))

        return users.docs
    }

    loadProfileDoc = async (mail) => {
        const users = await getDocs(collection(db, 'users'))

        return users.docs.filter(user => user.data().mail === mail)[0]
    }

    notificationAlert = (txt) => {
        this.setState({
            notificationAlert: true,
            notificationAlertTxt: txt
        }, () => {
            setTimeout(() => {
                this.setState({
                    notificationAlert: false
                })
            }, 5000)
        })
    }

    setCookie = (name, value) => {
        let d = new Date()

        d.setTime(d.getTime() + (1 * 24 * 60 * 60 * 1000)) 

        let expires = "expires=" + d.toUTCString()

        document.cookie = name + '=' + value + '; ' + expires
    }

    getCookie = (name) => {
        const allCookies = document.cookie.split(';')

        for(let a = 0; a<allCookies.length; a++){
            var cookiePair = allCookies[a].split("=");
            
            if(name === cookiePair[0].trim()) {
                return decodeURIComponent(cookiePair[1]);
            }
        }
    }

    render (){

        return(

            <React.Fragment>

                <BrowserRouter>
                    {this.state.notificationAlert ? <AlertNotification txt={this.state.notificationAlertTxt} /> : null}
                    
                    <Routes>
                        <Route path='/' element={
                            <Sign 
                            notificationAlert={this.notificationAlert}
                            loadUsers={this.loadUsers}
                            setCookie={this.setCookie}></Sign>
                        }></Route>
                        <Route path="/tasksHome/*" element={
                            <TasksHome 
                            getCookie={this.getCookie}
                            setCookie={this.setCookie}
                            userMail={this.getCookie('userMail')}
                            loadProfileDoc={this.loadProfileDoc}
                            loadUsers={this.loadUsers}/>}></Route>
                        
                    </Routes>
                </BrowserRouter>
            </React.Fragment>
        )
    }
}