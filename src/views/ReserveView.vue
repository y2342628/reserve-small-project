<script setup lang="ts">
import { ref } from "vue";
import { type ReserveFormDate } from "@/service/interface";
import { post } from "@/utils/request";
import { dateFormat } from "@/utils/dateFormat";
import { showToast } from "vant";
import { useRouter } from "vue-router";

const router = useRouter();

const phone = ref<string>();
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
      <van-field size="large" v-model="phone" name="phone" label="手机号码" placeholder="手机号码" :rules="[{ required: true, message: '请填写手机号码' }]" />
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
