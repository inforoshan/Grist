import axios from "axios";

import authHeader from './auth-header';
import AuthService from "./auth-service";

const API_URL = 'http://localhost:9192/api/user/';

class UserService {

    register(userDate) {
        return axios.post(API_URL + 'register', {userId: userDate.userId,
            customerId: userDate.customerId,
            userName: userDate.userName,
            password: userDate.password,
            email: userDate.email,
            roleId:userDate.role,}, {headers: authHeader()});
    }

    update(userDate) {
        return axios.put(API_URL + 'update', userDate, {headers: authHeader()});
    }

    getUserDataByCustomerId(customerId) {
        return axios.get(API_URL + "getUserByCustomerId", {
            headers: authHeader(),
            params: {customerId: customerId}
        });
    }

    getUserDataById(userId) {
        return axios.get(API_URL + "getUserById", {
            headers: authHeader(),
            params: {userId: userId}
        });
    }

    delete(userId) {
        return axios.delete(API_URL + 'delete', {
            headers: authHeader(),
            params: {userId: userId}
        });
    }
}

export default new UserService()