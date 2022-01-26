import axios, { AxiosResponse } from 'axios'

import {
    handleAddResponseLog,
    handleRemoveResponseLog,
    createLoadingNode,
    createAxiosInstance,
    createParamHelper,
    createDataHelper,
} from './config'

import { CreateAxios, CommonAxiosInstance, AxiosRequestConfigs } from './types'
/**
 * @param AxiosRequestConfigs
 */
export const createAxios: CreateAxios = (initAxiosRequestConfig) => {
    /* 创建axios实例 */
    const axiosInstance = createAxiosInstance(initAxiosRequestConfig)

    /** 添加请求拦截器 **/
    axiosInstance.interceptors.request.use(
        (config: AxiosRequestConfigs) => {
            // 如果需要遮罩层 那就创建遮罩层节点
            // if (needLoading) createLoadingNode(loadingText)
            const { axiosDebounce } = config
            // 先判断是否需要防抖 如果需要 需要防抖的话 如果接口被取消 就不再需要遮罩层
            if (axiosDebounce) {
                handleRemoveResponseLog(config) // 在请求开始前，对之前的请求做检查取消操作
                handleAddResponseLog(config) // 将当前请求添加到 pending 中
            }
            return config
        },
        (error: any) => {
            // 对请求错误做些什么
            return Promise.reject(error)
        }
    )
    /** 添加响应拦截器  **/
    axiosInstance.interceptors.response.use(
        (axiosResponse: AxiosResponse) => {
            if (axiosResponse.data.code === 200) {
                return Promise.resolve(axiosResponse.data)
            } else {
                return Promise.reject(axiosResponse.data.message)
            }
        },
        (error: any) => {
            if (axios.isCancel(error)) {
            } else {
                return Promise.reject(error)
            }
        }
    )
    const commonAxiosInstance: CommonAxiosInstance = {
        get: createParamHelper(axiosInstance, 'get'),
        // head: createDataHelper(axiosInstance, 'head'),
        // post: createDataHelper(axiosInstance, 'post'),
        // put: createDataHelper(axiosInstance, 'put'),
        // patch: createDataHelper(axiosInstance, 'patch'),
    }

    return commonAxiosInstance
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
