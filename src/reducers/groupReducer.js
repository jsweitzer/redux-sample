const initialState = {grouper: '', numerics: {}}

export default function(state = initialState, action){
    switch(action.type){
        case 'APPLY_GROUP':
            if(action.payload == state.grouper)
                return initialState
            var newstate = Object.assign({}, state);
            newstate.grouper = action.payload;
            return newstate;
        case 'SET_NUMERICS':
            var newstate = Object.assign({}, state);
            newstate.numerics = action.payload;
            return newstate;
        default:
            return state
    }
}