const proxy = require('http-proxy-middleware')
const Bundler = require('parcel-bundler')
const express = require('express')

const bundler = new Bundler('index.html', {
  cache: false
})

const app = express()

app.use(
  '/graphql',
  proxy({
    target: 'https://davis-wp-dev-sheideman.c9users.io'
  })
)
app.use(bundler.middleware())

app.listen(Number(process.env.PORT || 1234))