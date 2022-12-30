<template>
  <div>
    Login
    <PopupBox
      v-bind="loginAlert"
      @confirm="loginAlert.close"
      @close="loginAlert.close"
    />
  </div>
</template>
<script setup>
import { reactive, onMounted } from "vue";
import { useErrorStore } from "@/store/error";
import PopupBox from "@/components/PopupBox.vue";
const errorStore = useErrorStore();
const loginAlert = reactive({
  show: false,
  title: "尚未登入",
  content: "無法存取該頁面，請登入後重試",
  close: () => (loginAlert.show = false)
});
onMounted(() => {
  if (errorStore.loginAlert === true) {
    loginAlert.show = true;
    errorStore.setLoginAlert(false);
  }
});
</script>
<style scoped></style>
