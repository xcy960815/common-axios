import { AxiosRequestConfig } from "axios";
import { AxiosResponse } from "axios";
import { MessageDuration } from "web-message";
import { MessagePosition } from "web-message";

export declare interface AxiosHelpers {
  get: ParamsInParamsHelper;
  head: ParamsInParamsHelper;
  options: ParamsInParamsOrDataHelper;
  delete: ParamsInParamsOrDataHelper;
  put: ParamsInDataHelper;
  post: ParamsInDataHelper;
  patch: ParamsInDataHelper;
}

/**
 * @desc axios的请求方法
 */
export declare type AxiosMethods =
  | "get"
  | "post"
  | "put"
  | "delete"
  | "head"
  | "patch"
  | "options";

export declare type AxiosRequestConfigs = AxiosRequestConfig &
  SuccessStatusKeyValue &
  ErrorStatusKeyValue &
  ConstomConfigs;

export declare interface AxiosResponses<T = any> extends AxiosResponse<T> {
  config: AxiosRequestConfigs;
}

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
export declare type ConstomConfigs = {
  contentType?:
    | "application/json"
    | "application/x-www-form-urlencoded"
    | " multipart/form-data";
  axiosDebounce?: boolean;
  messageDuration?: MessageDuration;
  messagePosition?: MessagePosition;
  messageHoverStop?: boolean;
  errorMessageKey?: string;
  errorMessageDuration?: number;
  errorMessagePosition?: "left" | "center" | "right";
  errorMessageValue?: string;
  errorMessageHoverStop?: boolean;
  successMessageKey?: string;
  successMessageDuration?: number;
  successMessagePosition?: "left" | "center" | "right";
  successMessageValue?: string;
  successMessageHoverStop?: boolean;
  dataKey?: string;
  axiosRequestCallback?: (axiosRequestconfigs: AxiosRequestConfigs) => void;
  axiosResponseCallback?: (axiosResponse: AxiosResponses) => void;
};

export declare type CreateAxios = (
  axiosRequestConfigs: AxiosRequestConfigs
) => AxiosHelpers;

export declare const createAxios: CreateAxios;

/**
 * @desc 错误 消息 配置
 * errorStatusKey 和 errorStatusValue 要么全部都有 要么一个没有
 */
export declare type ErrorStatusKeyValue =
  | {
      errorStatusKey?: never;
      errorStatusValue?: never;
    }
  | {
      errorStatusKey: string;
      errorStatusValue: StatusValue;
    };

export declare type ParamsInDataHelper = <T = any, R = AxiosResponses<T>>(
  url: string,
  data?: any,
  config?: AxiosRequestConfigs
) => Promise<R> | Promise<T>;

export declare type ParamsInParamsHelper = <T = any, R = AxiosResponses<T>>(
  url: string,
  params?: any,
  config?: AxiosRequestConfigs
) => Promise<R> | Promise<T>;

export declare type ParamsInParamsOrDataHelper = <
  T = any,
  R = AxiosResponses<T>
>(
  url: string,
  params: {
    params?: any;
    data?: any;
  },
  config?: AxiosRequestConfigs
) => Promise<R> | Promise<T>;

export declare type StatusValue =
  | string
  | number
  | boolean
  | Array<string | number>;

/**
 * @desc 成功 消息 配置
 * successStatusKey 和 successStatusValue 要么全部都有 要么一个没有
 */
export declare type SuccessStatusKeyValue =
  | {
      successStatusKey?: never;
      successStatusValue?: never;
    }
  | {
      successStatusKey: string;
      successStatusValue: StatusValue;
    };

export {};
