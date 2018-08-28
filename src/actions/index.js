export function addProperty(property){
  return function(dispatch){
    dispatch({
      type: 'ADD_PROPERTY',
      payload: property
    })
  }
}
export function addLead(lead){
  return function(dispatch){
    dispatch({
      type: 'ADD_LEAD',
      payload: lead
    })
  }
}