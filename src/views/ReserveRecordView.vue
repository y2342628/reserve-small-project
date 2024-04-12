<script setup lang="ts">
import { ref } from "vue";
import { type ReserveFormDate, type RecordList, type RecordItem } from "@/service/interface";
import { get } from "@/utils/request";
import { dateFormat, isBoforeByDay } from "@/utils/dateFormat";
import expireImg from "@/assets/expire.png";
import { showToast } from "vant";

const list = ref<RecordItem[]>([]);
const loading = ref<boolean>(false);
const finished = ref<boolean>(false);
const pageIndex = ref<number>(1);

const onLoad = async () => {
  const res: RecordList = await get(`/Reservation/MyList?pageIndex=${pageIndex.value}&pageSize=10`);
  pageIndex.value += 1;

  loading.value = false;
  list.value.push(
    ...res.data.map((i) => ({
      ...i,
      reDate: dateFormat(i.reDate),
      isExpire: isBoforeByDay(i.reDate),
    }))
  );

  // 数据全部加载完成
  if (list.value.length >= res.count) {
    finished.value = true;
  }
};
</script>

<template>
  <div class="reserve-record">
    <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell-group class="reserve-card" v-for="item in list" :key="item.id">
        <van-cell title="手机号码" :value="item.phone" />
        <van-cell title="预约时间" value="" :label="item.reDate" />
        <van-image class="expire-wrap" v-if="item.isExpire" width="50" height="50" :src="expireImg" />
      </van-cell-group>
    </van-list>
  </div>
</template>

<style>
.reserve-record {
  min-height: 100vh;
  background-color: var(--gray-bg);
  padding: 2rem;

  .reserve-card {
    position: relative;
    border-radius: 4px;
    & + .reserve-card {
      margin-top: 2rem;
    }
    .expire-wrap {
      position: absolute;
      right: 2rem;
      top: -80%;
    }
  }
}
</style>
