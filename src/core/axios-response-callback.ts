import { AxiosResponses } from "../common-axios";

export type OnFulfilled = <T = any, R = AxiosResponses<T>>(
  axiosResponse: AxiosResponses
) => Promise<R> | Promise<T>;

export type OnRejected = (error: Error) => Promise<Error>;

import axios from "axios";

import { utils } from "../utils";

export class AxiosResponseCallback {
  /**
   * @desc 请求返回成功回调
   * @param {AxiosResponse} axiosResponse
   * @returns
   */
  static onFulfilled: OnFulfilled = (axiosResponse) => {
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
    } = axiosResponse.config;

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
      const _errorStatusKeyValue = utils.getValueByKeyInObject<string | number>(
        errorStatusKey,
        axiosResponse.data
      );
      if (errorMessageKey) {
        const isError =
          (Array.isArray(errorStatusValue) &&
            errorStatusValue.includes(_errorStatusKeyValue)) ||
          errorStatusValue === _errorStatusKeyValue;
        if (isError) {
          // 获取消息内容
          const messageValue = utils.getValueByKeyInObject<string>(
            errorMessageKey,
            axiosResponse.data
          );
          utils.outputMessage({
            messageType: "error",
            message: errorMessageValue || messageValue,
            messagePosition: errorMessagePosition || messagePosition || "left",
            messageDuration: errorMessageDuration || messageDuration || 2000,
            messageHoverStop:
              errorMessageHoverStop || messageHoverStop || false,
          });
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
      const _successStatusKeyValue = utils.getValueByKeyInObject<
        string | number
      >(successStatusKey, axiosResponse.data);
      const isSuccess =
        (Array.isArray(successStatusValue) &&
          successStatusValue.includes(_successStatusKeyValue)) ||
        _successStatusKeyValue == successStatusValue;
      if (isSuccess) {
        if (successMessageKey) {
          // 获取消息内容
          const messageValue = utils.getValueByKeyInObject<string>(
            successMessageKey,
            axiosResponse.data
          );
          utils.outputMessage({
            messageType: "success",
            message: successMessageValue || messageValue,
            messagePosition:
              successMessagePosition || messagePosition || "left",
            messageDuration: successMessageDuration || messageDuration || 2000,
            messageHoverStop:
              successMessageHoverStop || messageHoverStop || false,
          });
        }
      }
    }

    // 处理返回数据
    if (dataKey) {
      return Promise.resolve(
        utils.getValueByKeyInObject(dataKey, axiosResponse.data)
      );
    } else {
      return Promise.resolve(axiosResponse.data);
    }
  };

  /**
   * @desc 请求返回错误回调
   * @param {Error} error
   * @returns void
   */
  static onRejected: OnRejected = (error) => {
    if (axios.isCancel(error)) {
      utils.outputMessage({
        messageType: "error",
        message: `检测到${error.message}多次重复请求，接口已取消`,
        messagePosition: "center",
        messageDuration: 2000,
        messageHoverStop: false,
      });
    } else {
      utils.outputMessage({
        messageType: "error",
        message: error.message,
        messagePosition: "center",
        messageDuration: 2000,
        messageHoverStop: false,
      });
    }
    return Promise.reject(error);
  };
}
