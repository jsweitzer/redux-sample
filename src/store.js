import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'
import { loadState, saveState } from './localStorage'

const defaultState = { 
    Leads: [{id: 1, fname: 'Adam', lname: 'Warlock', email: 'awarlock@marvel.com'}], 
    Properties: [{id: 1, name: 'Shoe Size', value: '9'}]};
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