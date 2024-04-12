<script setup lang="ts">
import { ref } from "vue";
import { type RecordList, type RecordItem } from "@/service/interface";
import { get } from "@/utils/request";
import { dateFormat, isBoforeByDay } from "@/utils/dateFormat";


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
      isExpire: isBoforeByDay(i.reDate)
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
        <van-cell :class="item.isExpire?`rev-out`:`rev-in`" title="预约时间" :value="item.isExpire? '已过期': '有效'" :label="item.reDate" />
        <van-cell title="入校人身份证" :value="item.reIdCode" />
        <van-cell title="入校人姓名" :value="item.reName" />
      </van-cell-group>
    </van-list>
  </div>
</template>

<style scoped lang="less">
.reserve-record {
  min-height: 100vh;
  background-color: var(--gray-bg);
  padding: 2rem;

  .reserve-card {
    position: relative;
    border-radius:10px;
    & + .reserve-card {
      margin-top: 2rem;
    }
    .van-cell {
      border-radius:10px;
    }
    .rev-out{
      :deep(.van-cell__value){
        color:grey;
      }
    }
    .rev-in{
      :deep(.van-cell__value){
        color:#acd78d;
      }
    }
    .expire-wrap {
      position: absolute;
      right: 2rem;
      top: -80%;
    }
  }
}
</style>
