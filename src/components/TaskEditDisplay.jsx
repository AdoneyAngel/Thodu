import React, { useState } from "react";

function ChooseColorDisplay (props){
    const [colorList, setColorList] = useState([
        '#f7d716',
        '#aef5c6',
        '#ff533c',
        '#d796ff',
        '#5fbbff',
        '#f79416'
    ])

    return (
        <div className="chooseColorDisplay">
            {
                colorList.map(color => {
                    return (
                        <button onClick={() => props.changeColor(color)} key={color} style={{background: color}}></button>
                    )
                })
            }
        </div>
    )
}

export default function TaskEditDisplay (props){

    const [taskColor, setTaskColor] = useState(props.task.color)
    const [choosingColor, setChoosingColor] = useState(false)
    const [content, setContent] = useState(props.task.content)
    const [title, setTitle] = useState(props.task.title)
    const [oldTask] = useState(props.task.title)


    let openChooseColor = () => {
        setChoosingColor(!choosingColor)
    }

    let changeColor = (color) => {
        setTaskColor(color)
        setChoosingColor(false)
    }

    let modifiProfileTask = () => {
        let newTask = props.task

        newTask.title = title
        newTask.content = content
        newTask.color = taskColor

        props.modifiProfileTask(newTask, oldTask)

        props.close()
    }

    return (
        <div style={{'--task-color': taskColor}} className="taskEditDisplay">
            {choosingColor ? <ChooseColorDisplay changeColor={changeColor} /> : null}
            
            <button onClick={() => props.close()}>Cancel</button>
            <header>
                <input type="text" defaultValue={props.task.title} placeholder='Title' onChange={(e) => setTitle(e.target.value)}/>
                <button onClick={() => modifiProfileTask()}>Save</button>
            </header>
            <div>
                <div onClick={() => openChooseColor()} className="selColorTaskBtn">
                    <button>Color</button>
                </div>
            </div>
            <section>
                <textarea onChange={(e) => setContent(e.target.value)} minLength='100%' defaultValue={props.task.content}></textarea>
            </section>
        </div>
    )
}