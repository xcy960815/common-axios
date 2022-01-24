### 声明

easy-axios

### 安装方法

```sh
npm install common-axios -S
```

```js

import commonAxios from 'common-axios'
// 创建 axios 实例
const commonAxiosInstance = commonAxios(/*option*/)
// get
const result1 = await commonAxiosInstance.get(<url>,<params>,<option>)
// post
const result2 = await commonAxiosInstance.post(<url>,<params>,<option>)
// delete
const result3 = await commonAxiosInstance.delete(<url>,<params>,<option>)

```
