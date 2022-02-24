import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

//Styles
import './login.css'

//Assets
import Blue from '../../assets/img/blue.svg'
import Green from '../../assets/img/green.svg'
import Visible from '../../assets/img/visibility.svg'

//Context
import UserContext from '../../context/User.context'

const Login = () => {
  const { dispatch } = useContext(UserContext)
  const history = useHistory()

  const [visibility, setVisibility] = useState(true)
  const [mail, setMail] = useState('')
  const [password, setPassword] = useState('')
  const [token, setToken] = useState()

  const handleVisibility = (e) => {
    e.preventDefault()
    setVisibility(!visibility)
  }

  const mailHandler = ({ target }) => {
    setMail(target.value)
  }

  const passwordHandler = ({ target }) => {
    setPassword(target.value)
  }

  const loginHandler = async (e) => {
    e.preventDefault()
    var qs = require('qs')
    var data = qs.stringify({
      email: 'erik@academlo.com',
      password: 'secret',
    })

    try {
      const res = await axios({
        method: 'POST',
        url: 'https://tasks-crud.academlo.com/api/auth/login',
        headers: {
          Accept: 'application/json',
        },
        data: data,
      })
      res.data && res.data.length > 0 && setToken(res.data)
      console.log(token)
      token && token.length > 0 && authHandler()
    } catch (err) {
      console.log(err)
    }
  }

  const authHandler = async () => {
    var qs = require('qs')
    var data = qs.stringify({})

    try {
      const res = await axios({
        method: 'GET',
        url: 'https://tasks-crud.academlo.com/api/user',
        headers: {
          Authorization: `Bearer ${token && token.length > 0 && token}`,
          Accept: 'application/json',
        },
      })

      console.log(res)

      if (res) {
        dispatch({
          type: 'SUCCESS',
          payload: { email: mail, password, token },
        })
        history.push('/')
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="login-container">
      <div className="background-container">
        <img className="green" src={Green} alt="" />
        <img className="blue" src={Blue} alt="" />
      </div>

      <div className="form-container">
        <div className="form">
          <div className="buttons-container">
            <button className="login">Iniciar sesión</button>
            <button className="signup">Registrarme</button>
          </div>

          <div className="info">
            <h2>Inicio de sesión</h2>
            <form onSubmit={loginHandler}>
              <div className="mail">
                <label>Correo electrónico</label>

                <div className="mail-box">
                  <input
                    onChange={mailHandler}
                    value={mail}
                    type="email"
                    placeholder="Escribe tu correo electrónico"
                    required
                  />
                </div>
              </div>

              <div className="password">
                <label>Contraseña</label>

                <div className="password-box">
                  <input
                    onChange={passwordHandler}
                    value={password}
                    type={`${visibility ? 'password' : 'text'}`}
                    placeholder="Al menos 8 caracteres"
                    required
                  />
                  <button onClick={handleVisibility}>
                    <img src={Visible} alt="" />
                  </button>
                </div>

                <div className="forgotten">
                  <p className="forgotten-password">Olvidé mi contraseña</p>
                </div>
              </div>

              <div className="submit">
                <button type="submit">Aceptar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
