const express = require('express')
const formidableMiddleware = require('express-formidable')

const app = express()
app.use(formidableMiddleware())

console.log(global.config)

app.post('/upload', (req, res) => {
  res.json({ path: 'xxx', status: 0 })
})
app.use((req, res) => {
  res.json({ status: 404 }, 404)
})
module.exports = app
// app.listen(
//   17680,
//   '0.0.0.0',
//   () => {
//     console.log(`Simple mock listening on http://${host}:${port}!`)
//   }
// )
