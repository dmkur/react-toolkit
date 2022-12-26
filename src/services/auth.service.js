import {axiosService} from "./axios.service";
import {urls} from "../constants";

const authService = {
    login: (user) => axiosService.post(urls.auth, user),
    register: (user) => axiosService.post(urls.users, user)
}

export {authService}
