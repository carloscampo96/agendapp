import {
    FETCH_TASKS_FAILURE,
    FETCH_TASKS_SUCESS,
    FETCH_TASKS_REQUEST
} from './taskTypes'
import { requestHttp, HTTP_VERBS } from '../../utils/HttpRequest';
import { TASKS } from '../../constants/HttpEndpoints';
import { getToken } from '../../utils/LocalStorageToken';

export const fetchTasks = (filter = {}) => {
    return (dispatch) => {
        dispatch(fecthTaskRequest());
        const callHttp = async (filter) => {
            try {
                const token = getToken();
                const response = await requestHttp(
                    { 
                        method: HTTP_VERBS.GET,
                        token,
                        endpoint: TASKS.getTasks,
                        params: filter
                    }
                );
                dispatch(fecthTaskSuccess(response.data));
            } catch (error) {
                dispatch(fecthTaskFailure(error.response.statusText));
            }
        }
        callHttp(filter);
    }
}

export const fecthTaskRequest = () => {
    return {
        type: FETCH_TASKS_REQUEST
    }
}

export const fecthTaskSuccess = (tasks) => {
    return {
        type: FETCH_TASKS_SUCESS,
        payload: tasks
    }
}

export const fecthTaskFailure = (error) => {
    return {
        type: FETCH_TASKS_FAILURE,
        payload: error
    }
}