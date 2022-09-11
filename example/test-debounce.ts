import { createAxios } from "common-axios"
const commonAxios = createAxios({
    baseURL: "http://localhost:3000/api",
    withCredentials: true
})

export const testDebounce = () => {
    const handleGetDebounceApi = () => {
        commonAxios.get("/test-debounce/", null, {
            axiosDebounce: true,
        })
        commonAxios.get("/test-debounce/", null, {
            axiosDebounce: true,
        })
        commonAxios.get("/test-debounce/", null, {
            axiosDebounce: true,
        })
    }
    return {
        handleGetDebounceApi
    }
}
