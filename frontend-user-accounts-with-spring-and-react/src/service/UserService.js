import axios from 'axios'

const LOCAL_HOST_USERS = 'http://localhost:8080/users'

class UserService {

    getAllUsers() {
        return axios.get(`${LOCAL_HOST_USERS}`);
    }

    getUser(id) {
        return axios.get(`${LOCAL_HOST_USERS}/${id}`);
    }

    deleteUser(id) {
        return axios.delete(`${LOCAL_HOST_USERS}/${id}`);
    }

    createUser(user) {
        return axios.post(`${LOCAL_HOST_USERS}/add`, user);
    }

    updateUser(id, user) {
        return axios.put(`${LOCAL_HOST_USERS}/${id}`, user);
    }
}

export default new UserService()