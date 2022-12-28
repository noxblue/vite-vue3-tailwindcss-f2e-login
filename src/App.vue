<script setup>
import { reactive, provide } from "vue";
import Nav from "@/components/NavBar.vue";
import Loading from "@/components/LoadingAnimate.vue";
import PopupBox from "@/components/PopupBox.vue";
import { logout, checkLoginStatus } from "@/pages/apis/user.js";
const loadingAnimate = reactive({
  show: false,
  play: () => (loadingAnimate.show = true),
  stop: () => (loadingAnimate.show = false)
});
provide("loading", loadingAnimate);
logout()
  .then((res) => {
    console.log("res", res);
  })
  .catch((err) => {
    console.log("err", err);
  });
checkLoginStatus()
  .then((res) => {
    console.log("res", res);
  })
  .catch((err) => {
    console.log("err", err);
  });
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <div class="flex grow flex-col">
      <Nav />
      <router-view class="flex-1 grow"></router-view>
    </div>
    <Loading v-if="loadingAnimate.show" />
    <PopupBox />
  </div>
</template>

<style scoped></style>
