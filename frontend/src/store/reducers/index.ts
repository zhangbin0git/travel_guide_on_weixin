import { combineReducers } from '@reduxjs/toolkit'
import userReducer from './reducers/user'
import travelReducer from './reducers/travel'

const rootReducer = combineReducers({
  user: userReducer,
  travel: travelReducer
})

export default rootReducer