<template>
  <button :class="btnOutlineStyle">
    {{ props.text }}
  </button>
</template>
<script setup>
import { computed } from "vue";
const props = defineProps({
  text: {
    type: String,
    default: ""
  },
  theme: {
    type: String,
    default: ""
  }
});
const btnOutlineStyle = computed(() =>
  props.theme === "outline" ? "btn-outline" : "btn"
);
</script>

<style scoped></style>
