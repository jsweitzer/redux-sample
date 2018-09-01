import { combineReducers } from 'redux'
import leadReducer from './leadReducer'
import propertyReducer from './propertyReducer'
import editingReducer from './editingReducer'
import sortReducer from './sortReducer'
import groupReduer from './groupReducer'

export default combineReducers({
  Leads: leadReducer,
  Properties: propertyReducer,
  Editing: editingReducer,
  Sort: sortReducer,
  Group: groupReduer
})