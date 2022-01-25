import axios from 'axios'
import qs from 'qs'
import { LocalAxiosRequestConfig } from './types'
import { Canceler } from 'axios'
// 声明一个 Map 用于存储每个请求的标识 和 取消函数
const pending: Map<string, Canceler> = new Map()
/**
 * 添加请求
 * @param {Object} config
 */
export const handleAddPending = (config: LocalAxiosRequestConfig) => {
    const key = [
        config.method,
        config.url,
        qs.stringify(config.params),
        qs.stringify(config.data),
    ].join('&')
    config.cancelToken =
        config.cancelToken ||
        new axios.CancelToken((cancel: Canceler) => {
            if (!pending.has(key)) {
                // 如果 pending 中不存在当前请求，则添加进去
                pending.set(key, cancel)
            }
        })
}
/**
 * 移除请求
 * @param {Object} config
 */
export const handleRemovePending = (config: LocalAxiosRequestConfig) => {
    const key = [
        config.method,
        config.url,
        qs.stringify(config.params),
        qs.stringify(config.data),
    ].join('&')

    if (pending.has(key)) {
        // 如果在 pending 中存在当前请求标识，需要取消当前请求，并且移除
        const cancel: Canceler = pending.get(key)!
        cancel(key)
        pending.delete(key)
        config.headers.needLoading = false
    }
}
/**
 * 清空 pending 中的请求（在路由跳转时调用）
 */
export const handleClearPending = () => {
    // 路由跳转的时候 清空所有没有请求完成的请求
    for (const [url, cancel] of pending) {
        cancel(url)
    }
    pending.clear()
}
