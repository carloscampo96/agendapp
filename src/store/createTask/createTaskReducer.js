import {
    FETCH_CREATE_TASK_REQUEST,
    FETCH_CREATE_TASK_SUCCESS,
    FETCH_CREATE_TASK_FAILURE
} from './createTaskTypes';

const initialState = {
    loading: false,
    error: '',
    task: {}
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_CREATE_TASK_REQUEST:
            return {
                ...state,
                loading: true
            };
        case FETCH_CREATE_TASK_SUCCESS:
            return {
                ...state,
                loading: false,
                error: '',
                task: action.payload
            };
        case FETCH_CREATE_TASK_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                task: {}
            };
        default: return state
    }
};

export default reducer;