import { AxiosRequestConfig, AxiosInstance } from 'axios'

/**
 * 重写 AxiosRequestConfig
 * 添加 needLoading、loadingText、axiosDebounce 三个属性
 */
export interface LocalAxiosRequestConfig extends AxiosRequestConfig {
    needLoading?: boolean
    loadingText?: string
    axiosDebounce?: boolean
}
/**
 * 重写 AxiosInstance 里面的请求方法的 config 类型
 */
export interface LocalAxiosInstance
    extends Pick<
        AxiosInstance,
        Exclude<
            keyof AxiosInstance,
            'get' | 'post' | 'delet' | 'head' | 'options' | 'put' | 'patch'
        >
    > {
    get(
        url: string,
        config?: LocalAxiosRequestConfig
    ): Promise<{
        code: number
        message: string
        data: any
    }>
    // delete(
    //     url: string,
    //     config?: LocalAxiosRequestConfig
    // ): Promise<{
    //     code: number
    //     message: string
    //     data: any
    // }>
    head(
        url: string,
        config?: LocalAxiosRequestConfig
    ): Promise<{
        code: number
        message: string
        data: any
    }>
    options(
        url: string,
        config?: LocalAxiosRequestConfig
    ): Promise<{
        code: number
        message: string
        data: any
    }>
    post(
        url: string,
        data?: any,
        config?: LocalAxiosRequestConfig
    ): Promise<{
        code: number
        message: string
        data: any
    }>
    put(
        url: string,
        data?: any,
        config?: LocalAxiosRequestConfig
    ): Promise<{
        code: number
        message: string
        data: any
    }>
    patch(
        url: string,
        data?: any,
        config?: LocalAxiosRequestConfig
    ): Promise<{
        code: number
        message: string
        data: any
    }>
}

type AxiosHelper = (
    url: string,
    data?: any,
    config?: LocalAxiosRequestConfig
) => Promise<LocalAxiosInstance>

/**
 * 执行方法返回的对象所包含的属性
 */
export interface CommonAxiosInstance {
    get: AxiosHelper
    post: AxiosHelper
    put: AxiosHelper
    patch: AxiosHelper
    delete: AxiosHelper
    head: AxiosHelper
    options: AxiosHelper
}

export type CreateAxios = (
    axiosRequestConfig: LocalAxiosRequestConfig
) => CommonAxiosInstance
