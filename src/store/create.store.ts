import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { rootReducer } from './root.reducer'
import { defaulStore } from './root'
import { composeWithDevTools } from 'redux-devtools-extension'

// configure redux
export const store = createStore(
  rootReducer,
  defaulStore,
  composeWithDevTools(applyMiddleware(
    thunkMiddleware
  ))
)
