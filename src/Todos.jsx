import React, { Component } from 'react'
import AddIcon from '@material-ui/icons/Add'
import CloseIcon from '@material-ui/icons/Close'
import { fluxConnect } from './react-flux'
import { todosStore, dispatcher } from './store'
import { getTodos } from './store/selectors'
import './Todos.css'

class Todos extends Component {
  state = {
    newTodo: '',
  }

  onChange = event => {
    this.setState({
      newTodo: event.target.value,
    })
  }

  onAddTodo = event => {
    event.preventDefault()

    if (this.state.newTodo.trim()) {
      dispatcher.dispatch(todosStore.addTodo(this.state.newTodo))
      this.setState({
        newTodo: '',
      })
    }
  }

  render () {
    const {
      todos = [],
    } = this.props

    return (
      <React.Fragment>
        <form className='addTodo' onSubmit={this.onAddTodo}>
          <input
            value={this.state.newTodo}
            onChange={this.onChange}
            className='addTodoField'
            placeholder='New todo'
          />
          <button className='addTodoButton'>
            <AddIcon fontSize='large' />
          </button>
        </form>
        <ul className='todos'>
          {todos.map(({ id, text }) => (
            <li key={id} className='todo'>
              <span>{text}</span>
              <button
                onClick={() => dispatcher.dispatch(todosStore.removeTodo(id))}
                className='removeButton'
              >
                <CloseIcon />
              </button>
            </li>
          ))}
        </ul>
      </React.Fragment>
    )
  }
}

export default fluxConnect(
  [todosStore.store],
  todosState => ({
    todos: getTodos(todosState),
  }),
)(Todos)

