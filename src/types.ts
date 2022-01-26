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

export type CreateParamHelper = (
    axiosInstance: AxiosInstance,
    method: AxiosMethods
) => (
    url: string,
    params?: any,
    config?: AxiosRequestConfigs | undefined
) => Promise<any>

export type CreateDataHelper = (
    axiosInstance: AxiosInstance,
    method: AxiosMethods
) => (
    url: string,
    data: any,
    config: AxiosRequestConfigs | undefined
) => Promise<any>

/**
 * 执行方法返回的对象所包含的属性
 */
export interface CommonAxiosInstance {
    get: CreateParamHelper
    // put: CreateDataHelper
    // head: CreateDataHelper
    // post: CreateDataHelper
    // patch: CreateDataHelper

    // delete: AxiosHelper
    // options: AxiosHelper
}

export type CreateAxios = (
    axiosRequestConfigs: AxiosRequestConfigs
) => CommonAxiosInstance
