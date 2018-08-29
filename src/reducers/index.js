import { combineReducers } from 'redux'
import leadReducer from './leadReducer'
import propertyReducer from './propertyReducer'

export default combineReducers({
  Leads: leadReducer,
  Properties: propertyReducer
})