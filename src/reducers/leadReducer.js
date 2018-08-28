import Lead from "../components/Lead";

const initialState = [{id: 1, fname: 'Adam'}]

export default function(state = initialState, action){
    switch(action.type){
        case 'GET_LEADS':
            return [...state, action.payload]
        case 'ADD_PROPERTY':
            var props = [];

            for(var property in state[0]){
                if(state[0].hasOwnProperty(property)){
                    props.push(property);
                }
            }

            props.push(action.payload.name);

            var newLeads = state.map((Lead, i) => {
                var newLead = {};
                for(var prop in props){
                    if(props[prop] == action.payload.name){
                        newLead[props[prop]] = action.payload.value
                    }else{
                        newLead[props[prop]] = Lead[props[prop]];
                    }
                }
                return newLead;
            })

            return [...newLeads]
        case 'ADD_LEAD':
            return [...state, action.payload]
        default:
            return [...state]
    }
}