<template>
  <div class="common-axios-demo">
    <h3 class="common-axios-demo-title">common-axios测试demo</h3>
    <div class="test-buttons">
      <div class="test-message-buttons">
        <p>测试消息弹框</p>
        <button
          class="test-message-button susscess"
          @click="handleTestSusscessMessage"
        >
          请求成功接口
        </button>
        <button
          class="test-message-button error"
          @click="handleTestErrorMessage"
        >
          请求报错接口
        </button>
      </div>
      <div class="test-debounce-buttons">
        <p>测试接口防抖</p>
        <button class="test-debounce-button" @click="handleTestDebounce">
          批量请求慢接口
        </button>
      </div>
      <div class="test-datakey-buttons">
        <p>测试dataKey功能</p>
        <button class="test-datakey-button" @click="handleTestDatakey">
          测试dataKey功能
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { testMessage } from "./test-message";
import { testDebounce } from "./test-debounce";
const { handleTestSusscessMessage, handleTestErrorMessage } = testMessage();
const { handleTestDebounce } = testDebounce();
</script>

<style lang="less" scoped>
.common-axios-demo {
  padding: 1% 5%;

  .common-axios-demo-title {
    text-align: center;
  }

  .test-buttons {
    display: flex;
    justify-content: space-between;

    .test-message-buttons,
    .test-debounce-buttons,
    .test-datakey-buttons {
      display: flex;
      flex-direction: column;

      .test-message-button,
      .test-debounce-button,
      .test-datakey-button {
        margin-bottom: 10px;
      }
    }
  }
}
</style>
