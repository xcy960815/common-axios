
import { createAxios } from "common-axios";

// 创建common-axios 实例
const commonAxios = createAxios({
    baseURL: "http://localhost:3000/api",
    withCredentials: true
});


export const testMessage = () => {
    // 测试请求成功接口，属性
    const handleGetSusscessApi = () => {
        commonAxios.get("/test-message/success", null, {
            successStatusKey: "code",
            successStatusValue: [200],
            successMessageKey: "message",
            successMessageValue: "请求成功",
            successMessageDuration: 2000,
            successMessageHoverStop: true,
            successMessagePosition: "right"
        });
    };
    // 测试请求报错接口，属性
    const handleGetErrorApi = () => {
        commonAxios.get("/test-message/error", null, {
            errorStatusKey: "code",
            errorStatusValue: [50, 100, 500],
            errorMessageKey: "message",
            errorMessageValue: "请求失败",
            errorMessageDuration: 2000,
            errorMessageHoverStop: true,
            errorMessagePosition: "center"
        });
    };
    return {
        handleGetSusscessApi,
        handleGetErrorApi
    }
}
