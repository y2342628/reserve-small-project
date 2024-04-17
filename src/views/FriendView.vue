<script setup lang="ts">


</script>

<template>
  <div class="wrapper">
    <div class="content">
      <img src="../assets/friendTitle.png" />
      <p class="content-text">为更好地服务校友返校，我校将面向校友开放免预约出入校园的权限，校友网上申请完成校友卡注册即可凭电子卡入校。申请电子校友卡流程如下:</p>
      <p class="content-text">1.微信搜索“山工院校友之家”小程序。或长按下图小程序二维码，进入小程序。</p>
      <div class="mini-prog">
        <img  src="../assets/image.png" />
      </div>
      <p class="content-text">
        2.点击“校友卡”，进入校友认证页面，点击“去注册”按钮，输入姓名，搜索你的个人信息。若存在你的个人信息，输入“身份证号”完成认证。若不存在你的个人信息，点击“手动注册”，进行个人资料填写，提交认证申请。</p>
      <p class="content-text">3.经后台审核完成认证，点击“校友卡”，上传个人照片，完成校友卡领取。</p>
    </div>
  </div>
</template>

<style scoped lang="less">
.wrapper {
  width: 100%;
  height: 100%;
  padding: 2rem;
  position: relative;

  &::after {
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to top, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.9)), url("../assets/bg.jpg") center;
    background-size: cover;
    z-index: -1;
  }

  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-bottom: 40px;

    .content-text {
      margin: 8px;
      color: #29351c;
      text-indent: 2em;
    }

    .mini-prog{
        text-align: center;
        padding: 0 40px;
      }
  }

}
</style>
