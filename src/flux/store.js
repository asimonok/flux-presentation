const createDispatcher = () => {
  const reducers = []
  const dispatch = action => reducers.forEach(reducer => reducer(action))
  const addReducer = reducer => reducers.push(reducer)

  return {
    dispatch,
    addReducer,
  }
}

export const dispatcher = createDispatcher()

const createStoreCreator = dispatcher => (initialState, reducer) => {
  let state = initialState
  let subscribers = []

  const createUnsubscribe = callback => () => {
    subscribers = subscribers.filter(item => item !== callback)
  }

  const getState = () => state

  dispatcher.addReducer(action => {
    const newState = reducer(getState(), action)
    if (newState !== state) {
      state = newState
      subscribers.forEach(callback => callback({
        getState,
        unsubscribe: createUnsubscribe(callback),
      }))
    }
  })

  const subscribe = callback => {
    subscribers.push(callback)
    return createUnsubscribe(callback)
  }

  return {
    getState,
    subscribe,
  }
}

export const createStore = createStoreCreator(dispatcher)

// counter store
const INCREMENT = 'INCREMENT'
const DECREMENT = 'DECREMENT'
const SET_COUNTER = 'SET_COUNTER'

const increment = () => ({
  type: INCREMENT,
})

const decrement = () => ({
  type: DECREMENT,
})

const setCounter = value => ({
  type: SET_COUNTER,
  payload: value,
})

const counterReducer = (state, action) => {
  if (action.type === INCREMENT) {
    return state + 1
  }
  if (action.type === DECREMENT) {
    return state - 1
  }
  if (action.type === SET_COUNTER) {
    return action.payload
  }
  return state
}

const counterStore = createStore(0, counterReducer)

console.log('counterStore', counterStore)
console.log('counterState', counterStore.getState())

const unsubscribe = counterStore.subscribe(({ getState }) => {
  console.log('subscriber counter', getState())
})

dispatcher.dispatch(increment())
dispatcher.dispatch(increment())
dispatcher.dispatch(decrement())
dispatcher.dispatch(setCounter(15))
unsubscribe()
dispatcher.dispatch(decrement())


