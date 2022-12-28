import axios from "axios";

import {baseURL} from "../constants";
import {authService} from "./auth.service";
import {createBrowserHistory} from 'history'

const history = createBrowserHistory();

const axiosService = axios.create({
    baseURL
});

axiosService.interceptors.request.use((config) => {
    const access = authService.getAccessToken();
    if (access) config.headers.Authorization = `Bearer ${access}`
    return config
})

let isRefreshing = false

axiosService.interceptors.response.use((config) => {
        return config
    },
    async (error) => {
        const refresh = authService.getRefreshToken();
        if (error.response?.status === 401 && error.config && !isRefreshing && refresh) {
            isRefreshing = true
            // маркер, що ми в процесі refresh
            try {
                // запит на refresh endpoint, вкладаємо токен refresh
                const {data} = await authService.refresh(refresh);
                //     axios повертає нам нові токени access & refresh
                authService.setTokens(data)
                //     записуємо нові токени в localstorage
            } catch (e) {
                //  у випадку коли і refresh токен просрочений:
                authService.deleteTokens()
                //     видаляємо старі токени та потрібно перенаправити на логінацію

                //     для перенаправлення потрібна додаткова ліба history
                //     оскілки, тут не працюють хуки, це не компонент
                return history.replace('/login?ExpSession=true')
                // ExpSession=true - додатковий параметр, що ми передали для позначення, що згорів токен
            }
            isRefreshing = false
            //     закінчився процес refresh
            return axiosService(error.config)
            //     при запиті на "/cars" якщо токен згорів отримуємо помилку 401
            //     відхоплюємо її і робимо новий запит на refresh token, отримали нову пару токенів
            //     тепер відновлюємо запит але вже із новими токенами
        }
        //     випадок коли виникла помилка ми її і повертаємо
        return Promise.reject(error)

    }
)

export {
    axiosService,
    history
}