<template>
  <button :class="btnOutlineStyle" :disabled="props.disabled">
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
  },
  disabled: {
    type: Boolean,
    default: false
  }
});
const btnOutlineStyle = computed(() =>
  props.disabled
    ? "btn-disabled"
    : props.theme === "outline"
    ? "btn-outline"
    : "btn"
);
</script>

<style scoped></style>
