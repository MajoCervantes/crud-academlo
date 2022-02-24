import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'

//Context
import UserContext from '../../context/User.context'

//Styles
import './dashboard.css'

//Assets
import Search from '../../assets/img/search.svg'
import User from '../../assets/img/user1.svg'
import Plus from '../../assets/img/plus1.svg'
import Close from '../../assets/img/x2.svg'

//Components
import Tasks from '../../components/dashboard/Tasks'

const Dashboard = () => {
  const { state } = useContext(UserContext)

  const [tasks, setTasks] = useState()
  const [modal, setModal] = useState(false)
  const [desc, setDesc] = useState('')
  const [task, setTask] = useState('')

  const handleModal = () => {
    setModal(!modal)
  }

  const tasksReq = async () => {
    try {
      const res = await axios({
        method: 'GET',
        url: 'https://tasks-crud.academlo.com/api/tasks',
        headers: {
          Authorization: `Bearer ${state.token}`,
          Accept: 'application/json',
        },
      })
      res.data && res.data.length > 0 && setTasks(res.data)

      console.log(tasks)
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    tasksReq()
  }, [setTasks])

  const handleDesc = ({ target }) => {
    setDesc(target.value)
  }

  const handleTask = ({ target }) => {
    setTask(target.value)
  }

  const createNewTask = async (e) => {
    e.preventDefault()
    var qs = require('qs')
    var data = qs.stringify({
      name: task,
      description: desc,
    })

    try {
      const res = await axios({
        method: 'POST',
        url: 'https://tasks-crud.academlo.com/api/tasks',
        headers: {
          Authorization: `Bearer ${state.token}`,
          Accept: 'application/json',
        },
        data: data,
      })
      setModal(false)

      console.log(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="dashboard-container">
      <div className={`${modal ? 'new-task-container' : 'hidden'}`}>
        <div className="modal">
          <div className="header-modal">
            <h2>Agregar tarea</h2>
            <button onClick={handleModal}>
              <img src={Close} alt="" />
            </button>
          </div>

          <div className="task-form">
            <label htmlFor="new-task">Nombre de la tarea</label>
            <input
              onChange={handleTask}
              value={task}
              type="text"
              name="new-task"
              placeholder="Escribe nueva tarea"
            />
            <span>0/50</span>
          </div>

          <div className="task-form">
            <label htmlFor="new-task">Descripción</label>
            <input
              onChange={handleDesc}
              value={desc}
              className="desc-input"
              type="text"
              name="new-task"
              placeholder="Escribe la descripción"
            />
            <span>0/150</span>
          </div>

          <div className="new-task-buttons">
            <button onClick={handleModal} className="cancel">
              Cancelar
            </button>
            <button onClick={createNewTask} className="save">
              Guardar Cambios
            </button>
          </div>
        </div>
      </div>

      <div className="user-container">
        <img src={User} alt="" />
      </div>

      <div className="header">
        <div className="title">
          <h1>Tareas</h1>
        </div>

        <div className="header-buttons">
          <div className="search">
            <img src={Search} alt="" />
            <input type="text" placeholder="Buscar Tarea" />
          </div>

          <div className="new-task">
            <img src={Plus} alt="" />
            <button onClick={handleModal}>Crear nueva tarea</button>
          </div>
        </div>
      </div>

      <div className="tasks-container">
        {tasks &&
          tasks.length > 0 &&
          tasks.map((task) => (
            <Tasks
              key={task.id}
              id={task.id}
              name={task.name}
              desc={task.description}
              status={task.status_id}
            />
          ))}
      </div>
    </div>
  )
}

export default Dashboard
