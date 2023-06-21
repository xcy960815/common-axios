import axios from "axios";
import { CreateHelper } from "./core/axios-helper";
import { CommonAxiosRequestCallback } from "./core/axios-request-callback";
import { CommonAxiosResponseCallback } from "./core/axios-response-callback";
import type { CommonAxios } from "./types";

class commonAxios {
  static commonAxiosInstance: CommonAxios.CommonAxiosInstance;
  /**
   * @desc 创建axios实例
   * @param commonAxiosConfig
   * @returns {CommonAxios.CommonAxiosInstance}
   */
  public static createAxios: CommonAxios.CreateAxios = (commonAxiosConfig) => {
    commonAxiosConfig = commonAxiosConfig || {};
    this.commonAxiosInstance = axios.create({
      ...commonAxiosConfig,
    }) as unknown as CommonAxios.CommonAxiosInstance;
    /**
     * @desc 请求拦截器
     * @param {Function} CommonAxiosRequestCallback.CommonAxiosOnFulfilled
     * @param {Function} CommonAxiosRequestCallback.CommonAxiosOnRejected
     */
    this.commonAxiosInstance.interceptors.request.use(
      (config) => CommonAxiosRequestCallback.CommonAxiosOnFulfilled(config),
      (error) => CommonAxiosRequestCallback.CommonAxiosOnRejected(error)
    );
    /**
     * @desc 响应拦截器
     * @param {Function} CommonAxiosResponseCallback.CommonAxiosOnFulfilled
     * @param {Function} CommonAxiosResponseCallback.CommonAxiosOnRejected
     */
    this.commonAxiosInstance.interceptors.response.use(
      (response) =>
        CommonAxiosResponseCallback.CommonAxiosOnFulfilled(response),
      (error) => CommonAxiosResponseCallback.CommonAxiosOnRejected(error)
    );

    return {
      ...this.commonAxiosInstance,

      get: CreateHelper.createGetHelper(this.commonAxiosInstance, "get"),

      head: CreateHelper.createHeadHepler(this.commonAxiosInstance, "head"),

      delete: CreateHelper.createDeleteHelper(
        this.commonAxiosInstance,
        "delete"
      ),

      options: CreateHelper.createOptionsHelper(
        this.commonAxiosInstance,
        "options"
      ),

      post: CreateHelper.createPostHelper(this.commonAxiosInstance, "post"),

      put: CreateHelper.createPutHelper(this.commonAxiosInstance, "put"),

      patch: CreateHelper.createPatchHelper(this.commonAxiosInstance, "patch"),
    };
  };
}

const createAxios = commonAxios.createAxios;
export { createAxios, commonAxios, CommonAxios };
