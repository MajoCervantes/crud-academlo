import React, { useContext, useState } from 'react'
import axios from 'axios'
import Select from 'react-select'

//Styles
import './tasks.css'

//Assets
import Edit from '../../assets/img/edit.svg'
import Close from '../../assets/img/x2.svg'

//Context
import UserContext from '../../context/User.context'

const Tasks = ({ name, desc, status, id }) => {
  const { state } = useContext(UserContext)

  const [selectedOption, setSelectedOption] = useState({})
  const [modal, setModal] = useState(false)
  const [description, setDescription] = useState('')
  const [taskName, setTaskName] = useState('')

  const options = [
    { value: '1', label: 'Iniciada' },
    { value: '2', label: 'Pausada' },
    { value: '3', label: 'Terminada' },
  ]

  const handleModal = () => {
    setModal(!modal)
  }
  const handleDesc = ({ target }) => {
    setDescription(target.value)
  }

  const handleTask = ({ target }) => {
    setTaskName(target.value)
  }

  const changeStatus = async (selectedOption) => {
    setSelectedOption({ selectedOption })
    console.log(selectedOption)
    var qs = require('qs')
    var data = qs.stringify({
      status_id: selectedOption,
    })

    try {
      const res = await axios({
        method: 'POST',
        url: `https://tasks-crud.academlo.com/api/tasks/${id}/status/${selectedOption.value}`,
        headers: {
          Authorization: `Bearer ${state.token}`,
          Accept: 'application/json',
        },
        data: data,
      })

      console.log(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  const updateTask = async (e) => {
    e.preventDefault()
    var qs = require('qs')
    var data = qs.stringify({
      name: taskName,
      description,
    })

    try {
      const res = await axios({
        method: 'PUT',
        url: `https://tasks-crud.academlo.com/api/tasks/${id}`,
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

  const deleteTask = async (e) => {
    e.preventDefault()
    var qs = require('qs')
    var data = qs.stringify({})

    try {
      const res = await axios({
        method: 'DELETE',
        url: `https://tasks-crud.academlo.com/api/tasks/${id}`,
        headers: {
          Authorization: `Bearer ${state.token}`,
          Accept: 'application/json',
        },
        data: data,
      })

      console.log(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div
      className={`${
        selectedOption.value === '1'
          ? 'task-container'
          : selectedOption.value === '2'
          ? 'paused'
          : 'finished'
      }`}
    >
      <div className={`${modal ? 'new-task-container' : 'hidden'}`}>
        <div className="modal">
          <div className="header-modal">
            <h2>Editar tarea</h2>
            <button onClick={handleModal}>
              <img src={Close} alt="" />
            </button>
          </div>

          <div className="task-form">
            <label htmlFor="new-task">Nombre de la tarea</label>
            <input
              onChange={handleTask}
              value={taskName}
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
              value={description}
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
            <button onClick={updateTask} className="save">
              Guardar Cambios
            </button>
          </div>
        </div>
      </div>

      <div className="header-task">
        <h2>{name}</h2>
        <button onClick={handleModal}>
          <img src={Edit} alt="" />
        </button>
      </div>

      <div className="desc-container">
        <h2>DESCRIPCIÓN</h2>
        <p>{desc}</p>
      </div>

      <div className="status-container">
        <Select
          defaultValue={options[0]}
          isDisabled={false}
          isLoading={false}
          isClearable={false}
          isRtl={false}
          isSearchable={true}
          name="status"
          options={options}
          onChange={changeStatus}
        />
        <button onClick={deleteTask}>Eliminar</button>
      </div>
    </div>
  )
}

export default Tasks
