import React from "react";

export default function TasksList (props){
    
    return (
        <div className="tasksList">
            {
                props.tasks.map(task => {
                    return <div style={{'--task-color': task.color}} onClick={() => props.openTask(task)} key={task.title}>
                        <p>{task.title}</p>
                        <section>
                            <p>{
                                task.content.length > 70 ? task.content.split('', 70).concat('...') : task.content
                            }</p>
                            
                        </section>
                        </div>
                })
            }
        </div>
    )
}