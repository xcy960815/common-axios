import type { AxiosInstance } from "axios";
import type {
  ParamsInDataHelper,
  ParamsInParamsHelper,
  ParamsInParamsOrDataHelper,
} from "@/core/create-helper";
import { CommonAxiosInstance } from "@/core/create-axios";
import { CreateHelper } from "@/core/create-helper";
import { AxiosRequestCallback } from "@/core/axios-request-callback";
import { AxiosResponseCallback } from "@/core/axios-response-callback";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { MessageDuration, MessagePosition } from "web-message";
import { MaskLayerOption } from "web-mask-layer";

export type StatusValue = string | number | boolean | Array<string | number>;

/**
 * @desc 成功 消息 配置
 * successStatusKey 和 successStatusValue 要么全部都有 要么一个没有
 */
export type SuccessStatusKeyValue =
  | { successStatusKey?: never; successStatusValue?: never }
  | { successStatusKey: string; successStatusValue: StatusValue };

/**
 * @desc 错误 消息 配置
 * errorStatusKey 和 errorStatusValue 要么全部都有 要么一个没有
 */
export type ErrorStatusKeyValue =
  | { errorStatusKey?: never; errorStatusValue?: never }
  | { errorStatusKey: string; errorStatusValue: StatusValue };

/**
 * @desc axios 自定义配置
 * @param {boolean} axiosDebounce 接口防抖 应用场景：同一个接口，同一个请求方式，同样的请求参数发起了多次数据请求，当第一次发起请求的接口没有返回数据之前，后续的接口都会被取消
 * @param {MessageDuration} messageDuration 消息持续时间 默认为2000毫秒  number
 * @param {MessagePosition} messagePosition 消息提示位置 默认为left
 * @param {boolean} messageHoverStop 鼠标悬停 消息组件不消失 默认为false
 * @param {string} errorMessageKey 错误消息字段所对应的key 默认undefined
 * @param {number} errorMessageDuration 错误消息持续时间 如果没有配置 且配置了 messageDuration 属性 则执行 messageDuration 的配置
 * @param {string} errorMessagePosition 错误消息提示的位置 如果没有配置 且配置了 messagePosition 属性 则执行 messagePosition 的配置
 * @param {string} errorMessageValue 错误消息提示的自定义内容 优先级高于 errorMessageKey 所对应的内容
 * @param {boolean} errorMessageHoverStop 错误消息鼠标悬停不消失 默认为false
 * @param {string} successMessageKey 成功消息字段所对应的key 默认undefined
 * @param {number} successMessageDuration 成功消息持续时间 如果没有配置 且配置了 messageDuration 属性 则执行 messageDuration 的配置
 * @param {string} successMessagePosition 成功消息提示的位置 如果没有配置 且配置了 messagePosition 属性 则执行 messagePosition 的配置
 * @param {string} successMessageValue 成功消息提示的自定义内容 优先级高于 successMessageKey 所对应的内容
 * @param {boolean} successMessageHoverStop 成功消息鼠标悬停不消失 默认为false
 * @param {string} dataKey 数据字段所对应的key 默认undefined
 */
