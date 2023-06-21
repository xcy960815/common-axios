import { createAxios } from "common-axios";
// 创建common-commonAxios 实例
const commonAxios = createAxios({});

export const testMessage = () => {
  // 测试请求成功接口，属性
  const handleTestSusscessMessage = async () => {
    commonAxios
      .get("/api/test-message/success", null, {
        successStatusKey: "code",
        successStatusValue: [200],
        successMessageKey: "message",
        successMessageValue: "我是自定义的成功提示信息",
        successMessageDuration: 2000,
        successMessageHoverStop: true,
        successMessagePosition: "right",
      })
      .then((res) => {
        console.log(res);
      });
  };
  // 测试请求报错接口，属性
  const handleTestErrorMessage = () => {
    commonAxios.get("/api/test-message/error", null, {
      errorStatusKey: "code",
      errorStatusValue: [50, 100, 500],
      errorMessageKey: "message",
      errorMessageValue: "我是自定义的错误提示信息",
      errorMessageDuration: 2000,
      errorMessageHoverStop: true,
      errorMessagePosition: "center",
    });
    // .then((res) => {
    //   console.log(res);
    // });
  };
  return {
    handleTestSusscessMessage,
    handleTestErrorMessage,
  };
};
