import { defineStore } from "pinia";

export const useErrorStore = defineStore("error", {
  state: () => ({
    loginAlert: false
  }),
  getters: {},
  actions: {
    setLoginAlert(status) {
      this.loginAlert = status;
    }
  }
});
