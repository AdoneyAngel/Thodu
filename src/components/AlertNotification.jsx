import React from "react";

import '../styles/alertNotification.css'

export default function AlertNotification(props){
    return (
        <div className="alertNotification">{props.txt}</div>
    )
}