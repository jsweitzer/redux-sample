const initialState = [{id: 1, fname: 'Adam'}]

export default function(state = initialState, action){
    switch(action.type){
        case 'GET_LEADS':
            return [...action.payload]
        case 'ADD_LEAD':
            return [...action.payload]
        default:
            return [...state]
    }
}