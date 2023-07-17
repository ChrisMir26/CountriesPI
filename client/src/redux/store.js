import { applyMiddleware, createStore, compose } from 'redux';
import rootReducer from "./reducer.js"
import thunkMiddleWare from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';


const store = createStore(rootReducer,
     composeWithDevTools(applyMiddleware(thunkMiddleWare),
    // other store enhancers if any
  ));


export default store