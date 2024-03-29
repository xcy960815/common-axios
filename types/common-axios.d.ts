import type { AxiosInstance } from "axios";
import type { AxiosInterceptorManager } from "axios";
import type { AxiosRequestConfig } from "axios";
import type { AxiosResponse } from "axios";
import type { Canceler } from "axios";
import type { MessageDuration } from "web-message";
import type { MessagePosition } from "web-message";

export declare module CommonAxios {
  const CommonAxiosContentTypeEnum: {
    readonly json: "application/json";
    readonly urlencoded: "application/x-www-form-urlencoded";
    readonly formData: "multipart/form-data";
  };
  const CommonAxiosMethodsEnum: {
    readonly get: "get";
    readonly post: "post";
    readonly put: "put";
    readonly delete: "delete";
    readonly head: "head";
    readonly options: "options";
    readonly patch: "patch";
  };
  export type StatusValue = string | number | boolean | Array<string | number>;
  export interface CommonAxiosRequestConfig extends AxiosRequestConfig {
    successStatusKey?: string;
    successStatusValue?: StatusValue;
    errorStatusKey?: string;
    errorStatusValue?: StatusValue;
    contentType?: typeof CommonAxiosContentTypeEnum[keyof typeof CommonAxiosContentTypeEnum];
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
    axiosRequestCallback?: (
      axiosRequestconfigs: CommonAxiosRequestConfig
    ) => void;
    axiosResponseCallback?: (axiosResponse: CommonAxiosResponse) => void;
  }
  export interface CommonAxiosResponse<T = any> extends AxiosResponse<T> {
    config: CommonAxiosRequestConfig;
  }
  export type AxiosMethods =
    typeof CommonAxiosMethodsEnum[keyof typeof CommonAxiosMethodsEnum];
  export interface CommonAxiosInstance
    extends Pick<AxiosInstance, Exclude<keyof AxiosInstance, "interceptors">> {
    interceptors: {
      request: AxiosInterceptorManager<CommonAxiosRequestConfig>;
      response: AxiosInterceptorManager<CommonAxiosResponse>;
    };
  }
  export interface CreateAxios {
    (commonAxiosRequestConfig?: CommonAxiosRequestConfig): CommonAxiosHelpers;
  }
  export interface RequestOnFulfilled {
    <A extends CommonAxiosRequestConfig>(commonAxiosRequestConfig: A): A;
  }
  export interface RequestOnRejected {
    (error: Error): Promise<Error>;
  }
  export interface ResponseOnFulfilled {
    <T>(commonAxiosResponse: CommonAxiosResponse<T>):
      | Promise<T>
      | Promise<CommonAxiosResponse<T>>;
  }
  export interface ResponseOnRejected {
    (error: Error): Promise<Error>;
  }
  export type CommonAxiosQueue = Map<string, Canceler>;
  export interface HandleCreateAxiosKey {
    (commonAxiosRequestConfig: CommonAxiosRequestConfig): string;
  }
  export interface HandleAddAxiosQueue {
    (commonAxiosRequestConfig: CommonAxiosRequestConfig): void;
  }
  export interface HandleRemoveAxiosQueue {
    (commonAxiosRequestConfig: CommonAxiosRequestConfig): void;
  }
  export interface HandleAxiosDebounce {
    (commonAxiosRequestConfig: CommonAxiosRequestConfig): void;
  }
  export interface HandleClearPending {
    (): void;
  }
  export interface GetHelper {
    <T = any, R = CommonAxiosResponse<T>>(
      url: string,
      data?: any,
      config?: CommonAxiosRequestConfig
    ): Promise<R>;
  }
  export interface CreateGetHelper {
    (axiosInstance: CommonAxiosInstance, method: AxiosMethods): GetHelper;
  }
  export interface HeadHelper {
    <T = any, R = CommonAxiosResponse<T>>(
      url: string,
      params?: any,
      config?: CommonAxiosRequestConfig
    ): Promise<R>;
  }
  export interface CreateHeadHelper {
    (axiosInstance: CommonAxiosInstance, method: AxiosMethods): HeadHelper;
  }
  export interface optionsHelper {
    <T = any, R = CommonAxiosResponse<T>>(
      url: string,
      params: {
        params?: any;
        data?: any;
      },
      config?: CommonAxiosRequestConfig
    ): Promise<R>;
  }
  export interface CreateOptionsHelper {
    (axiosInstance: CommonAxiosInstance, method: AxiosMethods): optionsHelper;
  }
  export interface DeleteHelper {
    <T = any, R = CommonAxiosResponse<T>>(
      url: string,
      params: {
        params?: any;
        data?: any;
      },
      config?: CommonAxiosRequestConfig
    ): Promise<R>;
  }
  export interface CreateDeleteHelper {
    (axiosInstance: CommonAxiosInstance, method: AxiosMethods): DeleteHelper;
  }
  export interface PutHelper {
    <T = any, R = CommonAxiosResponse<T>>(
      url: string,
      data?: any,
      config?: CommonAxiosRequestConfig
    ): Promise<R>;
  }
  export interface CreatePutHelper {
    (axiosInstance: CommonAxiosInstance, method: AxiosMethods): PutHelper;
  }
  export interface PostHelper {
    <T = any, R = CommonAxiosResponse<T>>(
      url: string,
      data?: any,
      config?: CommonAxiosRequestConfig
    ): Promise<R>;
  }
  export interface CreatePostHelper {
    (axiosInstance: CommonAxiosInstance, method: AxiosMethods): PostHelper;
  }
  export interface PatchHelper {
    <T = any, R = CommonAxiosResponse<T>>(
      url: string,
      data?: any,
      config?: CommonAxiosRequestConfig
    ): Promise<R>;
  }
  export interface CreatePatchHelper {
    (axiosInstance: CommonAxiosInstance, method: AxiosMethods): PatchHelper;
  }
  export interface CommonAxiosHelpers extends CommonAxiosInstance {
    get: GetHelper;
    head: HeadHelper;
    options: optionsHelper;
    delete: DeleteHelper;
    put: PutHelper;
    post: PostHelper;
    patch: PatchHelper;
  }
}

export declare class commonAxios {
  static commonAxiosInstance: CommonAxios.CommonAxiosInstance;
  /**
   * @desc 创建axios实例
   * @param commonAxiosConfig
   * @returns {CommonAxios.CommonAxiosInstance}
   */
  static createAxios: CommonAxios.CreateAxios;
}

export declare const createAxios: CommonAxios.CreateAxios;

export {};
