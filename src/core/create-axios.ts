import axios from "axios";
import type { AxiosInstance } from "axios";
import { AxiosRequestConfigs } from "@/common-axios";

export type CreateInstance = (
  axiosRequestConfigs: AxiosRequestConfigs
) => AxiosInstance;

/**
 * @desc 创建axios实例
 * @param {AxiosRequestConfigs} axiosRequestConfigs
 * return axios实例
 */
export class CommonAxiosInstance {
  static axiosInstance: AxiosInstance;
  public static createInstance: CreateInstance = (axiosRequestConfigs) => {
    if (!this.axiosInstance) {
      const withCredentials =
        axiosRequestConfigs && axiosRequestConfigs.withCredentials !== undefined
          ? axiosRequestConfigs.withCredentials
          : true;
      this.axiosInstance = axios.create({
        ...axiosRequestConfigs,
        withCredentials,
      });
    }
    return this.axiosInstance;
  };
}
