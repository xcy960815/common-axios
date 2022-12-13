import { AxiosRequestConfigs } from "@/common-axios";
import { utils } from "@/utils";
import axios from "axios";
import type { Canceler } from "axios";

type AxiosQueue = Map<string, Canceler>;
type HandleCreateAxiosKey = (
  axiosRequestConfigs: AxiosRequestConfigs
) => string;
type HandleAddAxiosQueue = (axiosRequestConfigs: AxiosRequestConfigs) => void;
type HandleRemoveAxiosQueue = (
  axiosRequestConfigs: AxiosRequestConfigs
) => void;
type HandleAxiosDebounce = (axiosRequestConfigs: AxiosRequestConfigs) => void;
type HandleClearPending = () => void;
export class AxiosDebounce {
  axiosQueue: AxiosQueue;
  constructor() {
    this.axiosQueue = new Map();
  }
  /**
   * @desc 生成axios的key
   * @param {AxiosRequestConfigs} axiosRequestConfigs
   * @returns string
   */
  handleCreateAxiosKey: HandleCreateAxiosKey = (axiosRequestConfigs) => {
    // 生成 关于这个axios的key 所有key的生成规则都一样
    return [
      axiosRequestConfigs.method,
      axiosRequestConfigs.url,
      utils.stringify(axiosRequestConfigs.params),
      utils.stringify(axiosRequestConfigs.data),
    ].join("&");
  };

  /**
   * @desc 添加axios 队列
   * @param {AxiosRequestConfigs} axiosRequestConfigs
   * @returns void
   */
  handleAddAxiosQueue: HandleAddAxiosQueue = (axiosRequestConfigs) => {
    const key = this.handleCreateAxiosKey(axiosRequestConfigs);
    axiosRequestConfigs.cancelToken =
      axiosRequestConfigs.cancelToken ||
      new axios.CancelToken((cancel: Canceler) => {
        if (!this.axiosQueue.has(key)) this.axiosQueue.set(key, cancel);
      });
  };

  /**
   * @desc 移除axios 队列 并取消axios 请求
   * @param {AxiosRequestConfigs} axiosRequestConfigs
   * @returns void
   */
  handleRemoveAxiosQueue: HandleRemoveAxiosQueue = (axiosRequestConfigs) => {
    const key = this.handleCreateAxiosKey(axiosRequestConfigs);
    if (this.axiosQueue.has(key)) {
      // 如果在 axiosQueue 中存在当前请求标识，需要取消当前请求，并且移除
      const cancel = this.axiosQueue.get(key)!;
      cancel(key);
      this.axiosQueue.delete(key);
    }
  };
  /**
   * @desc 处理上一次请求 与当前请求是否重复
   * @param} axiosRequestConfigs
   * @returns void
   */
  handleAxiosDebounce: HandleAxiosDebounce = (axiosRequestConfigs) => {
    // 在请求开始前，对之前的请求做检查取消操作
    this.handleRemoveAxiosQueue(axiosRequestConfigs);
    // 将当前请求添加到 pending 中
    this.handleAddAxiosQueue(axiosRequestConfigs);
  };

  /**
   * @desc 清空队列
   * @returns void
   */
  handleClearPending: HandleClearPending = () => {
    for (const [url, cancel] of this.axiosQueue) {
      cancel(url);
    }
    this.axiosQueue.clear();
  };
}
