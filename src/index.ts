import axios from 'axios'

import {
    createAxiosInstance,
    createParamHelper,
    createDataHelper,
    axiosRequestCallback,
    axiosResponseCallback,
} from './config'

import { CreateAxios, AxiosHelpers, AxiosRequestConfigs } from './types'
/**
 * @param AxiosRequestConfigs
 */
export const createAxios: CreateAxios = (initAxiosRequestConfig) => {
    /* 创建axios实例 */
    const axiosInstance = createAxiosInstance(initAxiosRequestConfig)

    /** 添加请求拦截器 **/
    axiosInstance.interceptors.request.use(
        (config: AxiosRequestConfigs) => axiosRequestCallback(config),
        (error: any) => Promise.reject(error)
    )
    /** 添加响应拦截器  **/
    axiosInstance.interceptors.response.use(
        (axiosResponse) => {
            axiosResponseCallback(axiosResponse)
        },
        (error: any) => {
            if (axios.isCancel(error)) {
            } else {
                return Promise.reject(error)
            }
        }
    )
    const axiosHelpers: AxiosHelpers = {
        get: (url, params, config) => {
            return createParamHelper(axiosInstance, 'get')(url, params, config)
        },
        head: (url, data, config) => {
            return createDataHelper(axiosInstance, 'head')(url, data, config)
        },
        post: (url, data, config) => {
            return createDataHelper(axiosInstance, 'post')(url, data, config)
        },
        put: (url, data, config) => {
            return createDataHelper(axiosInstance, 'put')(url, data, config)
        },
        patch: (url, data, config) => {
            return createDataHelper(axiosInstance, 'patch')(url, data, config)
        },
    }

    return axiosHelpers
}

// options: (url, data, config) => {
//     return axiosInstance
//         .options(url, { data, ...config })
//         .then((response) => {
//             return response.data
//         })
//         .catch((error) => {
//             return error
//         })
// },
// delete: (url, data, config) => {
//     return axiosInstance
//         .delete(url, {
//             data,
//             ...config,
//         })
//         .then((response) => {
//             return response.data
//         })
//         .catch((error) => {
//             return error
//         })
// },
