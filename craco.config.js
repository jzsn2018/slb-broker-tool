/*
 * @Date: 2021-09-14 15:59:38
 * @LastEditors: Timothy
 * @LastEditTime: 2021-09-17 19:16:55
 * @Description: 
 */

module.exports = {
  devServer:{
    open:false
  },
  webpack: {
      configure: {
          target: 'electron-renderer'
      }
  }
};