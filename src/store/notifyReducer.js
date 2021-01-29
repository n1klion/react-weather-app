const SHOW_NOTIFY = 'notifyReducer/SHOW_NOTIFY'
const DELETE_NOTIFY = 'notifyReducer/DELETE_NOTIFY'

const initialState = {
  messagePool: [],
}

function notifyReducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_NOTIFY: {
      return {
        ...state,
        messagePool: [...state.messagePool, action.payload],
      }
    }
    case DELETE_NOTIFY: {
      return {
        ...state,
        messagePool: state.messagePool.filter(item => item.id !== action.payload)
      }
    }
    default:
      return state
  }
}

export function setMessage(msg) {
  return {
    type: SHOW_NOTIFY,
    payload: msg,
  }
}

export function deleteMessage(id) {
  return {
    type: DELETE_NOTIFY,
    payload: id,
  }
}

export default notifyReducer
