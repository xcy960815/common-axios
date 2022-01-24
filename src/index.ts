import axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css'
import { Message } from 'element-ui'
import { handleAddPending, handleRemovePending } from './config'

import {
    AxiosResponse,
    CreateAxios,
    CommonAxiosInstance,
    AxiosRequestConfig,
    LocalAxiosRequestConfig,
    LocalAxiosInstance,
} from '../types/index'
/**
 * @param baseURL
 * 后端项目地址的域名+端口
 * @param url
 * 接口的详细地址
 * @param data
 * 请求参数
 * @param contentType
 * 请求头
 * @param baseURL
 * 具体接口的 baseURL
 */
export const createAxios: CreateAxios = (axiosRequestConfig) => {
    // loading 实例
    // let loadingInstance: import('element-plus/lib/el-loading/src/loading.type').ILoadingInstance

    /* 创建axios实例 */
    const axiosInstance = axios.create({
        ...axiosRequestConfig,
        timeout:
            axiosRequestConfig && axiosRequestConfig.timeout
                ? axiosRequestConfig.timeout
                : 3000,
        withCredentials:
            axiosRequestConfig &&
            axiosRequestConfig.withCredentials !== undefined
                ? axiosRequestConfig.withCredentials
                : true,
    } as AxiosRequestConfig) as LocalAxiosInstance

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

    const commonAxiosInstance: CommonAxiosInstance = {
        get: (
            url,
            params,
            {
                baseURL,
                needLoading,
                loadingText,
                withCredentials,
                axiosDebounce,
            } = {}
        ) => {
            return axiosInstance
                .get(url, {
                    params,
                    baseURL,
                    withCredentials:
                        withCredentials === undefined ? true : withCredentials,
                    needLoading,
                    loadingText,
                    axiosDebounce,
                })
                .then((response) => {
                    return response.data
                })
                .catch((error) => {
                    return error
                })
        },
        post: (
            url,
            data,
            {
                contentType,
                baseURL,
                needLoading,
                loadingText,
                withCredentials,
                axiosDebounce,
            } = {}
        ) => {
            contentType = contentType || 'application/json'
            return axiosInstance
                .post(url, {
                    data,
                    baseURL,
                    withCredentials:
                        withCredentials === undefined ? true : withCredentials,
                    headers: {
                        contentType,
                        loadingText,
                        needLoading,
                        axiosDebounce,
                    },
                })
                .then((response) => {
                    return response.data
                })
                .catch((error) => {
                    return error
                })
        },
        delete: (
            url,
            data,
            {
                baseURL,
                needLoading,
                loadingText,
                withCredentials,
                contentType,
                axiosDebounce,
            } = {}
        ) => {
            contentType = contentType || 'application/json'
            return axiosInstance
                .delete(url, {
                    baseURL,
                    data,
                    withCredentials:
                        withCredentials === undefined ? true : withCredentials,
                    headers: {
                        contentType,
                        needLoading,
                        loadingText,
                        axiosDebounce,
                    },
                })
                .then((response) => {
                    return response.data
                })
                .catch((error) => {
                    return error
                })
        },
    }
    /** 添加响应拦截器  **/
    axiosInstance.interceptors.response.use(
        (response: AxiosResponse) => {
            if (response.data.code === 200) {
                Message.success('请求成功')
                return Promise.resolve(response)
            } else {
                Message.error(`请求失败，错误原因：${response.data.message}`)
                return Promise.reject(response.data.message)
            }
        },
        (error: any) => {
            if (axios.isCancel(error)) {
                Message.error('请求被取消')
            } else {
                Message.error(`请求失败，错误原因：${error}`)
                return Promise.reject(error)
            }
        }
    )
    return commonAxiosInstance
}
