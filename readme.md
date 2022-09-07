### common-axios

> 一个基于 axios 封装的请求库,支持请求拦截、响应拦截、错误拦截，支持message弹窗提示，支持请求loading

### 安装方法
```shell
npm install common-axios -S
```

### 使用方法

```js
// 导出创建方法
import { createAxios } from 'common-axios'

/* 创建 axios 实例 */
const axios =
    createAxios(/** @see http://www.axios-js.com/zh-cn/docs/#axios-create-config **/)
```
> 除了上述地址包括配置之外还支持如下字段配置
### axios config 拓展属性
| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| axiosDebounce | 接口防抖<br/>同一个接口，同一个请求方式，同样的请求参数发起了多次数据请求，当第一次发起请求的接口没有返回数据之前，后续的接口都会被取消 | boolean | false |
| dataKey | 代表返回数据的key，支持a.b.c | string | - |
| axiosResponseCallback | 拦截成功回调用于全局拦截 | function | (axiosResponse: AxiosResponse) => void |
| axiosRequestCallback | 请求成功回调 用于全局拦截 | function | (axiosRequestConfigs: AxiosRequestConfigs) => void |



### 消息组件配置

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| <font color=yellow>errorStatusKey</font> | 代表失败的参数的key | string | -<br/>若<font color=yellow>errorStatusKey</font>存在，<font color=purple>errorStatusValue</font>也必须存在，反之亦然。<br/>当errorStatusKey在后端返回的数据中对应的值和errorStatusValue传递的值相等的话就会开启错误message组件 |
| <font color=purple>errorStatusValue</font> | 代表失败的参数的value | string | -<br/>若<font color=purple>errorStatusValue</font>存在，<font color=yellow>errorStatusKey</font>也必须存在，反之亦然。<br/>当errorStatusKey在后端返回的数据中对应的值和errorStatusValue传递的值相等的话就会开启错误message组件 |
| successStatusKey | 代表成功的参数的key | string | - |
| successStatusValue | 代表成功的参数的value | string | - |
| <font color=red>messageDuration</font> | 消息弹框持续时间 | number | - |
| <font color=green>messagePosition</font> | 消息弹框提示位置 | 'left'、'center'、'right' | - |
| <font color=blue>messageHoverStop</font> | 鼠标划入消息弹框是否停留 | boolean | false |
| successMessageDuration | 成功消息弹框持续时间 | number | - <br/>如果没有配置该属性且配置了<font color=red>messageDuration</font>属性，则执行 <font color=red>messageDuration</font> 的配置 |
| successMessagePosition | 成功消息提示的位置  | 'left'、'center'、'right' | 'left' <br/> 如果没有配置该属性 且配置了<font color=green>messagePosition</font> 属性 则执行 <font color=green>messagePosition</font> 的配置 |
| successMessageHoverStop | 鼠标划入成功消息弹框是否停留 | boolean | false <br> 如果没有配置该配置，且配置了  <font color=blue>messageHoverStop</font> 属性 则执行  <font color=blue>messageHoverStop</font> 的配置 |
| successMessageContentKey | 成功消息字段所对应的key | string | - <br/> 在后端返回的data字段中代表成功消息的key |
| successMessageContent | 成功消息提示的自定义内容 | string | - <br/> 在后端返回的data字段中代表成功消息的key多对应的值 <br/> 自定义内容优先级高于 successMessageContentKey 所对应的内容|
| errorMessageDuration | 错误消息持续时间 | number | - <br/>如果配置了<font color=red>messageDuration</font>，则会执行<font color=red>messageDuration</font>所对应的配置 |
| errorMessagePosition | 错误消息提示的位置 | 'left'、'center'、'right' | 如果配置了<font color=green>messagePosition</font> 属性 则执行 <font color=green>messagePosition</font> 的配置 |
| errorMessageHoverStop | 鼠标划入错误消息是否停留 | boolean | false <br> 如果没有配置该配置，且配置了  <font color=blue>messageHoverStop</font> 属性 则执行  <font color=blue>messageHoverStop</font> 的配置 |
| errorMessageContentKey | 错误消息字段所对应的key值 | string | - <br> 在后端返回的data字段中代表错误消息的key |
| errorMessageContent | 错误消息提示的自定义内容 | string | - <br/> 在后端返回的data字段中代表错误消息的key多对应的值 <br/> 错误消息提示的自定义内容优先级高于 errorMessageContentKey 所对应的内容 |

### 遮罩层组件配置
| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| text | 遮罩层文本 | string | -<br>如果有内容则会开启遮罩层 |
| color | 遮罩层文本颜色 | string | -<br> |
| target | 遮罩层覆盖的节点 | string（能让document.querySelector查找出内容的类名）、HTMLELEment | body节点 |
| background | 遮罩层背景色 | string | "#000" |
| opacity | 遮罩层背景色透明度 | string | "0.5" |
| customClass | 遮罩层自定义类名 | string | - |





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


### TODO

    1. common-axios 遮罩层在异步请求同步输出的时候的创建逻辑和销毁逻辑还存在bug;


### 免责声明

    本axios包是自己用业余时间封装打包的，如若您使用了该包，出现问题不负责任
