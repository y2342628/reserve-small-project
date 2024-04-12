<script setup lang="ts">
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";

const router = useRouter();


const jumpPage = (path: string) => {
  const { user } = useUserStore();

  if (!user.token) return router.push("/login");

  router.push(path);
};
</script>

<template>
  <main class="wrapper">
    <div class="mt-8 text-center title">
      <div class="font-bold ">山东农业工程学院</div>
      <div class="font-bold">流苏节预约</div>
    </div>

    <van-row class="mt-8 btn-wrap">
      <van-col :span="24">
        <div class="custom-btn text-center font-bold reserve" @click="jumpPage('reserve')">预约登记</div>
      </van-col>
      <van-col :span="24" class="mt-2">
        <div class="custom-btn text-center font-bold record" @click="jumpPage('reserve-record')">预约记录</div>
      </van-col>
    </van-row>
  </main>
</template>

<style scoped lang="less">
.wrapper {
  width: 100%;
  height: 100%;
  padding: 2rem;
  position: relative;
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
    font-size: 3.5rem;
    color: #dcd510;
    letter-spacing: 1rem;
    text-shadow:1px 0px #009916, 1px 2px #006615, 3px 1px #009916,
		            2px 3px #006615, 4px 2px #009916, 4px 4px #006615,
		            5px 3px #009916, 5px 5px #006615, 7px 4px #009916,
  }
  .btn-wrap {
    background-color: var(--color-bg);
    padding: 3rem 2rem;
    border-radius: 6px;

  }

  .custom-btn {
    line-height: 2.4;
    border-radius: 6px;
    padding: 1rem;
    font-size: 2.6rem;
    &.reserve {
      color: rgb(53, 137, 136);
      background: linear-gradient(to bottom right, rgb(233, 246, 205) 0%, rgb(255, 255, 255) 100%);
    }
    &.record {
      color: rgb(216, 110, 16);
      background: linear-gradient(to bottom right, rgb(254, 239, 206) 0%, rgb(255, 255, 255) 100%);
    }
  }
}
</style>
@/stores/user
