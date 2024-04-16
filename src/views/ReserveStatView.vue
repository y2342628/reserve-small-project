<script setup lang="ts">
import { ref, onMounted } from "vue";
import { type RecordStatItem } from "@/service/interface";
import { get } from "@/utils/request";
import { dateFormat, isBoforeByDay } from "@/utils/dateFormat";


const list = ref<RecordStatItem[]>([]);
const loading = ref<boolean>(false);
const finished = ref<boolean>(false);

const onLoad = async () => {
  const res: RecordStatItem[] = await get(`/Reservation/Statistic`);

  loading.value = false;

  list.value.push({
    reDate: "total",
    count: res.map(i => i.count).reduce((accumulator, currentValue) => accumulator + currentValue, 0)
  });

  list.value.push(
    ...res.reverse().map((i) => ({
      ...i,
      reDate: dateFormat(i.reDate),
      isExpire: isBoforeByDay(i.reDate)
    }))
  );
  finished.value = true;
};

onMounted(() => {
  onLoad();
});
</script>

<template>
  <div class="reserve-record">
    <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了">
      <van-cell-group class="reserve-card" v-for="item in list" :key="item.reDate">
        <van-cell v-if="item.reDate != 'total'" :class="item.isExpire ? `rev-out` : `rev-in`" title="预约时间"
          :value="item.isExpire ? '已过期' : '有效'" :label="item.reDate" />
        <van-cell v-if="item.reDate != 'total'" class="count" title="预约人数" :value="item.count + ' 人'" />
        <van-cell v-if="item.reDate == 'total'" title="总计人数" :value="item.count + ' 人'" />
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
    border-radius: 10px;

    &+.reserve-card {
      margin-top: 2rem;
    }

    .van-cell {
      border-radius: 10px;
    }

    .rev-out {
      :deep(.van-cell__value) {
        color: grey;
      }
    }

    .rev-in {
      :deep(.van-cell__value) {
        color: #acd78d;
      }
    }

    .count {
      :deep(.van-cell__value) {
        color: black;
      }
    }
  }
}
</style>
