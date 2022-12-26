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
  { path: "/manage", name: "Manage", component: Manage },
  { path: "/account", name: "Account", component: Account },
  { path: "/password", name: "ChangePassword", component: ChangePassword }
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes
});

export default router;
