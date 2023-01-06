<template>
  <div>
    <div class="py-3 text-center text-xl">This is the Account Page, man~</div>
    <div class="text-center text-3xl">
      <span class="font-semibold text-lime-600">{{ username }}</span
      ><br />
      竟然...是你...！！
    </div>
  </div>
</template>
<script setup>
import { computed } from "vue";
import { useUserStore } from "@/store/user";
const userStore = useUserStore();

const username = computed(() => {
  return userStore.account.split("@")[0].toUpperCase();
});
</script>
<style scoped></style>
