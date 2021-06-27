import { combineReducers } from 'redux';
import tasksReducer from './tasks/taskReducer';
import userReducer from './user/userReducer';
import createTaskReducer from './createTask/createTaskReducer';
import redirectReducer from './redirect/redirectReducer';

const rootReducer = combineReducers({
    task: tasksReducer,
    user: userReducer,
    createTask: createTaskReducer,
    redirect: redirectReducer
});

export default rootReducer