const initialState = [{id: 1, fname: 'Adam'}]

export default function(state = initialState, action){
    switch(action.type){
        case 'UPDATE_LEAD':
            var newState = state.map((v, i) => {
                if(v.ID == action.payload.ID){
                    return action.payload;
                }else{
                    return v;
                }
            })
        return [...newState]
        case 'GET_LEADS':
            return [...action.payload]
        case 'ADD_LEAD':
            return [...action.payload]
        case 'DELETE_LEAD':
            var newState = state.filter((v, i) => {
                return v.ID != action.payload.ID;
            })
            return [...newState]
        default:
            return [...state]
    }
}