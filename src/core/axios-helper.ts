import type { CommonAxios } from "../types";
export class CreateHelper {
  public static createGetHelper: CommonAxios.CreateGetHelper = (
    axiosInstance,
    method
  ) => {
    return (url, params?, config?) => {
      return axiosInstance[method](url, { params, ...config }).catch(
        (error) => error
      );
    };
  };
  public static createHeadHepler: CommonAxios.CreateHeadHelper = (
    axiosInstance,
    method
  ) => {
    return (url, params?, config?) => {
      return axiosInstance[method](url, { params, ...config }).catch(
        (error) => error
      );
    };
  };

  public static createOptionsHelper: CommonAxios.CreateOptionsHelper = (
    axiosInstance,
    method
  ) => {
    return (url, params, config) => {
      return axiosInstance[method](url, { ...params, ...config }).catch(
        (error) => error
      );
    };
  };
  public static createDeleteHelper: CommonAxios.CreateDeleteHelper = (
    axiosInstance,
    method
  ) => {
    return (url, params, config) => {
      return axiosInstance[method](url, { ...params, ...config }).catch(
        (error) => error
      );
    };
  };
  public static createPostHelper: CommonAxios.CreatePostHelper = (
    axiosInstance,
    method
  ) => {
    return (url, data, config) => {
      return axiosInstance[method](url, data, { ...config }).catch(
        (error) => error
      );
    };
  };
  public static createPutHelper: CommonAxios.CreatePutHelper = (
    axiosInstance,
    method
  ) => {
    return (url, data, config) => {
      return axiosInstance[method](url, data, { ...config }).catch(
        (error) => error
      );
    };
  };
  // createPatchHelper
  public static createPatchHelper: CommonAxios.CreatePatchHelper = (
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
