<template>
  <div class="flex flex-col items-center justify-center text-center text-xl">
    <p v-if="userStore.isLogin">
      這裡是首頁<br />好不容易進來了，卻又想出去<br />施主你是想開還是想不開？
    </p>
    <p v-else>這裡是首頁<br />看是想登入，還是想註冊<br />要看施主你自己</p>
    <br />
    <p class="text-2xl text-lime-600">請開始你的表演</p>
  </div>
</template>
<script setup>
import { useUserStore } from "@/store/user";
const userStore = useUserStore();
</script>
<style scoped></style>
