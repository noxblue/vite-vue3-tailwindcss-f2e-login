<script setup>
import { reactive, provide } from "vue";
import { useUserStore } from "@/store/user";
import Nav from "@/components/NavBar.vue";
import Loading from "@/components/LoadingAnimate.vue";
import PopupBox from "@/components/PopupBox.vue";

const loadingAnimate = reactive({
  show: false,
  play: () => (loadingAnimate.show = true),
  stop: () => (loadingAnimate.show = false)
});
const popup = reactive({
  show: true,
  title: "FBI! OPEN UP!",
  content: "不要動，先來示範一下什麼叫做POPUP元件。",
  close: () => (popup.show = false)
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
    <PopupBox
      :show="popup.show"
      :title="popup.title"
      :content="popup.content"
      @confirm="popup.close"
      @close="popup.close"
    />
  </div>
</template>

<style scoped></style>
