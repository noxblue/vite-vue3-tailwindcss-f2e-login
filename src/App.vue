<script setup>
import Nav from "@/components/NavBar.vue";
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <div class="flex grow flex-col">
      <Nav />
      <router-view class="flex-1 grow"></router-view>
    </div>
  </div>
</template>

<style scoped></style>
