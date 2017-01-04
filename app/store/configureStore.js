import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';

export default createStore(rootReducer);