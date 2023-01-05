import type { AxiosInstance } from "axios";
import type {
  AxiosRequestConfigs,
  AxiosMethods,
  AxiosResponses,
} from "../common-axios";
export type ParamsInDataHelper = <T = any, R = AxiosResponses<T>>(
  url: string,
  data?: any,
  config?: AxiosRequestConfigs
) => Promise<R> | Promise<T>;
export type ParamsInParamsHelper = <T = any, R = AxiosResponses<T>>(
  url: string,
  params?: any,
  config?: AxiosRequestConfigs
) => Promise<R> | Promise<T>;
export type ParamsInParamsOrDataHelper = <T = any, R = AxiosResponses<T>>(
  url: string,
  params: { params?: any; data?: any },
  config?: AxiosRequestConfigs
) => Promise<R> | Promise<T>;
export type CreateParamsInParamsHelper = (
  axiosInstance: AxiosInstance,
  method: AxiosMethods
) => ParamsInParamsHelper;
export type CreateParamsInParamsOrDataHelper = (
  axiosInstance: AxiosInstance,
  method: AxiosMethods
) => ParamsInParamsOrDataHelper;
export type CreateParamsInDataHelper = (
  axiosInstance: AxiosInstance,
  method: AxiosMethods
) => ParamsInDataHelper;
export class CreateHelper {
  public static createParamsInParamsHelper: CreateParamsInParamsHelper = (
    axiosInstance,
    method
  ) => {
    return (url, params?, config?) => {
      return axiosInstance[method](url, { params, ...config }).catch(
        (error) => error
      );
    };
  };
  public static createParamsInParamsOrDataHelper: CreateParamsInParamsOrDataHelper =
    (axiosInstance, method) => {
      return (url, params, config) => {
        return axiosInstance[method](url, { ...params, ...config }).catch(
          (error) => error
        );
      };
    };
  public static createParamsInDataHelper: CreateParamsInDataHelper = (
    axiosInstance,
    method
  ) => {
    return (url, data, config) => {
      return axiosInstance[method](url, data, { ...config }).catch(
        (error) => error
      );
    };
  };
}
