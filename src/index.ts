import axios from 'axios'

import {
    createAxiosInstance,
    createParamsInParamsHelper,
    createParamsInDataHelper,
    createParamsInParamsOrDataHelper,
    axiosRequestCallback,
    axiosRequestErrorCallback,
    axiosResponseCallback,
    axiosResponseErrorCallback,
} from './config'

import { CreateAxios, AxiosHelpers, AxiosRequestConfigs } from './types'
/**
 * @param AxiosRequestConfigs
 */
export const createAxios: CreateAxios = (initAxiosRequestConfig) => {
    const successKey = initAxiosRequestConfig.successKey || 'code'
    const successKeyValue = initAxiosRequestConfig.successKeyValue || 200
    let temSuccessKey: string
    let temSuccessKeyValue: string | number
    /* 创建axios实例 */
    const axiosInstance = createAxiosInstance(initAxiosRequestConfig)

    /** 添加请求拦截器 **/
    axiosInstance.interceptors.request.use(
        (config: AxiosRequestConfigs) => {
            const { successKey, successKeyValue } = config
            temSuccessKey = successKey ? successKey : ''
            temSuccessKeyValue = successKeyValue ? successKeyValue : ''
            return axiosRequestCallback(config)
        },
        (error) => axiosRequestErrorCallback(error)
    )
    /** 添加响应拦截器  **/
    axiosInstance.interceptors.response.use(
        (axiosResponse) =>
            axiosResponseCallback(axiosResponse, {
                // 临时配置的优先级更高
                successKey: temSuccessKey ? temSuccessKey : successKey,
                successKeyValue: temSuccessKeyValue
                    ? temSuccessKeyValue
                    : successKeyValue,
            }),
        (error) => axiosResponseErrorCallback(error)
    )
    const axiosHelpers: AxiosHelpers = {
        // get 请求 参数在 params 里
        get: (url, params, config) => {
            return createParamsInParamsHelper(axiosInstance, 'get')(
                url,
                params,
                config
            )
        },
        // head 请求 参数在 params 里
        head: (url, data, config) => {
            return createParamsInParamsHelper(axiosInstance, 'head')(
                url,
                data,
                config
            )
        },
        // delete 请求 params 和 data 里面都可以传递参数
        delete: (url, params, config) => {
            return createParamsInParamsOrDataHelper(axiosInstance, 'delete')(
                url,
                params,
                config
            )
        },
        // options 请求 params 和 data里面都可以传递参数
        options: (url, params, config) => {
            return createParamsInParamsOrDataHelper(axiosInstance, 'options')(
                url,
                params,
                config
            )
        },
        // post 请求参数在 data里
        post: (url, data, config) => {
            return createParamsInDataHelper(axiosInstance, 'post')(
                url,
                data,
                config
            )
        },
        // put 请求参数在 data里
        put: (url, data, config) => {
            return createParamsInDataHelper(axiosInstance, 'put')(
                url,
                data,
                config
            )
        },
        // patch 请求参数在 data里
        patch: (url, data, config) => {
            return createParamsInDataHelper(axiosInstance, 'patch')(
                url,
                data,
                config
            )
        },
    }

    return axiosHelpers
}
