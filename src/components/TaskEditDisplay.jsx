import React from "react";

export default function TaskEditDisplay (props){
    return (
        <div style={{'--task-color': props.task.color}} className="taskEditDisplay">
            <header>
                <input type="text" defaultValue={props.task.title} placeholder='Title'/>
                <button>Save</button>
            </header>
            <section>
                <textarea minLength='100%' defaultValue={props.task.content}></textarea>
            </section>
        </div>
    )
}