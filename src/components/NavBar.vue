<template>
  <div class="flex items-center justify-between p-4 shadow-md">
    <div
      class="flex cursor-pointer items-center rounded border-2 border-dashed border-green-300 bg-amber-50 p-2"
      @click="onIndex"
    >
      <img class="w-5 pr-1" src="/vite.svg" alt="LetsVite" />
      <div class="text-sm font-medium">That's An Account System</div>
    </div>
    <div v-if="props.isLogin" class="flex pl-4">
      <Button
        class="mr-2"
        text="會員中心"
        :disabled="routeName === 'Account'"
        @click="onAccount"
      />
      <Button
        class="mr-2"
        text="更改密碼"
        :disabled="routeName === 'ChangePassword'"
        @click="onPasswordChange"
      />
      <Button text="登出" @click="onLogout" />
    </div>
    <div v-else class="flex">
      <Button
        class="mr-2"
        text="註冊"
        theme="outline"
        :disabled="routeName === 'Register'"
        @click="onRegister"
      />
      <Button text="登入" :disabled="routeName === 'Login'" @click="onLogin" />
    </div>
  </div>
</template>

<script setup>
import { inject, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useUserStore } from "@/store/user";
import Button from "@/components/CustomButton.vue";

const userStore = useUserStore();
const loading = inject("loading");
const router = useRouter();
const route = useRoute();
const props = defineProps({
  isLogin: {
    type: Boolean,
    default: false
  }
});
const routeName = computed(() => {
  return route.name;
});

function onIndex() {
  router.push({ name: "Index" });
}
function onAccount() {
  router.push({ name: "Account" });
}
function onPasswordChange() {
  router.push({ name: "ChangePassword" });
}
function onLogout() {
  userStore.userLogout().then(() => {
    router.push({ name: "Index" });
  });
}
function onRegister() {
  router.push({ name: "Register" });
}
function onLogin() {
  loading.play();
  router.push({ name: "Login" });
  loading.stop();
}
</script>
<style scoped></style>
