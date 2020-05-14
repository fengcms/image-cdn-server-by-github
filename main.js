// Modules to control application life and create native browser window
const path = require('path')
const fs = require('fs')
const yaml = require('js-yaml')
const config = yaml.safeLoad(fs.readFileSync(path.join(__dirname, 'config.yaml'), 'utf8'))
global.config = config
const { server: { host, port } } = config

const be = require('./be/app')
be.listen(
  port,
  host,
  () => {
    console.log(`Simple mock listening on http://${host}:${port}!`)
  }
)
// 以下为启动GUI
// const gui = require('./gui')
// console.log(gui)
// try {
//   require('electron-reloader')(module, {})
// } catch (_) {}
