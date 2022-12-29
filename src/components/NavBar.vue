<template>
  <div class="flex items-center justify-between p-4 shadow-md">
    <div
      class="flex cursor-pointer items-center rounded border-2 border-dashed border-green-300 bg-amber-50 p-2"
      @click="onIndex"
    >
      <img class="w-5 pr-1" src="/vite.svg" alt="LetsVite" />
      <div class="text-sm font-medium">That's An Account System</div>
    </div>
    <div v-if="props.isLogin" class="flex">
      <Button class="mr-2" text="會員中心" @click="onAccount" />
      <Button class="mr-2" text="更改密碼" @click="onPasswordChange" />
      <Button text="登出" @click="onLogout" />
    </div>
    <div v-else class="flex">
      <Button class="mr-2" text="註冊" theme="outline" @click="onRegister" />
      <Button text="登入" @click="onLogin" />
    </div>
  </div>
</template>

<script setup>
import { inject } from "vue";
import { useRouter, useRoute } from "vue-router";
import Button from "@/components/CustomButton.vue";
const loading = inject("loading");
const router = useRouter();
const route = useRoute();
const props = defineProps({
  isLogin: {
    type: Boolean,
    default: false
  }
});

function onIndex() {
  router.push({ name: "Index" });
}
function onAccount() {
  console.log("account");
  router.push({ name: "Account" });
}
function onPasswordChange() {
  console.log("PasswordChange");
  router.push({ name: "ChangePassword" });
}
function onLogout() {
  console.log("logout", route);
}
function onRegister() {
  console.log("register", router);
  router.push({ name: "Register" });
}
function onLogin() {
  console.log("login", route);
  loading.play();
  router.push({ name: "Login" });
}
</script>
<style scoped></style>
