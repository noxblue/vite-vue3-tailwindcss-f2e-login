import req from "@/pages/apis/axios.js";

// 登入
export const login = (payload) => {
  return req("post", "user/login", payload);
};

// 登出
export const logout = () => {
  return req("delete", "user/logout");
};

// 註冊
export const registerAccount = (payload) => {
  return req("post", "user/signup", payload);
};

// 檢查驗證碼
export const checkVerifyCode = (payload) => {
  return req("patch", "user/verify", payload);
};

// 確認登入狀態是否過期
export const checkLoginStatus = () => {
  return req("put", "user/auth-valid");
};

// 取得使用者資料
export const getUserData = () => {
  return req("get", "user");
};

// 重置密碼
export const resetPassword = (payload) => {
  return req("patch", "user/reset-password", payload);
};

// 更改密碼
export const changePassword = (payload) => {
  return req("patch", "user/change-password", payload);
};
