import { defineStore } from "pinia";
import {
  login,
  logout,
  registerAccount,
  checkVerifyCode,
  checkLoginStatus,
  getUserData,
  resetPassword,
  changePassword
} from "@/pages/apis/user.js";

export const useUserStore = defineStore("user", {
  state: () => ({
    isLogin: false,
    account: "",
    id: ""
  }),
  getters: {},
  actions: {
    userLogin({ username, password }) {
      return login({ username, password })
        .then((res) => {
          console.log("login-res", res);
          this.account = res.data.email;
          this.id = res.data.id;
          this.isLogin = true;
          console.log("state", this.state);
          return res;
        })
        .catch((err) => Promise.reject(err));
    },
    userLogout() {
      return logout()
        .then((res) => {
          console.log("logout-res", res);
          this.$reset();
          console.log("state", this.state);
          return res;
        })
        .catch((err) => Promise.reject(err));
    },
    userRegister({ email, password }) {
      return registerAccount({ email, password })
        .then((res) => {
          console.log("register-res", res);
          return res;
        })
        .catch((err) => Promise.reject(err));
    },
    verifyRegisterCode({ verifyCode, verifyKey }) {
      return checkVerifyCode({ verifyCode, verifyKey })
        .then((res) => {
          console.log("verify-res", res);
          return res;
        })
        .catch((err) => Promise.reject(err));
    },
    checkLogin() {
      return checkLoginStatus()
        .then((res) => {
          console.log("checklogin-res", res);
          this.getUserData()
            .then((userRes) => {
              return userRes;
            })
            .catch((userErr) => Promise.reject(userErr));
        })
        .catch((err) => Promise.reject(err));
    },
    getUserData() {
      return getUserData()
        .then((res) => {
          console.log("getUserData-res", res);
          this.account = "";
          this.id = "";
          this.isLogin = false;
          console.log("state", this.state);
          return res;
        })
        .catch((err) => Promise.reject(err));
    },
    resetPassword({ email }) {
      return resetPassword({ email })
        .then((res) => {
          console.log("resetPassword-res", res);
          return res;
        })
        .catch((err) => Promise.reject(err));
    },
    changePassword({ password }) {
      return changePassword({ password })
        .then((res) => {
          console.log("changePassword-res", res);
          return res;
        })
        .catch((err) => Promise.reject(err));
    }
  }
});
