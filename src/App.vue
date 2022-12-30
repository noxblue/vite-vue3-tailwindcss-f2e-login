<script setup>
import { reactive, provide } from "vue";
import { useUserStore } from "@/store/user";
import Nav from "@/components/NavBar.vue";
import Loading from "@/components/LoadingAnimate.vue";

const loadingAnimate = reactive({
  show: false,
  play: () => (loadingAnimate.show = true),
  stop: () => (loadingAnimate.show = false)
});
provide("loading", loadingAnimate);

const userStore = useUserStore();
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <div class="flex grow flex-col">
      <Nav :is-login="userStore.isLogin" />
      <router-view class="flex-1 grow"></router-view>
    </div>
    <Loading v-if="loadingAnimate.show" />
  </div>
</template>

<style scoped></style>
