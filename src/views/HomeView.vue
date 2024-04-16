<script setup lang="ts">
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";

const router = useRouter();


const jumpPage = (path: string) => {
  const { user } = useUserStore();

  if (path != 'friend' && !user.token) return router.push("/login");

  router.push(path);
};
</script>

<template>
  <main class="wrapper">
    <img src = "../assets/title.png" class="title"/>

    <van-row class="mt-3 btn-wrap">
      <van-col :span="24">
        <div class="custom-btn text-center font-bold reserve" @click="jumpPage('reserve')">社会人员预约</div>
      </van-col>
      <van-col :span="24" class="mt-1">
        <div class="custom-btn text-center font-bold record" @click="jumpPage('reserve-record')">预约记录</div>
      </van-col>
      <van-col :span="24" class="mt-1">
        <div class="custom-btn text-center font-bold friend" @click="jumpPage('friend')">校友通道</div>
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.4);
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to top, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.9)), url("../assets/bg.jpg") center;
    background-size: cover;
    background-attachment:fixed;
    z-index: -1;
  }
  .title {
    width:100%;
  }
  .btn-wrap {
    background-color: var(--color-bg);
    padding: 2rem 1rem;
    border-radius: 6px;
    border:1px solid #acd78d;
  }

  .custom-btn {
    line-height: 2.4;
    border-radius: 6px;
    padding: 1rem;
    font-size: 1.8rem;
    &.reserve {
      color: rgb(53, 137, 136);
      background: linear-gradient(to bottom right, rgb(233, 246, 205) 0%, rgb(255, 255, 255) 100%);
    }
    &.record {
      color: rgb(216, 110, 16);
      background: linear-gradient(to bottom right, rgb(254, 239, 206) 0%, rgb(255, 255, 255) 100%);
    }
    &.friend {
      color: #50b1f3;
      background: linear-gradient(to bottom right, #c8dfee 0%, rgb(255, 255, 255) 100%);
    }
  }
}
</style>
@/stores/user
