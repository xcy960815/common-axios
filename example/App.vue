<template>
  <div class="common-axios-demo">
    <h3 class="common-axios-demo-title">common-axios测试demo</h3>
    <div class="test-buttons">
      <div class="test-message-buttons">
        <p>测试消息的接口</p>
        <button class="test-message-button susscess" @click="handleGetSusscessApi">请求成功接口</button>
        <button class="test-message-button error" @click="handleGetErrorApi">请求报错接口</button>
      </div>
      <div class="test-debounce-buttons">
        <p>测试接口防抖</p>
        <button class="test-debounce-button" @click="handleGetDebounceApi">批量请求慢接口</button>
      </div>
      <div class="test-mask-layer-buttons">
        <p>测试遮罩层的接口</p>
        <button class="test-mask-layer-button fast" @click="handleGetFastApi('请求快接口')">请求快接口</button>
        <button class="test-mask-layer-button slow" @click="handleGetSlowApi('请求慢接口')">请求慢接口</button>
      </div>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { testMessage } from "./test-message";
import { testMaskLayer } from "./test-mask-layer";
import { testDebounce } from "./test-debounce";
const { handleGetSusscessApi, handleGetErrorApi } = testMessage();
const { handleGetFastApi, handleGetSlowApi } = testMaskLayer();
const { handleGetDebounceApi } = testDebounce();
</script>

<style lang='less' scoped>
.common-axios-demo {
  padding: 1% 5%;

  .common-axios-demo-title {
    text-align: center;
  }

  .test-buttons {
    display: flex;
    justify-content: space-between;

    .test-message-buttons,
    .test-mask-layer-buttons {
      display: flex;
      flex-direction: column;

      .test-message-button,
      .test-mask-layer-button {
        margin-bottom: 10px;
      }
    }
  }
}
</style>