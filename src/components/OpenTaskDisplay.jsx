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

            <textarea disabled value={props.task.content}>{props.task.content}</textarea>
            <button onClick={() => {props.openEdit(); setTimeout(() => props.close(false), 200) }}><img src={pencilImg} alt="" /></button>
        </div>
    )
}