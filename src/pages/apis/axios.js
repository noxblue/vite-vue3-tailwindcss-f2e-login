import axios from "axios";
import Qs from "qs";

const pending = new Map();
const baseURL = import.meta.env.VITE_AJAX_URL;
console.log("baseurl", baseURL);

// 添加請求
const addPending = (config) => {
  const url = [config.method, config.url].join("&");
  config.cancelToken =
    config.cancelToken ||
    new axios.CancelToken((cancel) => {
      if (!pending.has(url)) pending.set(url, cancel);
    });
};

// 移除請求
const removePending = (config) => {
  const url = [config.method, config.url].join("&");
  if (pending.has(url)) {
    const cancel = pending.get(url);
    cancel(url);
    pending.delete(url);
  }
};

// axios 的實例
const instance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json"
  },
  paramsSerializer: {
    serialize: (params) => Qs.stringify(params, { arrayFormat: "repeat" })
  },
  withCredentials: true,
  // crossDomain: true,
  timeout: 20000
});

// request 攔截器
instance.interceptors.request.use(
  (config) => {
    removePending(config);
    addPending(config);
    console.log("request", config);
    return config;
  },
  (error) => Promise.reject(error)
);

// response 攔截器
instance.interceptors.response.use(
  (response) => {
    removePending(response);
    return response;
  },
  (error) => {
    if (!error.response) {
      return Promise.reject({ apiError: false, error });
    } else {
      const { response } = error;
      return Promise.reject({ apiError: true, ...response });
    }
  }
);

// 封裝請求
export default function (method, url, data, config = {}) {
  method = method.toLowerCase();
  switch (method) {
    case "post":
      return instance.post(url, data, config);
    case "get":
      return instance.get(url, { params: data, ...config });
    case "delete":
      return instance.delete(url, { params: data });
    case "put":
      return instance.put(url, data);
    case "patch":
      return instance.patch(url, data);
    default:
      console.log(`未知的 method: ${method}`);
      return false;
  }
}
