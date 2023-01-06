<template>
  <div
    :class="outlineStyle"
    class="relative block h-12 w-full rounded-md p-3 shadow transition-all duration-100"
    @click.stop="onClick"
  >
    <div :class="placeholderStyle" class="transition-all duration-300">
      {{ placeholder }}
    </div>
    <input
      ref="input"
      :type="inputType"
      :value="props.modelValue"
      :disabled="disabled"
      class="w-full border-none outline-none transition-all duration-300"
      :class="inputStyle"
      @input="onInput"
      @focus="onFocus"
      @blur="onBlur"
    />
    <div v-if="invalid" class="absolute bottom-0 left-0 translate-y-full">
      <div class="p-2 text-sm text-red-500">
        <slot name="invalid" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, nextTick, onMounted } from "vue";

const props = defineProps({
  modelValue: {
    type: String,
    default: ""
  },
  inputType: {
    type: String,
    default: "text"
  },
  placeholder: {
    type: String,
    default: ""
  },
  invalid: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  }
});

// 預先註冊要呼叫的emit
const emits = defineEmits(["update:modelValue"]);

// 設定一個變數用來管理樣式，是否正在編輯中
const onfocused = ref(false);

// 設定一個變數用來作為元素的ref，以便取得元素進行操作
const input = ref(null);

onMounted(() => {
  // 渲染後input變數的value才被賦予取得元素本身，如需操作，使用其值value進行操作
  // console.log("input", input.value);
});

const outlineStyle = computed(() => {
  const border = props.invalid
    ? ["border-red-300", "border-2"]
    : onfocused.value
    ? ["border-lime-500", "border-2"]
    : ["border-gray-300", "border"];
  const padding = !!props.modelValue || onfocused.value ? ["pt-1"] : [];
  const bgColor = props.disabled ? ["bg-gray-200"] : props.invalid ? [] : [];
  return [...border, ...padding, ...bgColor];
});
const placeholderStyle = computed(() =>
  !!props.modelValue || onfocused.value
    ? ["text-xs", "leading-3", "text-gray-700"]
    : ["text-base", "text-gray-400"]
);
const inputStyle = computed(() =>
  !!props.modelValue || onfocused.value ? "opacity-100" : "opacity-0"
);

function onInput(e) {
  const value = e.target.value.trim();
  emits("update:modelValue", value);
}
function onFocus() {
  if (onfocused.value) return;
  onfocused.value = true;
}
function onBlur() {
  if (!onfocused.value) return;
  onfocused.value = false;
}
function onClick() {
  if (props.disabled) return;
  nextTick(() => {
    // 變數input作為ref被綁在元素上，渲染後將元素賦值於value，因此要操作元素focus，則使用value進行操作
    input.value.focus();
  });
}
</script>

<style scoped></style>
