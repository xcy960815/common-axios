import { CommonAxios } from "common-axios";
// 创建common-axios 实例
const commonAxios = CommonAxios.createAxios({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

export const testMaskLayer = () => {
  /**
   * 请求一个慢接口数据
   */
  const handleGetSlowApi = async (loadingText: string) => {
    commonAxios.get("/test-mask-layer/slow", null, {
      successStatusKey: "code",
      successStatusValue: "000000",
      successMessageKey: "status",
      successMessageDuration: 2000,
      successMessagePosition: "right",
      text: loadingText,
    });
  };

  /**
   * 测试用的快接口
   */
  const handleGetFastApi = async (loadingText: string) => {
    const result = await commonAxios.get<string>(
      "/test-mask-layer/fast",
      null,
      {
        text: loadingText,
        messageDuration: 2000,
        messagePosition: "right",
        successStatusKey: "code",
        successStatusValue: 200,
        successMessageKey: "message",
        successMessageValue: "哈哈哈成功了",
        dataKey: "data.data.name",
      }
    );
    console.log("result", result.toLocaleUpperCase());
  };
  return {
    handleGetSlowApi,
    handleGetFastApi,
  };
};
