import { createContext, useReducer, useContext } from 'react'

const initialState = {
  type: 'DISABLE',
  message: ''
}

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'ENABLE': {
      return action.message
    }
    case 'DISABLE': {
      return ''
    }
    default: {
      return state
    }
  }
}

const NotificationContext = createContext()

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[1]
}

export const NotificationContextProvider = (props) => {

  const [notification, dispatch] = useReducer(notificationReducer, initialState)

  return (
    <NotificationContext.Provider value={[notification, dispatch]} >
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext