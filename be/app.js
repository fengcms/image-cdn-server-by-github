const Koa = require('koa')
const koaJson = require('koa-json')
const koaBody = require('koa-body')
const staticFiles = require('koa-static')
const toType = require('to-type')
const fs = require('fs')
const Path = require('path')
const Images = require('images')
const cors = require('koa2-cors')
const { calcFileExt, calcSavePath, gitPush } = require('./util')

const app = new Koa()
// 具体参数我们在后面进行解释
app.use(cors({
  origin (ctx) {
    return '*' // 允许来自所有域名请求
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['POST'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept']
}))

app.use(staticFiles(Path.resolve(__dirname, './static')))

app.use(koaBody({
  multipart: true,
  parsedMethods: ['POST'],
  formidable: {
    hash: 'md5',
    maxFieldsSize: 2 * 1024 * 1024 * 100,
    maxFileSize: 2 * 1024 * 1024 * 100,
    keepExtensions: false
  },
  onError (_, ctx) {
    ctx.throw(413, '文件超过限制大小！')
  }
}))
app.use(koaJson({ pretty: false, param: 'pretty' }))

app.use(async (ctx, next) => {
  const { files, type } = ctx.request
  if (type !== 'multipart/form-data' || !files) {
    ctx.throw(400, '请求类型错误，上传文件接口仅支持 multipart/form-data')
  }
  const { file } = files
  if (!file) {
    ctx.throw(400, '上传文件不能为空！')
  }
  if (toType(file) === 'array') {
    file.forEach(i => {
      fs.unlinkSync(i.path)
    })
    ctx.throw(400, '只支持单张图片上传')
  }
  if (ctx.path !== '/upload') {
    ctx.throw(404)
  }
  await next()
})

app.use(async ctx => {
  const { path, hash } = ctx.request.files.file
  const fileExt = calcFileExt(path)
  if (!fileExt) return ctx.throw(415)
  const { saveDir, savePath, saveSourcePath, returnPath, returnSourcePath } = calcSavePath(hash, fileExt)
  // 检查目录是否存在，不存在则创建
  if (!fs.existsSync(saveDir)) fs.mkdirSync(saveDir)
  // 非 jpg 图片直接保存
  if (fileExt === '.jpg') {
    const sourceImage = Images(path)
    const w = sourceImage.width()
    const h = sourceImage.height()
    // 只有宽高均大于300，才加水印，否则直接保存
    if (w > 300 && h > 300) {
      const mark = Images(Path.resolve(__dirname, './mark.png'))
      Images(sourceImage).draw(mark, w - 180, h - 60).save(savePath)
      // 保存原图
      fs.renameSync(path, saveSourcePath)
      await gitPush().catch(() => ctx.throw(500, '推送 gitee 失败'))
      ctx.body = { path: returnPath, sourcePath: returnSourcePath }
    } else {
      fs.renameSync(path, savePath)
      await gitPush().catch(() => ctx.throw(500, '推送 gitee 失败'))
      ctx.body = { path: returnPath }
    }
  } else {
    fs.renameSync(path, savePath)
    await gitPush().catch(() => ctx.throw(500, '推送 gitee 失败'))
    ctx.body = { path: returnPath }
  }
})

module.exports = app
