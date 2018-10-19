import saveAs from 'file-saver'
import * as todosStore from './todos'
import { importData } from './importExport'
import { dispatcher } from '../flux'

const getData = () => ({
  todos: todosStore.store.getState(),
})

export const onExport = () => {
  const blob = new Blob(
    [JSON.stringify(getData(), null, 2)],
    {
      type: 'text/json;charset=utf-8',
    },
  )
  saveAs(blob, `todos-${new Date().valueOf()}.json`)
}

export {
  todosStore,
  dispatcher,
  importData,
}
