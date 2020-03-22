import { ToastAndroid } from 'react-native'

/**
 * 居中的Toast
 * @param {string} text 显示的文本
 */
export const showToast = text => ToastAndroid.showWithGravity(text, ToastAndroid.SHORT, ToastAndroid.CENTER);

/**
 * 去掉h全部tml标签
 * @param {String} text html文本
 */
export const cleanHtmlTag = (str) => {
  if (typeof str != 'string') return '';
  if (str.length <= 0) return '';
  return str.replace(/<[^>]+>/g, ''); //去掉所有的html标记
}

/**
 * 优雅的处理异步
 * @param {Promise} promise 一个promise对象
 */
export const to = promise => promise.then(res => [null, res]).catch(err => [err])


//防抖js
export function debounce(fn, n, immediate) {
  var timeout
  return function () {
    if (timeout) {
      clearTimeout(timeout)
    }
    if (immediate) {
      var callNow = !timeout
      timeout = setTimeout(() => {
        timeout = null
      }, n)
      if (callNow) fn.apply(this, arguments)
    } else {
      timeout = setTimeout(() => {
        fn.apply(this, arguments)
      }, n)
    }
  }
}