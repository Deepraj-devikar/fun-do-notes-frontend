import axios from 'axios';

const instance = axios.create({
    baseURL: `http://localhost:3000/api/v1/users/`,
    timeout: 1000
});

export const SignInApi = (data) => {
    return instance.post(`login`, data);
};

export const SignUpApi = (data) => {
    return instance.post(`register`, data);
}