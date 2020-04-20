import { combineReducers } from 'redux';
import todoApp from './example.reducer';
import navigation from './navigation.reducer';

const createReducer = combineReducers({
  todoApp,
  navigation
});

export default createReducer;
