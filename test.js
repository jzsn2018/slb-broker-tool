/*
 * @Date: 2021-09-10 20:39:15
 * @LastEditors: Timothy
 * @LastEditTime: 2021-09-10 20:45:31
 * @Description: 
 */
const path = require('path');

const truePath = __dirname + '/nginx'

const config = __dirname + '/nginx/conf/nginx.conf';

const exec = require('child_process').exec;
const nginx = `"${truePath}/nginx.exe" -p "${truePath}"`.replace(/\\/g, path.sep);
let cmd = `${nginx} -t -c "${config}"`;


exec(cmd, (err, stdout, stderr) => {
  console.log("🚀 ~ file: test.js ~ line 11 ~ exec ~ err, stdout, stderr", err, stdout, stderr)

});