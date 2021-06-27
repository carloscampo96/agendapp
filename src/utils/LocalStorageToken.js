export const TOKEN = 'TOKEN';

export const getToken = () => {
    return localStorage.getItem(TOKEN);
}

export const setToken = (value) => {
    return localStorage.setItem(TOKEN, value);
}