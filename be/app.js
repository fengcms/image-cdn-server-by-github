const express = require('express')
const formidableMiddleware = require('express-formidable')
const fs = require('fs')
const path = require('path')

const app = express()
app.use(formidableMiddleware())

app.post('/upload', (req, res) => {
  res.json({ path: 'xxx', status: 0 })
})

app.listen(
  17680,
  '0.0.0.0',
  () => {
    console.log(`Simple mock listening on http://${host}:${port}!`)
  }
)
