import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'
import 'element-ui/lib/theme-chalk/index.css'
// @ts-ignore
import message from 'element-ui/packages/message/index.js'
import { handleAddPending, handleRemovePending } from './config'
import Vue from 'vue'

import {
    CreateAxios,
    CommonAxiosInstance,
    LocalAxiosRequestConfig,
} from './types'
/**
 * @param LocalAxiosRequestConfig
 */
export const createAxios: CreateAxios = (localAxiosRequestConfig) => {
    // loading 实例
    // let loadingInstance: import('element-plus/lib/el-loading/src/loading.type').ILoadingInstance

    /* 创建axios实例 */
    const axiosInstance = axios.create({
        ...localAxiosRequestConfig,
        withCredentials:
            localAxiosRequestConfig &&
            localAxiosRequestConfig.withCredentials !== undefined
                ? localAxiosRequestConfig.withCredentials
                : true,
    } as AxiosRequestConfig)
    // as LocalAxiosInstance

    /** 添加请求拦截器 **/
    axiosInstance.interceptors.request.use(
        (config: LocalAxiosRequestConfig) => {
            const { axiosDebounce } = config
            // 先判断是否需要防抖 如果需要 需要防抖的话 如果接口被取消 就不再需要遮罩层
            if (axiosDebounce) {
                handleRemovePending(config) // 在请求开始前，对之前的请求做检查取消操作
                handleAddPending(config) // 将当前请求添加到 pending 中
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
        (response: AxiosResponse) => {
            console.log('response', response)

            if (response.data.code === 200) {
                return Promise.resolve(response)
            } else {
                Vue.use(
                    message({
                        type: 'error',
                        message: `请求失败，错误原因：${response.data.message}`,
                    })
                )

                return Promise.reject(response.data.message)
            }
        },
        (error: any) => {
            if (axios.isCancel(error)) {
                Vue.use(
                    message({
                        type: 'error',
                        message: `请求被取消`,
                    })
                )
            } else {
                Vue.use(
                    message({
                        type: 'error',
                        message: `请求失败，错误原因：${error}`,
                    })
                )
                return Promise.reject(error)
            }
        }
    )
    const commonAxiosInstance: CommonAxiosInstance = {
        get: (url, params, config) => {
            return axiosInstance
                .get(url, {
                    params,
                    ...config,
                })
                .then((response) => {
                    return response.data
                })
                .catch((error) => {
                    return error
                })
        },
        delete: (url, data, config) => {
            return axiosInstance
                .delete(url, {
                    data,
                    ...config,
                })
                .then((response) => {
                    return response.data
                })
                .catch((error) => {
                    return error
                })
        },
        head: (url, data, config) => {
            return axiosInstance
                .head(url, {
                    data,
                    ...config,
                })
                .then((response) => {
                    return response.data
                })
                .catch((error) => {
                    return error
                })
        },
        post: (url, data, config) => {
            return axiosInstance
                .post(url, data, { ...config })
                .then((response) => {
                    return response.data
                })
                .catch((error) => {
                    return error
                })
        },
        put: (url, data, config) => {
            return axiosInstance
                .put(url, data, { ...config })
                .then((response) => {
                    return response.data
                })
                .catch((error) => {
                    return error
                })
        },
        patch: (url, data, config) => {
            return axiosInstance
                .patch(url, data, { ...config })
                .then((response) => {
                    return response.data
                })
                .catch((error) => {
                    return error
                })
        },
        options: (url, data, config) => {
            return axiosInstance
                .options(url, { data, ...config })
                .then((response) => {
                    return response.data
                })
                .catch((error) => {
                    return error
                })
        },
    }

    return commonAxiosInstance
}
