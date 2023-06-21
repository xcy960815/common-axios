<p align="center">
    <font size="6">common-axios</font>
</p>
<br/>

[![npm](https://img.shields.io/npm/v/common-axios.svg)](https://www.npmjs.com/package/common-axios)
[![npm](https://img.shields.io/npm/dm/common-axios.svg)](https://www.npmjs.com/package/common-axios)
[![npm](https://img.shields.io/npm/l/common-axios.svg)](https://www.npmjs.com/package/common-axios)
[![axios](https://img.shields.io/badge/axios-0.2.x-brightgreen.svg)](https://github.com/axios/axios)
<br/>

> 一个基于 axios 封装的请求库,支持请求拦截、响应拦截、错误拦截，支持 message 弹窗提示，支持接口防抖。

### 安装方法

```shell
npm install common-axios -S
```

### 使用方法

```js
// 导出创建方法
import { createAxios } from "common-axios";

/* 创建 axios 实例 */
const axios =
  createAxios(/** @see http://www.axios-js.com/zh-cn/docs/#axios-create-config **/);
```

> 除了上述地址包括配置之外还支持如下字段配置

### axios config 拓展属性

| 属性                  | 说明                                                                                                                                    | 类型     | 默认值                                             |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | -------- | -------------------------------------------------- |
| axiosDebounce         | 接口防抖<br/>同一个接口，同一个请求方式，同样的请求参数发起了多次数据请求，当第一次发起请求的接口没有返回数据之前，后续的接口都会被取消 | boolean  | false                                              |
| ~~dataKey~~           | ~~代表返回数据的 key，支持 a.b.c，例如后端返回一个对象 {a:{b:{c:'c'}}},并且可以通过泛型的方式约束返回数据类型~~                         | string   | -                                                  |
| axiosResponseCallback | 拦截成功回调用于全局拦截                                                                                                                | function | (axiosResponse: AxiosResponse) => void             |
| axiosRequestCallback  | 请求成功回调 用于全局拦截                                                                                                               | function | (axiosRequestConfigs: AxiosRequestConfigs) => void |

---

### 消息组件配置

| 属性                    | 说明                                                                                                                                                                                                                                                       | 类型                                               | 默认值 |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- | ------ |
| messageDuration         | 消息弹框持续时间                                                                                                                                                                                                                                           | number（毫秒）                                     | 2000   |
| messagePosition         | 消息弹框提示位置                                                                                                                                                                                                                                           | 'left'、'center'、'right'                          | 'left' |
| messageHoverStop        | 鼠标划入消息弹框是否停留                                                                                                                                                                                                                                   | boolean                                            | false  |
| errorStatusKey          | 代表失败的参数的 key<br/>若 errorStatusKey 存在，errorStatusValue 也必须存在，反之亦然。<br/>当 errorStatusKey 在后端返回的数据中对应的值和 errorStatusValue 传递的值相等的话就会开启错误 message 组件                                                     | string                                             | -      |
| errorStatusValue        | 代表失败的参数的 value<br/>若 errorStatusValue 存在，errorStatusKey 也必须存在，反之亦然。<br/>当 errorStatusKey 在后端返回的数据中对应的值和 errorStatusValue 传递的值相等或者包含存 errorStatusKey 在后端返回的数据中对应的值在就会开启错误 message 组件 | string,boolean,number,Array<string,boolean,number> | -      |
| errorMessageKey         | 错误消息字段所对应的 key 值 <br> 在后端返回的 data 字段中代表错误消息的 key                                                                                                                                                                                | string                                             | -      |
| errorMessageValue       | 错误消息提示的自定义内容 <br/> 在后端返回的 data 字段中代表错误消息的 key 多对应的值 <br/> 错误消息提示的自定义内容优先级高于 errorMessageKey 所对应的内容                                                                                                 | string                                             | -      |
| errorMessageDuration    | 错误消息持续时间（毫秒） <br/>如果配置了 messageDuration，则会执行 messageDuration 所对应的配置                                                                                                                                                            | number                                             | -      |
| errorMessagePosition    | 错误消息提示的位置 <br> 如果配置了 messagePosition 属性 则执行 messagePosition 的配置                                                                                                                                                                      | 'left'、'center'、'right'                          | 'left' |
| errorMessageHoverStop   | 鼠标划入错误消息是否停留 <br> 如果没有配置该配置，且配置了 messageHoverStop 属性 则执行 messageHoverStop 的配置                                                                                                                                            | boolean                                            | false  |
| successStatusKey        | 代表成功的参数的 key<br/> 同 errorStatusKey                                                                                                                                                                                                                | string                                             | -      |
| successStatusKey        | 代表成功的参数的 key                                                                                                                                                                                                                                       | string                                             | -      |
| successMessageKey       | 成功消息字段所对应的 key <br/> 在后端返回的 data 字段中代表成功消息的 key                                                                                                                                                                                  | string                                             | -      |
| successMessageValue     | 成功消息提示的自定义内容 <br/> 在后端返回的 data 字段中代表成功消息的 key 多对应的值 <br/> 自定义内容优先级高于 successMessageKey 所对应的内容                                                                                                             | string                                             | -      |
| successStatusValue      | 代表成功的参数的 value <br/> 同 errorStatusValue                                                                                                                                                                                                           | string,boolean,number,Array<string,boolean,number> | -      |
| successMessageDuration  | 成功消息弹框持续时间（毫秒） <br/>如果没有配置该属性且配置了 messageDuration 属性，则执行 messageDuration 的配置                                                                                                                                           | number                                             | 2000   |
| successMessagePosition  | 成功消息提示的位置 <br/> 如果没有配置该属性但是配置了 messagePosition 属性 则执行 messagePosition 的配置                                                                                                                                                   | 'left'、'center'、'right'                          | 'left' |
| successMessageHoverStop | 鼠标划入成功消息弹框是否停留 <br> 如果没有配置该配置，但是配置了 messageHoverStop 属性则执行 messageHoverStop 的配置                                                                                                                                       | boolean                                            | false  |

---

### 具体使用方法

```js
/* get请求参数位置以及请求配置 【 head 】请求如同*/
const result = await axiosHelpers.get(<url>,<params>,<config>)

/* post请求参数位置以及请求配置 【 put 】，【 patch 】请求如同 */
const result = await axiosHelpers.post(<url>,<data>,<config>)

/* delete请求参数位置以及请求配置 【 option 】请求如同 */
const result = await axiosHelpers.delete(<url>,<{params:params,data:data}>,<config>)
```

### 注意

    1.目前来说所有的请求第二个参数均是请求参数，第三个参数均是请求配置，如果不需要请求参数，还请用占位符代替！！！
