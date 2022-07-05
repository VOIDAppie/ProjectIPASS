import {applyAuthTokenInterceptor, setAuthTokens, clearAuthTokens} from 'axios-jwt';
import axios from 'axios';

const BASE_URL = 'https://ipass-project-1.herokuapp.com'

// 1. Create an axios instance that you wish to apply the interceptor to
export const axiosInstance = axios.create({ baseURL: BASE_URL })

// 2. Define token refresh function.
const requestRefresh = (refresh) => {
    console.log("refreshing token")
    // Notice that this is the global axios instance, not the axiosInstance!  <-- important
    return axios.post(`${BASE_URL}/authenticate`, { refresh })
        .then(response => {
            console.log(response)
            response.data.token
        })
};

// 3. Apply interceptor
applyAuthTokenInterceptor(axiosInstance, {
    requestRefresh,
    header: "Authorization",  // header name
    headerPrefix: "Bearer ",  });  // Notice that this uses the axiosInstance instance.  <-- important

// 4. Logging in
export const login = async (params) => {
    const response = await axiosInstance.post('/authenticate', params)
    // save tokens to storage
    setAuthTokens({
        accessToken: response.data.token,
        refreshToken: response.data.token
    })
}

// 5. Logging out
export const logout = () => clearAuthTokens()

// Now just make all requests using your axiosInstance instance
export const getPosts = () => {
    return axiosInstance.get(`${BASE_URL}/products`).then(response => { console.log(response) })
}