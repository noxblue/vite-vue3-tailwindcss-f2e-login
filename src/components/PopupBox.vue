<template>
  <transition name="popup">
    <div
      v-if="props.show"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
    >
      <div class="absolute inset-0 z-0" @click.stop="onOutsideClick" />
      <div
        class="popup__body z-10 flex max-h-[90vh] w-10/12 flex-col items-center justify-center rounded-xl bg-white p-5 shadow-xl md:w-4/12"
      >
        <div class="max-w-full break-words text-center text-2xl font-semibold">
          {{ props.title }}
        </div>
        <div class="max-w-full break-words py-2 text-center text-base">
          {{ props.content }}
        </div>
        <CustomButton text="關閉" @click="onConfirm" />
      </div>
    </div>
  </transition>
</template>
<script setup>
import CustomButton from "@/components/CustomButton.vue";
const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: ""
  },
  content: {
    type: String,
    default: ""
  }
});
const emit = defineEmits(["confirm", "close"]);
const onConfirm = () => {
  emit("confirm");
};

const onOutsideClick = () => {
  emit("close");
};
</script>
<style scoped>
.popup-enter-active,
.popup-leave-active {
  transition: opacity 0.3s ease-in-out;
  .popup__body {
    transition: transform 0.3s ease-in-out;
  }
}

.popup-enter,
.popup-leave-to {
  opacity: 0;
  .popup__body {
    transform: translateY(-30px);
  }
}
</style>
