/**
 * 执行方法返回的对象所包含的属性
 */
export type GetValueByKeyInOpject = <T = unknown>(
    key: string,
    object: { [k: string]: unknown }
) => T

/**
 * @desc 通过key查找object里面的值
 * @param key object的属性
 * @param object 数据
 * @returns object[key]
 */
export const getValueByKeyInOpject: GetValueByKeyInOpject = (key, object) => {
    if (!key) return object
    if (key.includes('.')) {
        const keys: Array<string> = key.split('.')
        let index = 0
        let temValue: any
        while (index < keys.length) {
            const key = keys[index]
            if (!temValue) {
                temValue = object[key]
            } else {
                temValue = temValue[key]
            }
            index++
        }
        return temValue
    } else {
        return object[key]
    }
}