<template>
  <div class="flex flex-col items-center">
    <div class="mt-4 w-10/12 rounded-xl p-4 shadow-xl md:w-6/12">
      <template v-if="userStore.isLogin">
        <div class="text-center text-2xl">你已經登了，還想幹嘛呢</div>
      </template>
      <template v-else>
        <div>
          <div class="pb-2 text-center text-xl">請輸入註冊資料</div>
          <CustomInput
            v-model="v$.register.username.$model"
            class="mb-8"
            placeholder="請輸入帳號(email)"
            :invalid="
              v$.register.username.$dirty && v$.register.username.$invalid
            "
            :disabled="checkVerify.isPass"
          >
            <template #invalid>
              <div v-if="v$.register.username.required.$invalid">
                此欄位為必填
              </div>
              <div v-else-if="v$.register.username.email.$invalid">
                格式應為email
              </div>
            </template>
          </CustomInput>
          <CustomInput
            v-model="v$.register.password.$model"
            class="mb-8"
            placeholder="請輸入密碼"
            :input-type="'password'"
            :invalid="
              v$.register.password.$dirty && v$.register.password.$invalid
            "
            :disabled="checkVerify.isPass"
          >
            <template #invalid>
              <div v-if="v$.register.password.required.$invalid">
                此欄位為必填
              </div>
              <div
                v-else-if="
                  v$.register.password.minLength.$invalid ||
                  v$.register.password.maxLength.$invalid ||
                  v$.register.password.alphaNum.$invalid
                "
              >
                格式為8-20個英文數字哦！
              </div>
            </template>
          </CustomInput>
          <CustomInput
            v-model="v$.register.passwordAgain.$model"
            class="mb-8"
            placeholder="請再次輸入密碼"
            :input-type="'password'"
            :invalid="
              v$.register.passwordAgain.$dirty &&
              v$.register.passwordAgain.$invalid
            "
            :disabled="checkVerify.isPass"
            @keydown.enter.stop="onRegister"
          >
            <template #invalid>
              <div v-if="v$.register.passwordAgain.required.$invalid">
                此欄位為必填
              </div>
              <div
                v-else-if="
                  v$.register.passwordAgain.minLength.$invalid ||
                  v$.register.passwordAgain.maxLength.$invalid ||
                  v$.register.passwordAgain.alphaNum.$invalid
                "
              >
                格式為8-20個英文數字哦！
              </div>
              <div
                v-else-if="v$.register.passwordAgain.sameAsPassword.$invalid"
              >
                兩次密碼不相同
              </div>
            </template>
          </CustomInput>
          <template v-if="checkVerify.isPass">
            <div class="flex flex-col items-center">
              <div class="py-2 text-center text-xl">
                你的驗證碼是：{{ checkVerify.verifyCode }}
              </div>
              <CustomInput
                v-model="v$.verify.verifyCode.$model"
                class="mb-8"
                placeholder="請輸入驗證碼"
                :invalid="
                  v$.verify.verifyCode.$dirty && v$.verify.verifyCode.$invalid
                "
              >
                <template #invalid>
                  <div v-if="v$.verify.verifyCode.required.$invalid">
                    此欄位為必填
                  </div>
                </template>
              </CustomInput>
            </div>
          </template>
          <div class="flex items-center justify-center">
            <template v-if="!checkVerify.isPass">
              <CustomButton
                text="取消"
                theme="outline"
                class="mr-2"
                @click="window.history.go(-1)"
              />
              <CustomButton text="註冊" @click="onRegister" />
            </template>
            <template v-else>
              <CustomButton text="送出驗證碼" @click="onVerify" />
            </template>
          </div>
        </div>
      </template>
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
import { useUserStore } from "@/store/user";
import { useRouter } from "vue-router";
import { useVuelidate } from "@vuelidate/core";
import {
  required,
  email,
  minLength,
  maxLength,
  sameAs,
  alphaNum
} from "@vuelidate/validators";
import CustomInput from "@/components/CustomInput.vue";
import CustomButton from "@/components/CustomButton.vue";
import PopupBox from "@/components/PopupBox.vue";

const router = useRouter();
const loading = inject("loading");
const popupHandler = reactive({
  show: false,
  title: "",
  content: "",
  close: () => (popupHandler.show = false)
});
const userStore = useUserStore();
const register = reactive({
  account: "",
  password: "",
  passwordAgain: ""
});
const verify = reactive({
  verifyCode: "",
  verifyKey: ""
});
const checkVerify = reactive({ verifyCode: "", verifyKey: "", isPass: false });
// const password = computed(() => register.password);
const v$ = useVuelidate(
  {
    register: {
      username: {
        required,
        email
      },
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
        sameAsPassword: sameAs(computed(() => register.password))
      }
    },
    verify: {
      verifyCode: { required }
    }
  },
  { register, verify }
);

const onRegister = () => {
  v$.value.register.$touch();
  const invalid = v$.value.register.$invalid;
  if (invalid) return;
  const payload = {
    email: register.username,
    password: register.password
  };
  loading.play();
  userStore
    .userRegister(payload)
    .then((res) => {
      const { verifyCode, verifyKey } = res.data.data;
      Object.assign(checkVerify, { verifyCode, verifyKey, isPass: true });
    })
    .catch(() => {
      popupHandler.title = "註冊失敗";
      popupHandler.contet = "帳號或密碼有誤";
      popupHandler.show = true;
    })
    .finally(() => {
      loading.stop();
    });
};

const onVerify = () => {
  v$.value.verify.$touch();
  const invalid = v$.value.verify.$invalid;
  if (invalid) return;
  const payload = {
    verifyCode: verify.verifyCode,
    verifyKey: checkVerify.verifyKey
  };
  loading.play();
  userStore
    .verifyRegisterCode(payload)
    .then(() => {
      const loginPayload = {
        email: register.username,
        password: register.password
      };
      loading.play();
      userStore
        .userLogin(loginPayload)
        .then(() => {
          router.push({ name: "Account" });
        })
        .catch(() => {
          popupHandler.title = "登入失敗";
          popupHandler.content = "伺服器異常";
          popupHandler.show = true;
        })
        .finally(() => {
          loading.stop();
        });
    })
    .catch(() => {
      popupHandler.title = "驗證失敗";
      popupHandler.contet = "驗證碼錯誤或已使用過";
      popupHandler.show = true;
    })
    .finally(() => {
      loading.stop();
    });
};
</script>
<style scoped></style>
