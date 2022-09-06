export type Stringify = (params: Array<string>) => string

/**
 * @desc 模仿qs.stringify
 * @param params Array<string>
 * @returns qs.stringify
 */

export const stringify: Stringify = (params: Array<string>): string => {
    const search = []
    for (const key in params) {
        const item = [key, params[key]]
        search.push(item.join('='))
    }
    return search.join('&')
}