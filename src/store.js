import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'
import { loadState, saveState } from './localStorage'

const defaultState = { 
    Leads: [{LeadID: 1, FirstName: 'Adam', LastName: 'Warlock', Email: 'awarlock@marvel.com'}], 
    Properties: []};
const initialState = defaultState;//loadState() || defaultState;

const middleware = [thunk];

const store = createStore(
    rootReducer, 
    initialState,
    compose(
        applyMiddleware(...middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

store.subscribe(() => {
    //saveState(store.getState());
});

export default store;