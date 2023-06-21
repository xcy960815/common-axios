import axios from "axios";
import type { CommonAxios } from "../types";
import { utils } from "../utils";

export class CommonAxiosResponseCallback {
  /**
   * @desc 请求返回成功回调
   * @param {AxiosResponse} response
   * @returns
   */
  //
  static CommonAxiosOnFulfilled: CommonAxios.ResponseOnFulfilled = (
    response
  ) => {
    // 获取配置
    const {
      messagePosition,
      messageDuration,
      errorStatusKey,
      errorStatusValue,
      messageHoverStop,
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
    } = response.config;
    const { data } = response;

    // 执行自定义事件
    if (axiosResponseCallback && typeof axiosResponseCallback == "function") {
      axiosResponseCallback(response);
    }

    // 处理 错误 提示
    const checkError =
      (errorStatusKey && errorStatusValue) ||
      (Array.isArray(errorStatusValue) &&
        errorStatusKey &&
        errorStatusValue.length);

    if (checkError) {
      const _errorStatusKeyValue = utils.getValueByKey<string | number>(
        errorStatusKey,
        data
      );
      if (errorMessageKey) {
        const isError =
          (Array.isArray(errorStatusValue) &&
            errorStatusValue.includes(_errorStatusKeyValue)) ||
          errorStatusValue === _errorStatusKeyValue;
        if (isError) {
          // 获取消息内容
          const messageValue = utils.getValueByKey<string>(
            errorMessageKey,
            response.data
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
    const checkSuccess =
      (successStatusKey && successStatusValue) ||
      (Array.isArray(successStatusValue) &&
        successStatusKey &&
        successStatusValue.length);
    if (checkSuccess) {
      // 获取代表成功的值
      const _successStatusKeyValue = utils.getValueByKey<string | number>(
        successStatusKey,
        response.data
      );
      const isSuccess =
        (Array.isArray(successStatusValue) &&
          successStatusValue.includes(_successStatusKeyValue)) ||
        _successStatusKeyValue == successStatusValue;
      if (isSuccess) {
        if (successMessageKey) {
          // 获取消息内容
          const messageValue = utils.getValueByKey<string>(
            successMessageKey,
            response.data
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
    return Promise.resolve(response);
  };

  /**
   * @desc 请求返回错误回调
   * @param {Error} error
   * @returns void
   */
  static CommonAxiosOnRejected: CommonAxios.ResponseOnRejected = (error) => {
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
