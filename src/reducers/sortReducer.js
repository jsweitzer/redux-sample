const initialState = ''

export default function(state = initialState, action){
    switch(action.type){
        case 'APPLY_SORT':
            return action.payload
        default:
            return state
    }
}