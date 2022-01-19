export {
    Canceler,
    AxiosResponse,
    AxiosRequestConfig,
    AxiosTransformer,
    AxiosResponse,
    AxiosInstance,
    TransitionalOptions,
} from 'axios'

/**
 * 重写 AxiosRequestConfig
 * 添加 needLoading、loadingText、axiosDebounce 三个属性
 */
export interface LocalAxiosRequestConfig {
    url?: string
    method?: Method
    baseURL?: string
    transformRequest?: AxiosTransformer | AxiosTransformer[]
    transformResponse?: AxiosTransformer | AxiosTransformer[]
    headers?: any
    params?: any
    paramsSerializer?: (params: any) => string
    data?: any
    timeout?: number
    timeoutErrorMessage?: string
    withCredentials?: boolean
    adapter?: AxiosAdapter
    auth?: AxiosBasicCredentials
    responseType?: ResponseType
    xsrfCookieName?: string
    xsrfHeaderName?: string
    onUploadProgress?: (progressEvent: any) => void
    onDownloadProgress?: (progressEvent: any) => void
    maxContentLength?: number
    validateStatus?: ((status: number) => boolean) | null
    maxBodyLength?: number
    maxRedirects?: number
    socketPath?: string | null
    httpAgent?: any
    httpsAgent?: any
    proxy?: AxiosProxyConfig | false
    cancelToken?: CancelToken
    decompress?: boolean
    transitional?: TransitionalOptions
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
        success: boolean
        data: any
    }>
    delete(
        url: string,
        config?: LocalAxiosRequestConfig
    ): Promise<{
        code: number
        message: string
        success: boolean
        data: any
    }>
    head(
        url: string,
        config?: LocalAxiosRequestConfig
    ): Promise<{
        code: number
        message: string
        success: boolean
        data: any
    }>
    options(
        url: string,
        config?: LocalAxiosRequestConfig
    ): Promise<{
        code: number
        message: string
        success: boolean
        data: any
    }>
    post(
        url: string,
        data?: any,
        config?: LocalAxiosRequestConfig
    ): Promise<{
        code: number
        message: string
        success: boolean
        data: any
    }>
    put(
        url: string,
        data?: any,
        config?: LocalAxiosRequestConfig
    ): Promise<{
        code: number
        message: string
        success: boolean
        data: any
    }>
    patch(
        url: string,
        data?: any,
        config?: LocalAxiosRequestConfig
    ): Promise<{
        code: number
        message: string
        success: boolean
        data: any
    }>
}
/**
 * 执行方法返回的对象所包含的属性
 */
export interface EasyAxiosInstance {
    get: (
        url: string,
        data?: any,
        {
            baseURL,
            needLoading,
            loadingText,
            withCredentials,
            axiosDebounce,
        }?: {
            baseURL?: string
            needLoading?: boolean
            loadingText?: string
            withCredentials?: boolean
            axiosDebounce?: boolean
        }
    ) => Promise<LocalAxiosInstance>
    post?: (
        url: string,
        data?: any,
        {
            contentType,
            baseURL,
            needLoading,
            loadingText,
            withCredentials,
            axiosDebounce,
        }?: {
            contentType?:
                | 'application/x-www-form-urlencoded'
                | 'multipart/form-data'
                | 'application/json'
            baseURL?: string
            needLoading?: true | false
            loadingText?: string
            withCredentials?: boolean
            axiosDebounce?: boolean
        }
    ) => Promise<LocalAxiosInstance>
    put?: (
        url: string,
        data?: any,
        {
            contentType,
            baseURL,
            needLoading,
            loadingText,
            withCredentials,
            axiosDebounce,
        }?: {
            contentType?:
                | 'application/x-www-form-urlencoded'
                | 'multipart/form-data'
                | 'application/json'
            baseURL?: string
            needLoading?: true | false
            loadingText?: string
            withCredentials?: boolean
            axiosDebounce?: boolean
        }
    ) => Promise<LocalAxiosInstance>
    delete?: (
        url: string,
        data?: any,
        {
            contentType,
            baseURL,
            needLoading,
            loadingText,
            withCredentials,
            axiosDebounce,
        }?: {
            contentType?:
                | 'application/x-www-form-urlencoded'
                | 'multipart/form-data'
                | 'application/json'
            baseURL?: string
            needLoading?: true | false
            loadingText?: string
            withCredentials?: boolean
            axiosDebounce?: boolean
        }
    ) => Promise<LocalAxiosInstance>
}
export type EasyAxios = (
    axiosRequestConfig?: LocalAxiosRequestConfig
) => EasyAxiosInstance
