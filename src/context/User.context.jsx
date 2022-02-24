import React, { createContext, useReducer } from 'react'

const UserContext = createContext()

const initialState = {
  email: '',
  password: '',
  token: '',
  isOnSession: false,
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'SUCCESS':
      return {
        email: action.payload.email,
        password: action.payload.password,
        token: action.payload.token,
        isOnSession: true,
      }

    default:
      return state
  }
}

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const data = { state, dispatch }

  return <UserContext.Provider value={data}>{children}</UserContext.Provider>
}

export { UserProvider }
export default UserContext
