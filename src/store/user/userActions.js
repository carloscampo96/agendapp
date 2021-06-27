import { requestHttp, HTTP_VERBS } from '../../utils/HttpRequest';
import { USERS } from '../../constants/HttpEndpoints';
import {
    FETCH_LOGIN_REQUEST, 
    FETCH_LOGIN_SUCCESS, 
    FETCH_LOGIN_FAILURE,
    AUTOLOGIN_SUCCESS,
    AUTOLOGIN_FAILURE,
    FETCH_USERS_REQUEST,
    FETCH_USERS_SUCCESS,
    FETCH_USERS_FAILURE
} from './userTypes'
import { getToken, setToken } from '../../utils/LocalStorageToken';


export const fetchLogin = (credentials = {}) => {
    return (dispatch) => {
        dispatch(fetchLoginRequest());
        const callHttp = async (credentials) => {
            try {
                const token = getToken();
                const response = await requestHttp(
                    { 
                        method: HTTP_VERBS.POST,
                        token,
                        endpoint: USERS.login,
                        data: credentials
                    }
                );
                setToken(response.data.token);
                dispatch(fetchLoginSuccess());
            } catch (error) {
                const messageError = error.response.statusText || 'error';
                dispatch(fetchLoginFailure(messageError));
            }
        };
        callHttp(credentials);
    };
};

export const fetchUsers = () => {
    return (dispatch) => {
        dispatch(fetchUserRequest);
        const callHttp = async () => {
            try {
                const token = getToken();
                const response = await requestHttp(
                    {
                        method: HTTP_VERBS.GET,
                        token,
                        endpoint: USERS.getUsers,
                    }
                );
                dispatch(fetchUserSuccess(response.data));
            } catch (error) {
                const messageError = error.response.statusText || 'error';
                dispatch(fetchUserFailure(messageError));
            }
        }
        callHttp();
    }
}

export const fetchUserRequest = () => {
    return {
        type: FETCH_USERS_REQUEST
    };
};

export const fetchUserSuccess = (users) => {
    return {
        type: FETCH_USERS_SUCCESS,
        payload: users
    };
};

export const fetchUserFailure = (error) => {
    return {
        type: FETCH_USERS_FAILURE,
        payload: error
    };
};


export const fetchLoginRequest = () => {
    return {
        type: FETCH_LOGIN_REQUEST,
    };
};

export const fetchLoginSuccess = () => {
    return {
        type: FETCH_LOGIN_SUCCESS
    };
};

export const fetchLoginFailure = (error) => {
    return {
        type: FETCH_LOGIN_FAILURE,
        payload: error
    };
};

export const autologinFailure = () => {
    return {
        type: AUTOLOGIN_FAILURE
    }
};

export const autologinSuccess = () => {
    return {
        type: AUTOLOGIN_SUCCESS
    }
};

export const autoLogin = () => {
    return (dispatch) => {
        const callHttp = async () => {
            try {
                const token = getToken();
                await requestHttp(
                    { 
                        method: HTTP_VERBS.POST,
                        endpoint: USERS.check,
                        token
                    }
                );
                dispatch(autologinSuccess());
            } catch (error) {
                dispatch(autologinFailure());
            }
        };
        callHttp();
    }
}
