### common-axios

### 安装方法

```sh
npm install common-axios -S

yarn add simple-axios
```

### 设计目的

    1.统一所有请求方法的入参规则, 第一个参数为 url, 第二个参数为携带的请求参数, 第三个参数为请求配置项
    2.引用element-ui的Loading组件 在axios拦截器里面同一进行拦截，消息提示
    3.未完待续

### 快速开始

```js
// 导出创建方法
import { createAxios } from 'common-axios'

// 创建 axios 实例
const axios = createAxios(/** @see http://www.axios-js.com/zh-cn/docs/#axios-create-config **/)

// get
const result1 = await axiosHelpers.get(<url>,<params>,<option>)

// post
const result2 = await axiosHelpers.post(<url>,<params>,<option>)

// delete
const result3 = await axiosHelpers.delete(<url>,<params>,<option>)

```
