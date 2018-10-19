// import { createStore } from '../flux'
import { storeWithHistory, undo, redo } from './history'
import { IMPORT_DATA } from './importExport'

export {
  undo,
  redo,
}

const ADD_TODO = 'ADD_TODO'
const REMOVE_TODO = 'REMOVE_TODO'

export const addTodo = text => ({
  type: ADD_TODO,
  payload: text,
})

export const removeTodo = id => ({
  type: REMOVE_TODO,
  payload: id,
})

const todosReducer = (state, action) => {
  if (action.type === ADD_TODO) {
    return {
      ...state,
      todos: [
        ...state.todos,
        {
          id: new Date().valueOf(),
          text: action.payload,
        }
      ],
    }
  }
  if (action.type === REMOVE_TODO) {
    return {
      ...state,
      todos: state.todos.filter(todo => todo.id !== action.payload),
    }
  }
  if (action.type === IMPORT_DATA) {
     return action.payload.todos.present
  }
  return state
}

const initialState = {
  todos: [],
}

// export const store = createStore(initialState, todosReducer)

export const store = storeWithHistory(initialState, todosReducer)
