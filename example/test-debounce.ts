import { createAxios } from "common-axios";
const commonAxios = createAxios({
  withCredentials: true,
});

export const testDebounce = () => {
  const handleTestDebounce = () => {
    commonAxios.get("/api/test-debounce", null, {
      axiosDebounce: true,
      messageHoverStop: true,
      messageDuration: 2000,
    });
    commonAxios.get("/api/test-debounce", null, {
      axiosDebounce: true,
      messageHoverStop: true,
    });
    commonAxios.get("/api/test-debounce", null, {
      axiosDebounce: true,
      messageHoverStop: true,
    });
  };
  return {
    handleTestDebounce,
  };
};
