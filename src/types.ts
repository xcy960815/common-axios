import {
    AxiosRequestConfig,
    AxiosInstance,
    AxiosResponse,
    Canceler,
} from 'axios'

export type LogMap = Map<string, Canceler>

export type CreateLoadingNode = (loadingText: string | undefined) => void
export interface AxiosRequestConfigs extends AxiosRequestConfig {
    needLoading?: boolean
    loadingText?: string
    axiosDebounce?: boolean
    contentType?:
        | 'application/json'
        | 'application/x-www-form-urlencoded'
        | ' multipart/form-data'
}

export type CreateAxiosInstance = (config: AxiosRequestConfigs) => AxiosInstance

export type AxiosMethods =
    | 'get'
    | 'post'
    | 'put'
    | 'delete'
    | 'head'
    | 'put'
    | 'patch'

export type AxiosRequestCallback = (
    config: AxiosRequestConfigs
) => AxiosRequestConfig

export type AxiosResponseCallback = (
    axiosResponse: AxiosResponse<{
        code: number
        message: string
        data: any
    }>
) => Promise<{
    code: number
    message: string
    data: any
}>
export type CreateParamHelper = <T = any, R = AxiosResponse<T>>(
    url: string,
    params?: any,
    config?: AxiosRequestConfigs
) => Promise<R>

export type CreateDataHelper = <T = any, R = AxiosResponse<T>>(
    url: string,
    data?: any,
    config?: AxiosRequestConfigs
) => Promise<R>

/**
 * 执行方法返回的对象所包含的属性
 */
export interface AxiosHelpers {
    get: CreateParamHelper
    put: CreateDataHelper
    head: CreateDataHelper
    post: CreateDataHelper
    patch: CreateDataHelper
    // delete: AxiosHelper
    // options: AxiosHelper
}

export type CreateAxios = (
    axiosRequestConfigs: AxiosRequestConfigs
) => AxiosHelpers
