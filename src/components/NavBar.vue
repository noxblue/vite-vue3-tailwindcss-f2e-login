<template>
  <div class="flex items-center justify-between p-4 shadow-md">
    <div
      class="flex items-center rounded border-2 border-dashed border-green-300 bg-amber-50 p-2"
    >
      <img class="w-5 pr-1" src="/vite.svg" alt="LetsVite" />
      <div class="text-sm font-medium">That's An Account System</div>
    </div>
    <div v-if="isLogin" class="flex">
      <Button class="mr-2" text="會員中心" @click="onAccount" />
      <Button text="登出" @click="onLogout" />
    </div>
    <div v-else class="flex">
      <Button class="mr-2" text="註冊" theme="outline" @click="onRegister" />
      <Button text="登入" @click="onLogin" />
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import Button from "@/components/CustomButton.vue";

const isLogin = computed(() => false);

function onAccount() {
  console.log("account");
}
function onLogout() {
  console.log("logout");
}
function onRegister() {
  console.log("register");
}
function onLogin() {
  console.log("login");
}
</script>
<style scoped></style>
