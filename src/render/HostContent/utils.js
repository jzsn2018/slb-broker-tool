/*
 * @Date: 2021-09-23 17:26:26
 * @LastEditors: Timothy
 * @LastEditTime: 2021-09-23 21:09:41
 * @Description: 
 */

export const getHostPath = () => {
  if (process.platform === 'win32') {
    return 'C:\\Windows\\System32\\drivers\\etc\\hosts';
  }
}

export const IP_REG = /(\d+\.\d+\.\d+\.\d+)/
export const splitChar = () => {
  if (process.platform === 'win32') {
    return '\r\n';
  }
}

