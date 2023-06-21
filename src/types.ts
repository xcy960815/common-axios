import type {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosInstance,
  AxiosInterceptorManager,
  Canceler,
} from "axios";
import type {
  MessageDuration,
  MessagePosition,
  MessageType,
} from "web-message";

// interface A<T> {
//   name: T;
// }

// interface B<T = any> extends A<T> {
//   age: number;
// }

// const c = <T>(c: B<T>): T => {
//   return c.name;
// };

// c({ name: "number", age: 2 });

export module CommonAxios {
  const CommonAxiosContentTypeEnum = {
    json: "application/json",
    urlencoded: "application/x-www-form-urlencoded",
    formData: "multipart/form-data",
  } as const;

  const CommonAxiosMethodsEnum = {
    get: "get",
    post: "post",
    put: "put",
    delete: "delete",
    head: "head",
    options: "options",
    patch: "patch",
  } as const;

  type StatusValue = string | number | boolean | Array<string | number>;

  interface CommonAxiosRequestConfig extends AxiosRequestConfig {
    successStatusKey?: string;

    successStatusValue?: StatusValue;

    errorStatusKey?: string;

    errorStatusValue?: StatusValue;

    contentType?: typeof CommonAxiosContentTypeEnum[keyof typeof CommonAxiosContentTypeEnum];

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

    /* 请求成功回调 用于全局拦截 */
    axiosRequestCallback?: (
      axiosRequestconfigs: CommonAxiosRequestConfig
    ) => void;

    /* 拦截成功回调 用于全局拦截 */
    axiosResponseCallback?: (axiosResponse: CommonAxiosResponse) => void;
  }

  export interface CommonAxiosResponse<T = any> extends AxiosResponse<T> {
    config: CommonAxiosRequestConfig;
  }

  export type CommonAxiosMethods =
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
    (axiosInstance: CommonAxiosInstance, method: CommonAxiosMethods): GetHelper;
  }

  export interface HeadHelper {
    <T = any, R = CommonAxiosResponse<T>>(
      url: string,
      params?: any,
      config?: CommonAxiosRequestConfig
    ): Promise<R>;
  }

  export interface CreateHeadHelper {
    (
      axiosInstance: CommonAxiosInstance,
      method: CommonAxiosMethods
    ): HeadHelper;
  }

  export interface optionsHelper {
    <T = any, R = CommonAxiosResponse<T>>(
      url: string,
      params: { params?: any; data?: any },
      config?: CommonAxiosRequestConfig
    ): Promise<R>;
  }

  export interface CreateOptionsHelper {
    (
      axiosInstance: CommonAxiosInstance,
      method: CommonAxiosMethods
    ): optionsHelper;
  }

  export interface DeleteHelper {
    <T = any, R = CommonAxiosResponse<T>>(
      url: string,
      params: { params?: any; data?: any },
      config?: CommonAxiosRequestConfig
    ): Promise<R>;
  }

  export interface CreateDeleteHelper {
    (
      axiosInstance: CommonAxiosInstance,
      method: CommonAxiosMethods
    ): DeleteHelper;
  }

  export interface PutHelper {
    <T = any, R = CommonAxiosResponse<T>>(
      url: string,
      data?: any,
      config?: CommonAxiosRequestConfig
    ): Promise<R>;
  }

  export interface CreatePutHelper {
    (axiosInstance: CommonAxiosInstance, method: CommonAxiosMethods): PutHelper;
  }

  export interface PostHelper {
    <T = any, R = CommonAxiosResponse<T>>(
      url: string,
      data?: any,
      config?: CommonAxiosRequestConfig
    ): Promise<R>;
  }

  export interface CreatePostHelper {
    (
      axiosInstance: CommonAxiosInstance,
      method: CommonAxiosMethods
    ): PostHelper;
  }

  export interface PatchHelper {
    <T = any, R = CommonAxiosResponse<T>>(
      url: string,
      data?: any,
      config?: CommonAxiosRequestConfig
    ): Promise<R>;
  }

  export interface CreatePatchHelper {
    (
      axiosInstance: CommonAxiosInstance,
      method: CommonAxiosMethods
    ): PatchHelper;
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

export interface Stringify {
  (params: Array<string>): string;
}

export interface GetValueByKey {
  // <T>(key: string, data: CommonAxios.CommonAxiosResponse["data"]): T;
  <T = any>(key: string, data: any): T;
}

export interface OutputMessageParams {
  messageType: MessageType;
  message: string;
  messagePosition: MessagePosition;
  messageDuration?: MessageDuration;
  messageHoverStop?: boolean;
}
export interface OutputMessage {
  (outputMessageParams: OutputMessageParams): void;
}
