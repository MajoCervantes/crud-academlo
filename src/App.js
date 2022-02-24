import React, { useContext } from 'react'
import './App.css'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

//Context
import UserContext from './context/User.context'

//Components
import Login from './views/login/Login'
import Dashboard from './views/dashboard/Dashboard'

function App() {
  const { state } = useContext(UserContext)
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/login" exact>
            <Login />
          </Route>
          {state.isOnSession ? (
            <Route path="/" exact>
              <Dashboard />
            </Route>
          ) : (
            <Redirect to="/login" />
          )}
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
