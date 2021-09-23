const {app}  = require('@electron/remote')
const path  = require('path')
const appPath = app.getAppPath();
export const __static = `${path.join(appPath, './static').replace(/\\/g, '\\\\')}`;