import axios from "axios";
const instance = axios.create({
  baseURL: "http://127.0.0.1:1880",
});
axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data.data
      ? response.data.data
      : { statusCode: response.data.status };
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);
export default instance;
