const initialState = [{}]

export default function(state = initialState, action){
    switch(action.type){
        case 'GET_PROPERTIES':
            if(state.length == 0){
                return [...action.payload]
            }
            var newState = action.payload.map((v, i) => {
                for(var z = 0; z < state.length; z++){
                    if(state[z].Name  == v.Name)
                        v = Object.assign({}, state[z])
                }
                return v;
            })
            return [...newState]
        case 'ADD_PROPERTY':
            return [...state, action.payload]
        case 'UPDATE_FILTER':
            var newState = state.map((v, i) => {
                if(v.Name == action.payload.Name){
                    var newV = Object.assign({}, v);
                    newV.filter = action.payload.Value;
                    return newV;
                }
                return v;
            })
            return [...newState]
        case 'FILTER_EDITING':
            var newState = state.map((v, i) => {
                if(v.Name == action.payload){
                    var newV = Object.assign({}, v);
                    newV.isEditing = !newV.isEditing;
                    return newV;
                }
                return v;
            })
            return [...newState]
        default:
            return [...state]
    }
}