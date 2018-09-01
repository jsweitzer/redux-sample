const initialState = ''

export default function(state = initialState, action){
    switch(action.type){
        case 'APPLY_GROUP':
            if(action.payload == state)
                return ''
            return action.payload
        default:
            return state
    }
}