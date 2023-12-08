<template>
  <div class="flex flex-col items-center">
    <div class="mt-4 w-10/12 rounded-xl p-4 shadow-xl md:w-6/12">
      <div>
        <div class="pb-2 text-center text-xl">變更密碼</div>
        <CustomInput
          v-model="v$.changePassword.password.$model"
          class="mb-8"
          placeholder="請輸入密碼"
          :input-type="'password'"
          :invalid="
            v$.changePassword.password.$dirty &&
            v$.changePassword.password.$invalid
          "
        >
          <template #invalid>
            <div v-if="v$.changePassword.password.required.$invalid">
              此欄位為必填
            </div>
            <div
              v-if="
                v$.changePassword.password.minLength.$invalid ||
                v$.changePassword.password.maxLength.$invalid ||
                v$.changePassword.password.alphaNum.$invalid
              "
            >
              格式為8-20個英文數字哦！
            </div>
          </template>
        </CustomInput>
        <CustomInput
          v-model="v$.changePassword.passwordAgain.$model"
          class="mb-8"
          placeholder="請再次輸入密碼"
          :input-type="'password'"
          :invalid="
            v$.changePassword.passwordAgain.$dirty &&
            v$.changePassword.passwordAgain.$invalid
          "
          @keydown.enter.stop="onChangePassword"
        >
          <template #invalid>
            <div v-if="v$.changePassword.passwordAgain.required.$invalid">
              此欄位為必填
            </div>
            <div
              v-else-if="
                v$.changePassword.passwordAgain.minLength.$invalid ||
                v$.changePassword.passwordAgain.maxLength.$invalid ||
                v$.changePassword.passwordAgain.alphaNum.$invalid
              "
            >
              格式為8-20個英文數字哦！
            </div>
            <div
              v-else-if="
                v$.changePassword.passwordAgain.sameAsPassword.$invalid
              "
            >
              兩次密碼不相同
            </div>
          </template>
        </CustomInput>
        <div class="flex items-center justify-center">
          <CustomButton
            text="取消"
            theme="outline"
            class="mr-2"
            @click="window.history.go(-1)"
          />
          <CustomButton text="送出" @click="onChangePassword" />
        </div>
      </div>
    </div>
    <PopupBox
      v-bind="popupHandler"
      @confirm="popupHandler.close"
      @close="popupHandler.close"
    />
  </div>
</template>

<script setup>
import { reactive, inject, computed } from "vue";
import { useRouter } from "vue-router";
import { useVuelidate } from "@vuelidate/core";
import {
  required,
  minLength,
  maxLength,
  sameAs,
  alphaNum
} from "@vuelidate/validators";
import { useUserStore } from "@/store/user";
import CustomInput from "@/components/CustomInput.vue";
import CustomButton from "@/components/CustomButton.vue";
import PopupBox from "@/components/PopupBox.vue";

const loading = inject("loading");
const router = useRouter();
const userStore = useUserStore();
const popupHandler = reactive({
  show: false,
  title: "",
  content: "",
  close: () => (popupHandler.show = false)
});

const changePassword = reactive({
  password: "",
  passwordAgain: ""
});

const v$ = useVuelidate(
  {
    changePassword: {
      password: {
        required,
        alphaNum,
        minLength: minLength(8),
        maxLength: maxLength(20)
      },
      passwordAgain: {
        required,
        alphaNum,
        minLength: minLength(8),
        maxLength: maxLength(20),
        sameAsPassword: sameAs(computed(() => changePassword.password))
      }
    }
  },
  { changePassword }
);
const onChangePassword = () => {
  v$.value.changePassword.$touch();
  const invalid = v$.value.changePassword.$invalid;
  if (invalid) return;
  const payload = {
    password: changePassword.password
  };
  loading.play();
  userStore
    .changePassword(payload)
    .then(() => {
      popupHandler.title = "變更密碼成功";
      popupHandler.content = "請重新登入";
      popupHandler.show = true;
      popupHandler.close = () => {
        userStore.userLogout().then(() => {
          popupHandler.show = false;
          router.push({ name: "Index" });
        });
      };
    })
    .catch(() => {
      popupHandler.title = "變更密碼失敗";
      popupHandler.content = "密碼不符規則，應為8-20個英文數字";
      popupHandler.show = true;
    })
    .finally(() => {
      loading.stop();
    });
};
</script>

<style scoped></style>
