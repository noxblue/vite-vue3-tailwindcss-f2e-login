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
    userLogin({ email, password }) {
      return login({ email, password })
        .then((res) => {
          this.account = res.data.data.email;
          this.id = res.data.data.id;
          this.isLogin = true;
          let usedLoginIds =
            JSON.parse(localStorage.getItem("usedLoginIds")) || [];
          usedLoginIds = usedLoginIds.includes(this.id)
            ? usedLoginIds
            : [...usedLoginIds, this.id];
          localStorage.setItem("usedLoginIds", JSON.stringify(usedLoginIds));
          return res;
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    userLogout() {
      return logout()
        .then((res) => {
          this.$reset();
          return res;
        })
        .catch((err) => Promise.reject(err));
    },
    userRegister({ email, password }) {
      return registerAccount({ email, password })
        .then((res) => {
          return res;
        })
        .catch((err) => Promise.reject(err));
    },
    verifyRegisterCode({ verifyCode, verifyKey }) {
      return checkVerifyCode({ verifyCode, verifyKey })
        .then((res) => {
          return res;
        })
        .catch((err) => Promise.reject(err));
    },
    checkLogin() {
      return checkLoginStatus()
        .then(() => {
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
          this.account = res.data.data.email;
          this.id = res.data.data.id;
          this.isLogin = true;
          return res;
        })
        .catch((err) => {
          this.account = "";
          this.id = "";
          this.isLogin = false;
          return Promise.reject(err);
        });
    },
    resetPassword({ email }) {
      return resetPassword({ email })
        .then((res) => {
          return res;
        })
        .catch((err) => Promise.reject(err));
    },
    changePassword({ password }) {
      return changePassword({ password })
        .then((res) => {
          return res;
        })
        .catch((err) => Promise.reject(err));
    }
  }
});
