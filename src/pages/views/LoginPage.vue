<template>
  <div class="flex flex-col items-center">
    <div class="mt-4 w-10/12 rounded-xl p-4 shadow-xl md:w-6/12">
      <template v-if="userStore.isLogin">
        <div class="text-center text-2xl">你已經登了，還想幹嘛呢</div>
      </template>
      <template v-else-if="!isForgetPassword">
        <div>
          <div class="pb-2 text-center text-xl">請登入</div>
          <CustomInput
            v-model="v$.account.username.$model"
            class="mb-8"
            placeholder="請輸入帳號(email)"
            :invalid="
              v$.account.username.$dirty && v$.account.username.$invalid
            "
          >
            <template #invalid>
              <div v-if="v$.account.username.required.$invalid">
                此欄位為必填
              </div>
              <div v-else-if="v$.account.username.email.$invalid">
                格式應為email
              </div>
            </template>
          </CustomInput>
          <CustomInput
            v-model="v$.account.password.$model"
            class="mb-8"
            placeholder="請輸入密碼"
            :input-type="'password'"
            :invalid="
              v$.account.password.$dirty && v$.account.password.$invalid
            "
            @keydown.enter.stop="onLogin"
          >
            <template #invalid>
              <div v-if="v$.account.password.required.$invalid">
                此欄位為必填
              </div>
            </template>
          </CustomInput>
          <div class="flex items-center justify-center">
            <CustomButton
              text="忘記密碼"
              theme="outline"
              class="mr-2"
              @click="isForgetPassword = true"
            />
            <CustomButton text="登入" @click="onLogin" />
          </div>
        </div>
      </template>
      <template v-else>
        <div class="pb-2 text-center text-xl">
          忘記了♬ 密碼的♪ 請跟我來♫ (◍•ᴗ•◍)
        </div>
        <CustomInput
          v-model="v$.forget.username.$model"
          class="mb-8"
          placeholder="請輸入帳號(email)"
          :invalid="v$.forget.username.$dirty && v$.forget.username.$invalid"
        >
          <template #invalid>
            <div v-if="v$.forget.username.required.$invalid">此欄位為必填</div>
            <div v-else-if="v$.forget.username.email.$invalid">
              格式應為email
            </div>
          </template>
        </CustomInput>
        <div class="flex items-center justify-center">
          <CustomButton
            text="取消"
            theme="outline"
            class="mr-2"
            @click="isForgetPassword = false"
          />
          <CustomButton text="重設密碼" @click="onReset" />
        </div>
      </template>
    </div>

    <PopupBox
      v-bind="loginAlert"
      @confirm="loginAlert.close"
      @close="loginAlert.close"
    />
  </div>
</template>
<script setup>
import { reactive, onMounted, inject, ref } from "vue";
import { useRouter } from "vue-router";
import { useErrorStore } from "@/store/error";
import { useUserStore } from "@/store/user";
import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import CustomInput from "@/components/CustomInput.vue";
import CustomButton from "@/components/CustomButton.vue";
import PopupBox from "@/components/PopupBox.vue";
const loading = inject("loading");
const errorStore = useErrorStore();
const userStore = useUserStore();
const router = useRouter();
const loginAlert = reactive({
  show: false,
  title: "",
  content: "",
  close: () => (loginAlert.show = false)
});
const isForgetPassword = ref(false);
const routeAlertMessage = {
  title: "尚未登入",
  content: "無法存取該頁面，請登入後重試"
};
const account = reactive({
  username: "",
  password: ""
});
const forget = reactive({
  username: ""
});
const v$ = useVuelidate(
  {
    account: {
      username: {
        required,
        email
      },
      password: {
        required
      }
    },
    forget: {
      username: {
        required,
        email
      }
    }
  },
  { account, forget }
);
onMounted(() => {
  if (errorStore.loginAlert === true) {
    loginAlert.title = routeAlertMessage.title;
    loginAlert.content = routeAlertMessage.content;
    loginAlert.show = true;
    errorStore.setLoginAlert(false);
  }
});
const onLogin = () => {
  v$.value.account.$touch();
  const invalid = v$.value.account.$invalid;
  if (invalid) return;
  const payload = {
    email: account.username,
    password: account.password
  };
  loading.play();
  userStore
    .userLogin(payload)
    .then(() => {
      router.push({ name: "Account" });
    })
    .catch((err) => {
      console.log("userLogin-err", err);
      loginAlert.title = "登入失敗";
      loginAlert.content = "帳號或密碼有誤";
      loginAlert.show = true;
    })
    .finally(() => {
      loading.stop();
    });
};
const onReset = () => {
  v$.value.forget.$touch();
  const invalid = v$.value.forget.$invalid;
  if (invalid) return;
  const payload = {
    email: forget.username
  };
  loading.play();
  userStore
    .resetPassword(payload)
    .then(() => {
      loginAlert.title = "重設成功";
      loginAlert.content = "請到您的email信箱收取新密碼";
      loginAlert.show = true;
      isForgetPassword.value = false;
    })
    .catch((err) => {
      console.log("userLogin-err", err);
      loginAlert.title = "重設失敗";
      loginAlert.content = "您輸入的帳號有誤哦！";
      loginAlert.show = true;
    })
    .finally(() => {
      loading.stop();
    });
};
</script>
<style scoped></style>
