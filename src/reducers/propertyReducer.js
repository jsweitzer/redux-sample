const initialState = [{}]

export default function(state = initialState, action){
    switch(action.type){
        case 'GET_PROPERTIES':
            return [...action.payload]
        case 'ADD_PROPERTY':
            return [...state, action.payload]
        default:
            return [...state]
    }
}