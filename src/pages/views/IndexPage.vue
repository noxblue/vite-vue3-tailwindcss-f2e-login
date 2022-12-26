<template>
  <div class="flex flex-col items-center justify-center text-center text-xl">
    <p v-if="isLogin">
      這是一個首頁<br />好不容易進來了，卻又想出去<br />施主你是想開還是想不開？
    </p>
    <p v-else>這是一個首頁<br />看是想登入，還是想註冊<br />要看施主你自己</p>
  </div>
</template>
<script setup>
import { computed } from "vue";
const isLogin = computed(() => false);
</script>
<style scoped></style>
