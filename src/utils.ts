/**
 * @desc 工具类
 * @class utils
 * @author xuchongyu
 * @license MIT
 */
import { WebMessage } from "web-message";
import type {
  MessagePosition,
  MessageDuration,
  MessageType,
} from "web-message";
type Stringify = (params: Array<string>) => string;
type Object = { [key: string]: any };
type GetValueByKeyInObject = <T = any>(key: keyof Object, object: Object) => T;
type OutputMessageParams = {
  messageType: MessageType;
  message: string;
  messagePosition: MessagePosition;
  messageDuration?: MessageDuration;
  messageHoverStop?: boolean;
};
type OutputMessage = (outputMessageParams: OutputMessageParams) => void;

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
   * @example
   * utils.getValueByKeyInObject('a', { a: { b: { c: 1 } } })
   * utils.getValueByKeyInObject('a.b', { a: { b: { c: 1 } } })
   * utils.getValueByKeyInObject('a.b.c', { a: { b: { c: 1 } } })
   */
  static getValueByKeyInObject: GetValueByKeyInObject = (key, object) => {
    if (key.toString().trim() === "") return object;
    if (key.toString().includes(".")) {
      const keys: Array<string> = key.toString().split(".");
      let index = 0;
      let temValue: any;
      while (index < keys.length) {
        const key = keys[index];
        if (!temValue) {
          temValue = object[key];
        } else {
          temValue = temValue[key];
        }
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
