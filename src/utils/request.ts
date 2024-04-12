
import axios, { type AxiosInstance } from "axios";
import { showToast } from "vant"
import { useUserStore } from "@/stores/user";


class Interceptors {
    instance: AxiosInstance;
    constructor() {
        this.instance = axios.create({
            baseURL: import.meta.env.VITE_BASE_API,
            timeout: 10000,
        });
    }
    // 初始化拦截器
    init() {
        // 请求接口拦截器
        this.instance.interceptors.request.use(
            (config: any) => {
                const { user } = useUserStore();

                if (user.token) config.headers.Authorization = `Bearer ${user.token}`

                return config;
            },
            (err: any) => {
                console.error(err);
            }
        );

        // 响应拦截器
        this.instance.interceptors.response.use(
            (response: any) => {
                const res = response.data;
                if (!response.status.toString().startsWith("2") || res.code === -1) {
                    console.error("系统错误，请检查API是否正常！");
                    return;
                }
                if (res.success) {
                    return res.data;
                }
                return response.data;
            },
            (error: any) => {
                let errorRes = error.response;
                if (errorRes.status === 0) {
                    errorRes = "连接出错，请确认网络是否正常";
                }
                else {
                    errorRes = errorRes.data && errorRes.data.detail || error;
                }
                showToast(errorRes)
                throw new Error(error);
            }
        );
    }
}

const interceptors = new Interceptors();
interceptors.init();
const request = interceptors.instance


const get = <T>(url: string, params = {}, props = {}): Promise<T> => {
    return request({
        url,
        method: 'get',
        params,
        ...props
    })
}

const put = (url: string, data = {}) => {
    return request({
        url,
        method: 'put',
        data
    })
}

const post = <T>(url: string, data = {}): Promise<T> => {
    return request({
        url,
        method: 'post',
        data
    })
}

const del = (url: string, data = {}) => {
    return request({
        url,
        method: 'delete',
        data
    })
}

export {
    get,
    post,
    del,
    put,
    Interceptors
}
