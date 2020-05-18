const fs = require('fs')
const path = require('path')
const { imageSaveDir } = global.config
const shell = require('child_process').execFile

const calcFileExt = path => {
  let fileBuffer = fs.readFileSync(path)
  // 将上文提到的 文件标识头 按 字节 整理到数组中
  const imageBufferHeaders = [
    { bufBegin: [0xff, 0xd8], bufEnd: [0xff, 0xd9], suffix: '.jpg' },
    { bufBegin: [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a], suffix: '.png' },
    { bufBegin: [0x47, 0x49, 0x46, 0x38, 0x39, 0x61], suffix: '.gif' },
    { bufBegin: [0x47, 0x49, 0x46, 0x38, 0x37, 0x61], suffix: '.gif' },
    { bufBegin: [0x42, 0x4d], suffix: '.bmp' }
  ]
  for (const imageBufferHeader of imageBufferHeaders) {
    let isEqual
    // 判断标识头前缀
    if (imageBufferHeader.bufBegin) {
      const buf = Buffer.from(imageBufferHeader.bufBegin)
      isEqual = buf.equals(
        // 使用 buffer.slice 方法 对 buffer 以字节为单位切割
        fileBuffer.slice(0, imageBufferHeader.bufBegin.length)
      )
    }
    // 判断标识头后缀
    if (isEqual && imageBufferHeader.bufEnd) {
      const buf = Buffer.from(imageBufferHeader.bufEnd)
      isEqual = buf.equals(fileBuffer.slice(-imageBufferHeader.bufEnd.length))
    }
    if (isEqual) {
      fileBuffer = undefined
      return imageBufferHeader.suffix
    }
  }
  // 未能识别到该文件类型
  fileBuffer = undefined
  return ''
}
const calcSavePath = (hash, fileExt) => {
  const saveDir = path.resolve(imageSaveDir, './image/', hash.substring(0, 2))
  const savePathPre = path.resolve(saveDir, hash.substring(2))
  const savePath = savePathPre + fileExt
  const saveSourcePath = savePathPre + '_source' + fileExt
  const returnPath = savePath.replace(imageSaveDir, '/')
  const returnSourcePath = saveSourcePath.replace(imageSaveDir, '/')
  return { saveDir, savePath, saveSourcePath, returnPath, returnSourcePath }
}
const gitPush = (type = 'gitee') => {
  const types = {
    github: 'githubpush.sh',
    gitee: 'giteepush.sh',
    all: 'gitpush.sh'
  }
  return new Promise((resolve, reject) => {
    const shFile = path.resolve(__dirname, types[type])
    shell(shFile, [], null, (err, out) => {
      if (err) reject(err)
      resolve(out)
    })
  })
}
module.exports = { calcFileExt, calcSavePath, gitPush }
