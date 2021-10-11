/*
 * @Date: 2021-09-18 17:44:28
 * @LastEditors: Timothy
 * @LastEditTime: 2021-10-11 13:42:59
 * @Description: 
 */
const {
    app
} = require('@electron/remote')
const path = require('path')
const appPath = app.getAppPath();
export const __static = `${path.join(appPath, './static').replace(/\\/g, '\\\\')}`;

export const getLanIpAddress = () => {
    let ip;
    var os = require('os'),
        networkInterfaces = os.networkInterfaces();
    for (let d in networkInterfaces) {
        for (let i = 0; i < networkInterfaces[d].length; i++) {
            const el = networkInterfaces[d][i];
            if (el.family === 'IPv4' && el.address.startsWith("192.168.")) {
                ip = el.address;
                break;
            }
        }
    }
    return ip;
}