import { AxiosDebounce } from "../core/axios-debounce";
import type { CommonAxios } from "../types";
export class CommonAxiosRequestCallback {
  // 创建防抖实例
  static axiosDebounce: AxiosDebounce = new AxiosDebounce();
  /**
   * @desc 请求前成功回调
   * @param {AxiosRequestConfigs} axiosRequestConfigs
   * @returns {AxiosRequestConfigs} axiosRequestConfigs
   */
  public static CommonAxiosOnFulfilled: CommonAxios.RequestOnFulfilled = (
    axiosRequestConfigs
  ) => {
    const { axiosDebounce, contentType, axiosRequestCallback } =
      axiosRequestConfigs;

    if (axiosRequestCallback && typeof axiosRequestCallback === "function")
      axiosRequestCallback(axiosRequestConfigs);
    if (axiosDebounce)
      this.axiosDebounce.handleAxiosDebounce(axiosRequestConfigs);
    if (contentType)
      axiosRequestConfigs.headers = {
        ...axiosRequestConfigs.headers,
        "Content-Type": contentType,
      };
    return axiosRequestConfigs;
  };
  /**
   * @desc 请求前错误回调
   * @param error 错误信息
   * @returns error
   */
  public static CommonAxiosOnRejected: CommonAxios.RequestOnRejected = (
    error
  ) => {
    return Promise.reject(error);
  };
}
