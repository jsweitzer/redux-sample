export function setNumerics(numerics){
  return function(dispatch){
    dispatch({
      type: 'SET_NUMERICS',
      payload: numerics
    })
  }
}
export function deleteLead(lead){
  return function(dispatch){
    fetch("http://localhost:38643/api/Lead/DeleteLead", {
      method: 'POST',
      body: JSON.stringify(lead),
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      }
    })
    .then(res => res.json())
    .then(response => dispatch({
      type: 'DELETE_LEAD',
      payload: lead
    }))
  }
}
export function updateLead(lead){
  return function(dispatch){
    fetch("http://localhost:38643/api/Lead/UpdateLead", {
      method: 'POST',
      body: JSON.stringify(lead),
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      }
    })
    .then(res => res.json())
    .then(response => dispatch({
      type: 'UPDATE_LEAD',
      payload: lead
    }))
  }
}
export function toggleEditing(leadId){
  return function(dispatch){
    dispatch({
      type: 'TOGGLE_LEAD_EDITING',
      payload: leadId
    })
  }
}
export function toggleFilterEditing(propName){
  return function(dispatch){
    dispatch({
      type: 'FILTER_EDITING',
      payload: propName
    })
  }
}
export function updateFilter(payload){
  return function(dispatch){
    dispatch({
      type: 'UPDATE_FILTER',
      payload: payload
    })
  }
}
export function applySort(payload){
  return function(dispatch){
    dispatch({
      type: 'APPLY_SORT',
      payload: payload
    })
  }
}
export function addProperty(property){
  return function(dispatch){
    fetch("http://localhost:38643/api/Lead/insertProperty?property="+property)
    .then(res => res.json())
    .then(response => dispatch({
      type: 'ADD_PROPERTY',
      payload: response
    }))
  }
}
export function getProperties(){
  return function(dispatch){
    fetch("http://localhost:38643/api/Lead/Properties")
    .then(res => res.json())
    .then(response => dispatch({
      type: 'GET_PROPERTIES',
      payload: response
    }))
  }
}
export function addLead(lead){
  return function(dispatch){
    fetch("http://localhost:38643/api/Lead/Insert", {
      method: 'POST',
      body: JSON.stringify(lead),
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      }
    })
    .then(res => res.json())
    .then(response => dispatch({
      type: 'ADD_LEAD',
      payload: response
    }))
  }
}
export function applyGroup(propName){
  return function(dispatch){
    dispatch({
      type: 'APPLY_GROUP',
      payload: propName
    })
  }
}
export function getLeads(){
  return function(dispatch){
    fetch("http://localhost:38643/api/Lead/Get")
    .then(res => res.json())
    .then(leads => dispatch({
      type: 'GET_LEADS',
      payload: leads
    }))
  }
}