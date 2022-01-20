### 声明

easy-axios

### 安装方法

```sh
npm install easyAxios -S
```

```js

import easyAxios from 'easyAxios'
// 创建 axios 实例
const easyAxiosInstance = easyAxios(/*option*/)
// get
const result1 = await easyAxiosInstance.get(<url>,<params>,<option>)
// post
const result2 = await easyAxiosInstance.post(<url>,<params>,<option>)
// delete
const result3 = await easyAxiosInstance.delete(<url>,<params>,<option>)

```
