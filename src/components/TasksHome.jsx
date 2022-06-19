import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import db from "../db";
import { onSnapshot, doc, setDoc } from "firebase/firestore";

//Styles
import '../styles/tasksHome.css'

//Components
import TasksList from "./TasksList";
import TaskEditDisplay from "./TaskEditDisplay";
import OpenTaskDisplay from "./OpenTaskDisplay";
import NewCategoryDisplay from "./NewCategoryDisplay";

//Images
import mainLinesImg from '../images/mainLines.png'
import crossImg from '../images/cross.png'
import plusImg from '../images/plus.png'

export default class TasksHome extends React.Component{

    state = {
        taskCategories: [],
        userMail: this.props.userMail,
        tasks: [],
        taskCategorySelect: 'tasks',
        tasksSelected: [],
        categoriesPanelOpen: false,
        editingTask: false,
        openTask: false,
        taskOpened: {},
        openNewTaskCategory: false
    }

    loadTasksCategories = async (document) => {
        this.props.loadProfileDoc(this.state.userMail).then(res => {
            this.setState({
                taskCategories: res.data().taskCategories.length > 0 ? res.data().taskCategories : []
            })
        })
        
    }

    loadTasks = () => {
        this.props.loadProfileDoc(this.state.userMail).then(res => {
            this.setState({
                tasks: res.data().tasks
            })
        })
    }
    
    setTasksSelected = (category) => {

        this.props.loadProfileDoc(this.state.userMail).then(res => {

            let tasksSelected = this.state.tasks.filter(task => task.category === category)

            this.setState({
                tasksSelected: tasksSelected
            }, () => {
                this.setTaskCategorySelect(category)
            })

        })
        
    }

    setTaskCategorySelect = (category) => {
        this.setState({
            taskCategorySelect: category
        })
    }

    openCategoriesPanel = () => {
        this.setState({
            categoriesPanelOpen: !this.state.categoriesPanelOpen
        })
    }

    date = () => {
        const date = new Date()

        return {
            second: date.getSeconds(),
            minute: date.getMinutes(),
            hour: date.getHours(),
            day: date.getDate(),
            month: date.getMonth()+1,
            year: date.getFullYear()

        }
    }

    createNewTask = (titleTask) => {
        this.props.loadProfileDoc(this.state.userMail).then(async profile => {

            let newProfileTask = profile.data().tasks

            let newTask = {
                title: titleTask,
                content: '',
                date: this.date(),
                done: false,
                category: this.state.taskCategorySelect,
                color: '#f7d716'
            }
            newProfileTask.push(newTask)

            let newProfile = {
                name: profile.data().name,
                mail: profile.data().mail,
                pass: profile.data().pass,
                taskCategories: profile.data().taskCategories,
                tasks: newProfileTask
            }

            await setDoc(doc(db, 'users', profile.id), newProfile)

            this.setState({
                taskOpened: newTask
            }, () => {
                this.openEditTaskDisplay()
            })
            


        })
    }

    createNewCategory = (category) => {
        this.props.loadProfileDoc(this.state.userMail).then(async profile => {

            let newProfile = profile.data()

            newProfile.taskCategories.push(category)

            await setDoc(doc(db, 'users', profile.id), newProfile)

        })
    }

    modifiProfileTask = (task, oldTask) => {
        this.props.loadProfileDoc(this.state.userMail).then(async profile => {

            let tasks = profile.data().tasks.filter(profileTask => profileTask.title != oldTask)
            let userProfile = profile.data()

            tasks.push(task)

            userProfile.tasks = tasks

            await setDoc(doc(db, 'users', profile.id), userProfile)

        })
    }

    openTask = (task) => {
        this.setState({
            openTask: true,
            taskOpened: task
        })
    }
    closeTask = (edit) => {
        this.setState({
            openTask: false,
            taskOpened: edit ? [] : this.state.taskOpened
        })
    }

    openEditTaskDisplay = () => {
        this.setState({
            editingTask: true
        })
    }
    closeEditTaskDisplay = () => {
        this.setState({
            editingTask: false
        })
    }

    openNewTaskCategorydisplay = () => {
        this.setState({
            openNewTaskCategory: true
        })
    }
    closeNewTaskCategorydisplay = () => {
        this.setState({
            openNewTaskCategory: false
        })
    }
 
    componentDidMount(){

        this.props.loadProfileDoc(this.state.userMail).then(res => {
            this.setTasksSelected("tasks")

            const unsub = onSnapshot(doc(db, "users", res.id), (doc) => {
                this.loadTasksCategories()
                this.loadTasks()
        
                this.setTasksSelected('tasks')
            });
        })
    }

    render(){

        let categoriesPanelStyles = {
            left: this.state.categoriesPanelOpen ? '0' : '-100%'
        }
        
        return (
            <React.Fragment>
                    <main className="tasksHome">
                        {this.state.editingTask ? <TaskEditDisplay modifiProfileTask={this.modifiProfileTask} close={this.closeEditTaskDisplay} task={this.state.taskOpened}/> : null}
                        {this.state.openTask ? <OpenTaskDisplay openEdit={this.openEditTaskDisplay} close={this.closeTask} task={this.state.taskOpened}/> : null}
                        {this.state.openNewTaskCategory ? <NewCategoryDisplay close={this.closeNewTaskCategorydisplay} createCategory={this.createNewCategory} /> : null}

                        <div style={categoriesPanelStyles} className="categoriesPanel">
                            <button onClick={() => this.openCategoriesPanel()}><img src={crossImg} alt="" /></button>
                            <Link style={{
                                        PaddingLeft: this.state.taskCategorySelect === 'tasks' ? '6px' : 'none',
                                        fontSize: this.state.taskCategorySelect === 'tasks' ? '30px' : 'none',
                                        background: this.state.taskCategorySelect === 'tasks' ? 'var(--principal-color)' : 'white',
                                    }} className="categoryLink" to='tasks'><div onClick={() => {this.setTasksSelected('tasks'); this.openCategoriesPanel()}}><p>Tasks</p></div></Link>
                        {
                            this.state.taskCategories != false ? this.state.taskCategories.map(category => {
                                return (
                                    <Link style={{
                                        PaddingLeft: this.state.taskCategorySelect === category ? '6px' : 'none',
                                        fontSize: this.state.taskCategorySelect === category ? '30px' : 'none',
                                        background: this.state.taskCategorySelect === category ? 'var(--principal-color)' : 'white',
                                    }} className="categoryLink" key={category} to={category}><div onClick={() => {this.setTasksSelected(category); this.openCategoriesPanel()}}><p>{category}</p></div></Link>
                                )
                            }) : null
                        }
                        <div onClick={() => this.openNewTaskCategorydisplay()}>New category</div>
                        </div>
                        <div className="tasksDisplay">
                            <header><button onClick={() => this.openCategoriesPanel()}><img src={mainLinesImg} alt="" /></button><h1>{this.state.taskCategorySelect}</h1></header>
                            <Routes>
                                <Route path='tasks' element={<TasksList openTask={this.openTask} tasks={this.state.tasks} />}></Route>
                                {
                                    this.state.taskCategories.map(category => {
                                        return <Route key={category} path={category} element={<TasksList openTask={this.openTask} tasks={this.state.tasks.filter(task => task.category === category)} />}></Route>
                                    })
                                }
                            </Routes>
                            <div onClick={()=>this.createNewTask('New task')} className="newTaskBtn">
                                <img src={plusImg} alt="" />
                            </div>
                        </div>
                    </main>

            </React.Fragment>
        )
    }
}