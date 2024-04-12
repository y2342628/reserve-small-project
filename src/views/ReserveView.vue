<script setup lang="ts">
import { ref } from "vue";
import { type ReserveFormDate } from "@/service/interface";
import { post } from "@/utils/request";
import { dateFormat } from "@/utils/dateFormat";
import { showToast } from "vant";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";

const router = useRouter();
const {user} = useUserStore()

const codeImgPattern = /^\d{15}$|^\d{18}$/;
const reIdCode = ref<string>(user.idCode);
const reName = ref<string>();
const reDate = ref<string>();
const showCalendar = ref<boolean>();

function onConfirm(date: Date) {
  showCalendar.value = false;
  reDate.value = dateFormat(date);
}

async function onSubmit(formData: ReserveFormDate) {
  const res = await post("/Reservation/Add", formData);
  showToast("预约成功");
  setTimeout(() => {
    router.push("/");
  }, 1000);
}
</script>

<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field size="large" v-model="reIdCode" name="reIdCode" label="入校人身份证" placeholder="入校人身份证" :rules="[{ required: true, message: '请填写入校人身份证' },{ pattern:codeImgPattern, message: '请填写正确的身份证号码' }]" />
      <van-field size="large" v-model="reName" name="reName" label="入校人姓名" placeholder="入校人姓名" :rules="[{ required: true, message: '请填写入校人姓名' }]" />
      <van-field
        v-model="reDate"
        size="large"
        is-link
        readonly
        name="reDate"
        label="预约时间"
        placeholder="点击选择预约时间"
        :rules="[{ required: true, message: '请选择预约时间' }]"
        @click="showCalendar = true"
      />
    </van-cell-group>
    <div class="mt-2 ms-1 me-1">
      <van-button round block type="primary" native-type="submit">确 定</van-button>
    </div>
  </van-form>

  <van-calendar v-model:show="showCalendar" @confirm="onConfirm" />
</template>
