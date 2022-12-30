import { useUserStore } from "@/store/user";
import { useErrorStore } from "@/store/error";

import * as VueRouter from "vue-router";
import Index from "@/pages/views/IndexPage.vue";
import Login from "@/pages/views/LoginPage.vue";
import RegisterPage from "@/pages/views/RegisterPage.vue";
import ForgetPassword from "@/pages/views/ForgetPassword.vue";
import Manage from "@/pages/views/manage/ManageIndex.vue";
import Account from "@/pages/views/manage/AccountData.vue";
import ChangePassword from "@/pages/views/manage/ChangePassword.vue";

const routes = [
  { path: "/", name: "Index", component: Index },
  { path: "/login", name: "Login", component: Login },
  { path: "/register", name: "Register", component: RegisterPage },
  { path: "/forget", name: "ForgetPassword", component: ForgetPassword },
  {
    path: "/manage",
    name: "Manage",
    component: Manage,
    meta: { loginRequired: true }
  },
  {
    path: "/account",
    name: "Account",
    component: Account,
    meta: { loginRequired: true }
  },
  {
    path: "/password",
    name: "ChangePassword",
    component: ChangePassword,
    meta: { loginRequired: true }
  }
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes
});
router.beforeEach(async (to, from) => {
  console.log({ to, from });
  const userStore = useUserStore();
  const errorStore = useErrorStore();
  const loginRequired = !!to.meta?.loginRequired;
  const result = await userStore
    .checkLogin()
    .then(() => {
      return true;
    })
    .catch(() => {
      if (loginRequired) {
        errorStore.setLoginAlert(true);
        return { name: "Login" };
      }
      return true;
    });
  return result;
});

export default router;
