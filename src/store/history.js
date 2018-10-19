import { IMPORT_DATA } from './importExport'
import { createStore } from '../flux'

const UNDO = 'UNDO'
const REDO = 'REDO'

export const undo = () => ({
  type: UNDO,
})

export const redo = () => ({
  type: REDO,
})

const getInitialState = state => ({
  past: [],
  present: state,
  future: [],
})

export const storeWithHistory = (initialState, reducer) => {
  const historyReducer = (state, action) => {
    if (action.type === UNDO && state.past.length) {
      const newPresent = state.past[state.past.length - 1]
      return {
        past: state.past.slice(0, state.past.length -1),
        present: newPresent,
        future: [state.present].concat(state.future),
      }
    }

    if (action.type === REDO && state.future.length) {
      const newPresent = state.future[0]
      return {
        past: [
          ...state.past,
          state.present,
        ],
        present: newPresent,
        future: state.future.slice(1, state.future.length),
      }
    }

    const newPresent = reducer(state.present, action)

    if (action.type === IMPORT_DATA) {
      return {
        past: [],
        present: newPresent,
        future: [],
      }
    }

    if (state.present !== newPresent) {
      return {
        past: [
          ...state.past,
          state.present,
        ],
        present: newPresent,
        future: [],
      }
    }

    return state
  }

  const state = getInitialState(initialState)

  return createStore(state, historyReducer)
}
