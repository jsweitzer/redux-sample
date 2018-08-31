const initialState = {field: '', asc: true}

export default function(state = initialState, action){
    switch(action.type){
        case 'APPLY_SORT':
            if(action.payload.field == state.field){
                action.payload.asc = state.asc ? false : true;
            }else{
                action.payload.asc = false
            }
            return action.payload
        default:
            return state
    }
}