/**
 * @desc 工具类
 * @class utils
 * @author xuchongyu
 * @license MIT
 */
import type { Stringify, GetValueByKey, OutputMessage } from "./types";
import { WebMessage } from "web-message";

export class utils {
  // 创建message实例
  static messageInstance = WebMessage.getInstance();

  /**
   * @desc 模仿qs.stringify
   * @param params Array<string>
   * @returns qs.stringify
   */
  static stringify: Stringify = (params) => {
    const search = [];
    for (const key in params) {
      const item = [key, params[key]];
      search.push(item.join("="));
    }
    return search.join("&");
  };

  /**
   * @desc 通过key查找object里面的值
   * @param key object的属性
   * @param object 数据
   * @returns object[key]
   */
  static getValueByKey: GetValueByKey = (key, object) => {
    if (!key) return object[key];
    if (key.toString().includes(".")) {
      const keys: Array<string> = key.toString().split(".");
      let index = 0;
      let temValue: any = object;
      while (index < keys.length) {
        const key = keys[index];
        temValue = temValue[key];
        index++;
      }
      return temValue;
    } else {
      return object[key];
    }
  };
  // 输出消息
  static outputMessage: OutputMessage = ({
    messageType,
    message,
    messagePosition,
    messageDuration,
    messageHoverStop,
  }) => {
    this.messageInstance.createMessage({
      message,
      messageType,
      messagePosition,
      messageDuration,
      showClose: false,
      messageHoverStop,
    });
  };
}
