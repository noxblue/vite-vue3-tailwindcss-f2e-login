<script setup>
import { ref } from "vue";
import Button from "@/components/CustomButton.vue";
import Input from "@/components/CustomInput.vue";

defineProps({
  msg: { type: String, default: "" }
});

const count = ref(0);
const testInput = ref(null);
</script>

<template>
  <h1 class="text-7xl">{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
    <Button text="測試按鈕" theme="outline" />
    <Input v-model="testInput" placeholder="請開始你的表演">
      <template #invalid>
        <div>It's Danger</div>
      </template>
    </Input>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Install
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
