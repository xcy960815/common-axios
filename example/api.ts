import Mock from "mockjs";
const data = {
  successData: [
    { id: 1, name: "Jon Snow", email: "jon@example.com" },
    { id: 2, name: "Daenerys Targaryen", email: "daenerys@example.com" },
    { id: 3, name: "Tyrion Lannister", email: "tyrion@example.com" },
  ],
};

Mock.mock("/api/test-message/success", "get", () => {
  return {
    code: 200,
    message: "success",
    data: data.successData,
  };
});

Mock.mock("/api/test-message/error", "get", () => {
  return {
    code: 500,
    message: "error",
    data: null,
  };
});

Mock.mock("/api/test-debounce", "get", () => {
  return {
    code: 200,
    message: "success",
    data: null,
  };
});
