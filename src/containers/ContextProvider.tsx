import React, { FC, useState } from "react"
import { User } from 'firebase';

let initialState = {
  auth: {
    authState: false,
    userDetails: {}
  }
}

const updateUser = ({authState, userDetails}: {authState?: boolean, userDetails: Partial<User>}) => {}

export const Context = React.createContext({});

const ContextProvider: FC = ({children}) => {
  
  const [state, setState] = useState(initialState)
  return (
    <Context.Provider
      value={{
        auth: state.auth,
        updateUser: ({authState, userDetails}: {authState?: boolean, userDetails: Partial<User>}) => {
          let auth = Object.assign({}, state.auth);
          authState = authState || false;
          auth = {authState, userDetails}
          setState({
            ...initialState,
            auth
          })
        },
      }}
    >
      {children}
    </Context.Provider>
  )
}

export default ContextProvider;