export type ConstomConfigs = {
  contentType?:
    | "application/json"
    | "application/x-www-form-urlencoded"
    | " multipart/form-data";

  /* 接口防抖 应用场景：同一个接口，同一个请求方式，同样的请求参数发起了多次数据请求，当第一次发起请求的接口没有返回数据之前，后续的接口都会被取消 */
  axiosDebounce?: boolean;

  /* 消息持续时间 默认为2000毫秒  number */
  messageDuration?: MessageDuration;

  /* 消息提示位置 默认为left 'left' | 'center' | 'right' */
  messagePosition?: MessagePosition;

  /* 鼠标悬停 消息组件不消失 boolean */
  messageHoverStop?: boolean;

  /* 错误消息字段所对应的key 默认undefined */
  errorMessageKey?: string;

  /* 错误消息持续时间 如果没有配置 且配置了 messageDuration 属性 则执行 messageDuration 的配置  */
  errorMessageDuration?: number;

  /* 错误消息提示的位置 如果没有配置 且配置了 messagePosition 属性 则执行 messagePosition 的配置  */
  errorMessagePosition?: "left" | "center" | "right";

  /* 错误消息提示的自定义内容 优先级高于 errorMessageKey 所对应的内容 */
  errorMessageValue?: string;

  /* 鼠标悬停 错误消息组件不消失 */
  errorMessageHoverStop?: boolean;

  /* 成功消息字段所对应的key 默认undefind */
  successMessageKey?: string;

  /* 成功消息持续时间 如果没有配置 且配置了 messageDuration 属性 则执行 messageDuration 的配置 */
  successMessageDuration?: number;

  /* 成功消息提示的位置 如果没有配置 且配置了 messagePosition 属性 则执行 messagePosition 的配置 */
  successMessagePosition?: "left" | "center" | "right";

  /* 成功消息提示的自定义内容 优先级高于 successMessageKey 所对应的内容 */
  successMessageValue?: string;

  /* 鼠标悬停 错误消息组件不消失 */
  successMessageHoverStop?: boolean;

  /* 代表返回数据的key，支持a.b.c */
  dataKey?: string;

  /* 请求成功回调 用于全局拦截 */
  axiosRequestCallback?: (axiosRequestconfigs: AxiosRequestConfigs) => void;

  /* 拦截成功回调 用于全局拦截 */
  axiosResponseCallback?: (axiosResponse: AxiosResponses) => void;
};

export type AxiosRequestConfigs = AxiosRequestConfig &
  SuccessStatusKeyValue &
  ErrorStatusKeyValue &
  MaskLayerOption &
  ConstomConfigs;

export interface AxiosResponses<T = any> extends AxiosResponse<T> {
  config: AxiosRequestConfigs;
}

/**
 * @desc axios的请求方法
 */
export type AxiosMethods =
  | "get"
  | "post"
  | "put"
  | "delete"
  | "head"
  | "patch"
  | "options";

export interface AxiosHelpers {
  get: ParamsInParamsHelper;
  head: ParamsInParamsHelper;
  options: ParamsInParamsOrDataHelper;
  delete: ParamsInParamsOrDataHelper;
  put: ParamsInDataHelper;
  post: ParamsInDataHelper;
  patch: ParamsInDataHelper;
}

export { ParamsInParamsHelper, ParamsInParamsOrDataHelper, ParamsInDataHelper };

export type CreateAxios = (
  axiosRequestConfigs: AxiosRequestConfigs
) => AxiosHelpers;

export class CommonAxios {
  static axiosInstance: AxiosInstance;
  public static createAxios: CreateAxios = (initAxiosConfig) => {
    const axiosInstance = CommonAxiosInstance.createInstance(initAxiosConfig);
    axiosInstance.interceptors.request.use(
      (config: AxiosRequestConfigs) => AxiosRequestCallback.onFulfilled(config),
      (error) => AxiosRequestCallback.onRejected(error)
    );
    axiosInstance.interceptors.response.use(
      (axiosResponse) => AxiosResponseCallback.onFulfilled(axiosResponse),
      (error) => AxiosResponseCallback.onRejected(error)
    );

    return {
      get: CreateHelper.createParamsInParamsHelper(axiosInstance, "get"),

      head: CreateHelper.createParamsInParamsHelper(axiosInstance, "head"),

      delete: CreateHelper.createParamsInParamsOrDataHelper(
        axiosInstance,
        "delete"
      ),

      options: CreateHelper.createParamsInParamsOrDataHelper(
        axiosInstance,
        "options"
      ),

      post: CreateHelper.createParamsInDataHelper(axiosInstance, "post"),

      put: CreateHelper.createParamsInDataHelper(axiosInstance, "put"),

      patch: CreateHelper.createParamsInDataHelper(axiosInstance, "patch"),
    };
  };
}
