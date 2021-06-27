import { requestHttp, HTTP_VERBS } from '../../utils/HttpRequest';
import { TASKS } from '../../constants/HttpEndpoints';
import { getToken, setToken } from '../../utils/LocalStorageToken';
import { redirect } from '../index';
import {
    FETCH_CREATE_TASK_REQUEST,
    FETCH_CREATE_TASK_SUCCESS,
    FETCH_CREATE_TASK_FAILURE
} from './createTaskTypes';


export const fetchCreateTask = (data = {}) => {
    return (dispath) => {
        dispath(fetchCreateTaskRequest);
        const callHttp = async (data) => {
            try {
                const token = getToken();
                const response = await requestHttp (
                    {
                        method: HTTP_VERBS.POST,
                        token,
                        endpoint: TASKS.createTask,
                        data
                    }
                )
                dispath(fetchCreateTaskSuccess(response.data));
                dispath(redirect('/'));
            } catch (error) {
                const messageError = error.response.statusText || 'error';
                dispath(fetchCreateTaskFailure(messageError));
            }
        }
        callHttp(data);
    }
}


export const fetchCreateTaskRequest = () => {
    return {
        type: FETCH_CREATE_TASK_REQUEST
    };
};

export const fetchCreateTaskSuccess = (task) => {
    return {
        type: FETCH_CREATE_TASK_SUCCESS,
        payload: task
    };
};

export const fetchCreateTaskFailure = (error) => {
    return {
        type: FETCH_CREATE_TASK_FAILURE,
        payload: error
    };
};
