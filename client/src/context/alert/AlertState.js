import React, {useReducer} from 'react'
import AlertContext from './AlertContext'
import AlertReducer from './AlertReducer'
import uuid from 'uuid/v4'

export default function AlertState(props) {
  const initState = [];

  const [state, dispatch] = useReducer(AlertReducer, initState);

  // Set Alert
  const setAlert = (msg, type, timeOut = 5000) => {
    const id = uuid();

    dispatch({
      type:'SET_ALERT',
      payload:{type, msg, id}
    });

    setTimeout(() => dispatch({type: 'REMOVE_ALERT', payload: id}), timeOut);
  }

  return (
    <AlertContext.Provider value={{
      alerts: state,
      setAlert
    }
    }>
      {props.children}
    </AlertContext.Provider>
  )
}
