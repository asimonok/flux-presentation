import React, { Component } from 'react'
import UndoIcon from '@material-ui/icons/Undo'
import RedoIcon from '@material-ui/icons/Redo'
import CloudDownloadIcon from '@material-ui/icons/CloudDownload'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import Todos from './Todos'
import { onExport, dispatcher, todosStore, importData } from './store'
import { getTodos } from './store/selectors'
import { fluxConnect } from './react-flux'
import './App.css'

class App extends Component {
  onImport = event => {
    var reader = new FileReader()
    reader.onload = (event) => {
      const data = JSON.parse(event.target.result)
      dispatcher.dispatch(importData(data))
    }
    reader.readAsText(event.target.files[0])
  }

  render() {
    return (
      <div className='wrapper'>
        <header className='header'>
          <h1 className='title'>TODO</h1>
          <div className='bottomHeader'>
            <div className='buttons'>
              <button
                className='button'
                title='undo'
                onClick={() => dispatcher.dispatch(todosStore.undo())}
              >
                <UndoIcon fontSize='large' />
              </button>
              <button
                className='button'
                title='redo'
                onClick={() => dispatcher.dispatch(todosStore.redo())}
              >
                <RedoIcon fontSize='large' />
              </button>
            </div>
            <div className='buttons'>
              <button className='button' title='export' onClick={onExport}>
                <CloudDownloadIcon fontSize='large' />
              </button>
              <button className='button buttonImport' title='import'>
                <label className='import'>
                  <input type='file' onChange={this.onImport} accept='application/JSON' />
                  <CloudUploadIcon fontSize='large' />
                </label>
              </button>
            </div>
          </div>
        </header>
        <Todos />
        <div className='total'>Total: {this.props.count}</div>
      </div>
    )
  }
}

export default fluxConnect(
  [todosStore.store],
  todosState => ({
    count: getTodos(todosState).length,
  })
)(App)
