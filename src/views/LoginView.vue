<script setup lang="ts">
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import { v4 as uuidv4 } from "uuid";
import { get, post } from "@/utils/request";
import { type LoginFormData, type UserProp } from "@/service/interface";
import { useUserStore } from "@/stores/user";

const router = useRouter();
const {updateUser} = useUserStore()



const verifyKey = ref<string>(uuidv4());
const verifyCodeImg = ref<string>();
const codeImgPattern = /^\d{15}$|^\d{18}$/;


const idCode = ref<string>();
const verifyCode = ref<string>();


async function getVerifyCode() {
  const blob = await get(`/VerifyCode/Get/${verifyKey.value}`, {}, { responseType: "blob" });
  if (!blob) return;
  verifyCodeImg.value = URL.createObjectURL(blob as any);
}

onMounted(() => {
  getVerifyCode();
});

function refresh() {
  verifyKey.value = uuidv4();
  getVerifyCode();
}

async function onSubmit(formData: LoginFormData) {
  const res:UserProp = await post("/User/Login",{
    ...formData,
    verifyKey:verifyKey.value
  })
  
  updateUser(res);
  router.push("/")
}
</script>

<template>
  <div class="wrapper">
    <h2 class="title mb-3 font-bold">用户登录</h2>
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field class="display-none" v-model="verifyKey" type="hidden"></van-field>
        <van-field
          size="large"
          v-model="idCode"
          name="idCode"
          label="身份证号码"
          placeholder="身份证号码"
          :rules="[
            { required: true, message: '请填写身份证号码' },
            { pattern:codeImgPattern, message: '请填写正确的身份证号码' },
          ]"
        />
        <van-row>
          <van-col span="16"><van-field size="large" v-model="verifyCode" name="verifyCode" label="验证码" placeholder="验证码" :rules="[{ required: true, message: '请填写验证码' }]" /></van-col>
          <van-col span="8" @click="refresh">
            <van-image height="50" width="114" :src="verifyCodeImg" />
          </van-col>
        </van-row>
      </van-cell-group>
      <div class="mt-2 ms-1 me-1">
        <van-button round block type="primary" native-type="submit">登 录</van-button>
      </div>
    </van-form>
  </div>
</template>

<style scoped lang="less">
.wrapper {
  width: 100%;
  height: 100%;
  padding: 2rem;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("../assets/bg.png") center no-repeat;
    background-size: cover;
    z-index: -1;
    filter: blur(2px);
    pointer-events: none; /* 添加这行，使虚化层不响应点击事件 */
  }
  .title {
    font-size: 3rem;
  }
}
</style>
