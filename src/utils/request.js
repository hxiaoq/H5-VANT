import axios from "axios";
import { Toast } from "vant";
import store from '@/store'
import { getToken } from "@/utils/auth"

// 创建一个axios实例
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 50000
})

// 请求拦截器
service.interceptors.request.use(
    config => {
        config.url = encodeURI(config.url) //解决中文参数乱码
        if (store.getters.token) {
            config.headers['token'] = getToken()
        }
        return config
    },
    error => {
        console.log(error)
        return Promise.reject(error)
    }
)

// 响应拦截器
service.interceptors.response.use(
    response => {
        const res = response.data
        if (res.code !== 200) {
            Toast.fail(res.msg)
            return Promise.reject(res.msg || '错误')
        } else {
            return res
        }
    },
    error => {
        if (error && error.response) {
            switch (error.response.status) {
                case 400:
                    error.msg = '错误请求'
                    break
                case 401:
                    error.msg = '未授权，请重新登录'
                    break
                case 403:
                    error.msg = '拒绝访问'
                    break
                case 404:
                    error.msg = '请求错误,未找到该资源'
                    break
                case 405:
                    error.msg = '请求方法未允许'
                    break
                case 408:
                    error.msg = '请求超时'
                    break
                case 500:
                    error.msg = '服务器端出错'
                    break
                case 501:
                    error.msg = '网络未实现'
                    break
                case 502:
                    error.msg = '网络错误'
                    break
                case 503:
                    error.msg = '服务不可用'
                    break
                case 504:
                    error.msg = '网络超时'
                    break
                case 505:
                    error.msg = 'http版本不支持该请求'
                    break
                default:
                    error.msg = `未知错误${error.response.status}`
            }
            Toast.fail(error.msg)
        } else {
            error.msg = "连接服务器失败"
        }
        return Promise.reject(error)
    }
)

export default service