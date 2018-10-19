import React from 'react'
import { fluxConnect } from './react-flux'
import { messageStore, dispatcher } from './store'

class Message extends React.Component {
  render () {
    console.log(this.props)
    return (
      <div>
        {this.props.message}
        <button onClick={() => dispatcher.dispatch({
          type: 'test',
        })}>
          test
        </button>
        <button onClick={() => dispatcher.dispatch({
          type: 'test2',
        })}>
          test2
        </button>
      </div>
    )
  }
}

export default fluxConnect(
  [messageStore],
  state => {
    return {
      message: state.message,
    }
  },
)(Message)
