import { AxiosResponse } from "axios";
import { AxiosRequestConfigs } from "@/index";
import { WebMaskLayer } from "web-mask-layer";
/**
 * @desc axios 请求后成功的回调
 */
export type AxiosResponseCallback = <T = any, R = AxiosResponse<T>>(
  axiosResponse: AxiosResponse
) => Promise<R> | Promise<T>;

/**
 * @desc axios 请求配置回调
 */
export type AxiosRequestCallback = (
  config: AxiosRequestConfigs
) => AxiosRequestConfigs;

/**
 * axios 请求前 请求后的错误回调 的声明
 */
export type AxiosErrorCallback = (error: Error) => Promise<Error>;

import axios from "axios";

import {
  WebMessage,
  MessagePosition,
  MessageDuration,
  MessageType,
} from "web-message";

// 创建message实例
const messageInstance = WebMessage.getInstance();

import { getValueByKeyInOpject } from "@/utils/get-value-in-opject";

// 输出消息
const outputMessage = (
  messageType: MessageType,
  message: string,
  messagePosition: MessagePosition,
  messageDuration: MessageDuration,
  messageHoverStop: boolean
) => {
  messageInstance.createMessage({
    message,
    messageType,
    messagePosition,
    messageDuration,
    showClose: false,
    messageHoverStop,
  });
};
/**
 * @desc 请求返回成功回调
 * @param {AxiosResponse} axiosResponse
 * @returns
 */
export const axiosResponseCallback: AxiosResponseCallback = (axiosResponse) => {
  const webMaskLayer = WebMaskLayer.getInstance();
  webMaskLayer.closeLoading();
  // 获取配置
  const {
    messagePosition,
    messageDuration,
    errorStatusKey,
    errorStatusValue,
    messageHoverStop,
    dataKey,
    errorMessageKey,
    errorMessageDuration,
    errorMessagePosition,
    errorMessageValue,
    errorMessageHoverStop,
    successStatusKey,
    successStatusValue,
    successMessageKey,
    successMessageDuration,
    successMessagePosition,
    successMessageValue,
    successMessageHoverStop,
    axiosResponseCallback,
  } = axiosResponse.config as AxiosRequestConfigs;

  // 执行自定义事件
  if (axiosResponseCallback && typeof axiosResponseCallback == "function")
    axiosResponseCallback(axiosResponse);

  // 处理 错误 提示
  if (
    (errorStatusKey && errorStatusValue) ||
    (Array.isArray(errorStatusValue) &&
      errorStatusKey &&
      errorStatusValue.length)
  ) {
    const _errorStatusKeyValue = getValueByKeyInOpject<
      string | boolean | number
    >(errorStatusKey, axiosResponse.data);
    if (errorMessageKey) {
      if (
        (Array.isArray(errorStatusValue) &&
          errorStatusValue.includes(_errorStatusKeyValue)) ||
        errorStatusValue === _errorStatusKeyValue
      ) {
        // 获取消息内容
        const messageValue = getValueByKeyInOpject<string>(
          errorMessageKey,
          axiosResponse.data
        );
        outputMessage(
          "error",
          errorMessageValue || messageValue,
          errorMessagePosition || messagePosition || "left",
          errorMessageDuration || messageDuration || 2000,
          errorMessageHoverStop || messageHoverStop || false
        );
      }
    }
  }

  // 处理 成功 提示
  if (
    (successStatusKey && successStatusValue) ||
    (Array.isArray(successStatusValue) &&
      successStatusKey &&
      successStatusValue.length)
  ) {
    // 获取代表成功的值
    const _successStatusKeyValue = getValueByKeyInOpject<
      string | boolean | number
    >(successStatusKey, axiosResponse.data);
    if (
      (Array.isArray(successStatusValue) &&
        successStatusValue.includes(_successStatusKeyValue)) ||
      _successStatusKeyValue == successStatusValue
    ) {
      if (successMessageKey) {
        // 获取消息内容
        const messageValue = getValueByKeyInOpject<string>(
          successMessageKey,
          axiosResponse.data
        );
        outputMessage(
          "success",
          successMessageValue || messageValue,
          successMessagePosition || messagePosition || "left",
          successMessageDuration || messageDuration || 2000,
          successMessageHoverStop || messageHoverStop || false
        );
      }
    }
  }

  // 处理返回数据
  if (dataKey) {
    return Promise.resolve(getValueByKeyInOpject(dataKey, axiosResponse.data));
  } else {
    return Promise.resolve(axiosResponse.data);
  }
};

/**
 * @desc 请求返回错误回调
 * @param {Error} error
 * @returns void
 */
export const axiosResponseErrorCallback: AxiosErrorCallback = (error) => {
  if (axios.isCancel(error)) {
    outputMessage(
      "error",
      `检测到${error.message}多次重复请求，接口已取消`,
      "center",
      2000,
      false
    );
  } else {
    outputMessage("error", error.message, "center", 2000, false);
  }
  return Promise.reject(error);
};
