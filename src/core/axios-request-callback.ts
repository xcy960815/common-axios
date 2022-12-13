import { WebMaskLayer } from "web-mask-layer";
import { AxiosDebounce } from "@/core/axios-debounce";
import type { AxiosRequestConfigs } from "@/common-axios";
export type OnFulfilled = (
  axiosRequestConfigs: AxiosRequestConfigs
) => AxiosRequestConfigs;
export type OnRejected = (error: Error) => Promise<Error>;
export class AxiosRequestCallback {
  // 创建防抖实例
  static axiosDebounceInstance: AxiosDebounce = new AxiosDebounce();
  static webMaskLayer = WebMaskLayer.getInstance();
  /**
   * @desc 请求前成功回调
   * @param {AxiosRequestConfigs} axiosRequestConfigs
   * @returns {AxiosRequestConfigs} axiosRequestConfigs
   */
  public static onFulfilled: OnFulfilled = (axiosRequestConfigs) => {
    const {
      axiosDebounce,
      contentType,
      axiosRequestCallback,
      background,
      color,
      target,
      customClass,
      opacity,
      text,
    } = axiosRequestConfigs;
    if (axiosRequestCallback && typeof axiosRequestCallback === "function")
      axiosRequestCallback(axiosRequestConfigs);
    if (axiosDebounce)
      this.axiosDebounceInstance.handleAxiosDebounce(axiosRequestConfigs);
    if (text)
      this.webMaskLayer.createLoading({
        text,
        background,
        color,
        target,
        customClass,
        opacity,
      });
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
  public static onRejected: OnRejected = (error) => {
    this.webMaskLayer.closeLoading();
    return Promise.reject(error);
  };
}
