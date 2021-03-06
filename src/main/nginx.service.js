const fs =  require('fs');
const path =  require('path');
const { __static } = require("../utils/index");
const {addLog} =  require('./nginx/index');
const jsonPath = path.resolve(path.join(__static, './nginx/config/proxy.json'))
const util = require('util')
const isWindows = process.platform === 'win32'
const exec = util.promisify(require('child_process').exec)

class NginxService {
  constructor () {
    this.init();
    this.isStarted = false; 
  }
  async init () {
    await this.loadConfig()
  }
  async loadConfig () {
    this.config = path.resolve(path.join(__static, './nginx/config/nginx.conf'))
    if (isWindows) {
      const truePath = path.resolve(path.join(__static, `./nginx/windows/`))
      this.nginx = '"' + truePath + '/nginx.exe" ' + '-p "' + truePath + '"'
      this.nginx = this.nginx.replace(/\\/g, '/')
    } else {
      this.nginx = path.resolve(path.join(__static, `./nginx/mac/bin/nginx`))
    }
  }
  async test () {
    try {
      let config = this.config
      if (isWindows) {
        config = `"${config}"`
      }
      const {stderr} = await exec(`${this.nginx} -t -c ${config}`)
      console.log(stderr)
      if (stderr.match('successful')) {
        await addLog('nginx test successful')
        return true
      } else {
        return false
      }
    } catch (e) {
      console.log(e)
      await addLog('nginx test error ->' + e)
      return false
    }
  }
  async stop () {
    try {
      if (isWindows) {
        await exec(`taskkill /fi "imagename eq nginx.exe" /f`, { encoding: 'utf8' })
        // await exec(`TASKKILL /F /IM "nginx*"`)
      } else {
        await exec(`ps -lef|grep -i nginx:|awk '{ print $2}'|xargs kill -9`)
      }
    } catch (e) {
      await addLog('nginx stop error ->' + e)
      console.log(e)
    }
    await addLog('nginx stop successful')
    return true
  }
  async start () {
    if(this.isStarted)return true;
    try {
      let config = this.config
      if (isWindows) {
        config = `"${config}"`
      }
      const {stderr} = await exec(`${this.nginx} -c ${config}`)
      await addLog('nginx start successful');
      this.isStarted = true;
      return true
    } catch (e) {
      await addLog('nginx start error ->' + e)
      console.log(e)
      this.isStarted = false;
      return false
    }
  }
  async reload () {
    try {
      if (await this.test()) {
        if (isWindows) {
          const {stdout, stderr} = await exec(`${this.nginx} -s reload -c "${this.config}"`)
          console.log(stdout)
          console.log(stderr)
        } else {
          const {stdout, stderr} = await exec(`${this.nginx} -s reload`)
          console.log(stdout)
          console.log(stderr)
        }
        await addLog('nginx reload successful')
        return true
      } else {
        return false
      }
    } catch (e) {
      await addLog('nginx reload error ->' + e)
      console.log(e)
      return false
    }
  }
  async status () {
    try {
      const jsonObj = JSON.parse(fs.readFileSync(jsonPath, 'utf8'))
      if (isWindows) {
        await exec(`netstat -ano|findstr ${jsonObj.port}`)
      } else {
        await exec(`lsof -i:${jsonObj.port}`)
      }
      await addLog('nginx get status successful')
      return true
    } catch (e) {
      await addLog('nginx get status error ->' + e)
      console.log(e)
      return false
    }
  }
}
export default new NginxService()
