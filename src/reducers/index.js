import { combineReducers } from 'redux'
import leadReducer from './leadReducer'
import propertyReducer from './propertyReducer'
import editingReducer from './editingReducer'

export default combineReducers({
  Leads: leadReducer,
  Properties: propertyReducer,
  Editing: editingReducer
})