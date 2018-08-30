const initialState = []

export default function(state = initialState, action){
    switch(action.type){
        case 'UPDATE_LEAD':
            var newState = state.filter((v, i) => {
                v !== action.payload.LeadID
            })
        return [...newState]
        case 'TOGGLE_LEAD_EDITING':
            var newState;
            if(state.includes(action.payload)){
                newState = state.filter((v, i) => {
                    v !== action.payload
                })
            }else{
                newState = [...state, action.payload]
            }
            return [...newState]
        default:
            return [...state]
    }
}