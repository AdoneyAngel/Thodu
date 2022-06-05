import React from "react";

import crossImg from '../images/cross.png'
import pencilImg from '../images/pencil.png'

export default function OpenTaskDisplay (props){
    return (
        <div style={{'--task-color': props.task.color}} className="openTaskDisplay">
            <header>
                <h1>{props.task.title}</h1>
                <button onClick={() => props.close(true)}><img src={crossImg} alt="" /></button>
            </header>

            <p>{props.task.content}</p>
            <button onClick={() => {props.openEdit(); props.close(false)}}><img src={pencilImg} alt="" /></button>
        </div>
    )
}