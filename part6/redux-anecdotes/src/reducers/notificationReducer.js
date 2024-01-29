import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    triggerNotification(state, action) {
      return action.payload
    },
    removeNotification() {
      return ''
    }
  }
})

export const setNotification = (content, time) => {
  return async dispatch => {
    dispatch(triggerNotification(content))
    setTimeout(() => {
      dispatch(removeNotification())
    }, time)
  }
}

export const { triggerNotification, removeNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer