import axios, { Canceler } from 'axios'
import qs from 'qs'
import {
    AxiosRequestConfigs,
    CreateLoadingNode,
    CreateAxiosInstance,
    CreateParamHelper,
    CreateDataHelper,
    LogMap,
} from './types'

/*遮罩层节点*/
let loadingNode: HTMLDivElement | null = null
/**
 * 创建遮罩层
 * @param loadingText string loading遮罩层的文字
 */
export const createLoadingNode: CreateLoadingNode = (loadingText) => {
    document.body.style.position = 'relative'
    loadingNode = document.createElement('div')
    loadingNode.textContent = loadingText ? loadingText : '拼命加载中...'
    loadingNode.style.color = '#409eff'
    loadingNode.style.fontSize = '14px'
    loadingNode.style.position = 'absolute%'
    loadingNode.style.backgroundColor = 'hsla(0,0%,100%,.9)'
    loadingNode.style.margin = '0'
    loadingNode.style.top = '0'
    loadingNode.style.right = '0'
    loadingNode.style.bottom = '0'
    loadingNode.style.left = '0'
    loadingNode.style.transition = 'opacity .3s'
    document.body.appendChild(loadingNode)
}
/**
 * 移除遮罩层节点
 * @param loadingNode
 */
export const removeLoadingNode = (loadingNode: HTMLElement) => {
    document.body.removeChild(loadingNode)
}
/**
 * 创建axios实例
 * @param config
 */
export const createAxiosInstance: CreateAxiosInstance = (config) => {
    return axios.create({
        ...config,
        withCredentials:
            config && config.withCredentials !== undefined
                ? config.withCredentials
                : true,
    })
}

export const createParamHelper: CreateParamHelper = (axiosInstance, method) => {
    return (url, params, config) => {
        return axiosInstance[method](url, {
            params,
            ...config,
        })
            .then((response) => response)
            .catch((error) => error)
    }
}

export const createDataHelper: CreateDataHelper = (axiosInstance, method) => {
    return function (url, data, config) {
        return axiosInstance[method](url, {
            data,
            ...config,
        })
            .then((response) => response)
            .catch((error) => error)
    }
}

// 声明一个 Map 用于存储每个请求的标识 和 取消函数
const logMap: LogMap = new Map()
/**
 * 添加请求
 * @param {AxiosRequestConfigs} config
 */
export const handleAddResponseLog = (config: AxiosRequestConfigs) => {
    const key = [
        config.method,
        config.url,
        qs.stringify(config.params),
        qs.stringify(config.data),
    ].join('&')
    config.cancelToken =
        config.cancelToken ||
        new axios.CancelToken((cancel: Canceler) => {
            if (!logMap.has(key)) {
                // 如果 logMap 中不存在当前请求，则添加进去
                logMap.set(key, cancel)
            }
        })
}
/**
 * 移除请求
 * @param {AxiosRequestConfigs} config
 */
export const handleRemoveResponseLog = (config: AxiosRequestConfigs) => {
    const key = [
        config.method,
        config.url,
        qs.stringify(config.params),
        qs.stringify(config.data),
    ].join('&')

    if (logMap.has(key)) {
        // 如果在 logMap 中存在当前请求标识，需要取消当前请求，并且移除
        const cancel: Canceler = logMap.get(key)!
        cancel(key)
        logMap.delete(key)
        config.needLoading = false
    }
}

/**
 * 清空 logMap 中的请求（在路由跳转时调用）
 */
export const handleClearPending = () => {
    // 路由跳转的时候 清空所有没有请求完成的请求
    for (const [url, cancel] of logMap) {
        cancel(url)
    }
    logMap.clear()
}
