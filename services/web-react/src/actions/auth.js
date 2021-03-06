import {ROOT_API_URL} from "./Base";
import axios from "axios/index";

export const startLogin = (data) => {
    return async (dispatch, getState) => {
        return new Promise(async(resolve, reject) => {
            try {
                const response = await axios.post(`${ROOT_API_URL}/tokens`, data);
                dispatch(token({ ...response.data }));
                resolve(response.data);
            }
            catch (err) {
                reject(err);
            }
        });
    }
};

export const startLogout = (data) => {
    return async (dispatch, getState) => {
        try {
            dispatch(logout({}));
        }
        catch (error) {
            console.log(error);
        }
    }
};

export const startRegister = (data) => {
    return async (dispatch, getState) => {
        return new Promise(async(resolve, reject) => {
            try {
                const response = await axios.post(`${ROOT_API_URL}/users`, data);
                dispatch(token({ ...response.data }));
                resolve(response.body);
            }
            catch (err) {
                console.log(err);
                reject(err);
            }
        });
    }
};

export const token = (data) => ({
    type: 'AUTH_TOKEN',
    data: {
        token: data.token,
        firstName: data.first_name,
        lastName: data.last_name,
        email: data.email,
        isWriter: data.is_writer
    }
});

export const logout = (data) => ({
    type: 'AUTH_LOGOUT'
});
