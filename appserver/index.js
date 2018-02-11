const fs = require('fs')
const express = require('express')
const app = express()
const path = require('path')
const port = process.env.port || 8080
const distDir = path.join(__dirname, '../dist')
const prodEnvConfig = require('./../config/prod.env')

app.get('*', function (req, res) {
  let path = req.path
  if (path.endsWith('.js')) {
    const jsFile = `${distDir}/${path}`
    if (fs.existsSync(jsFile)) {
      fs.readFile(jsFile, 'utf8', (err, contents) => {
        if (err) {
          console.log(`Error reading ${jsFile}. Error: ${err.message}`)
          res.status(404)
        } else {
          const {NODE_ENV, ...overridableProperties} = prodEnvConfig
          for (const [key, value] of Object.entries(overridableProperties)) {
            if (process.env[key]) {
              const overrideValue = process.env[key]
              const valueToBeReplaced = value.startsWith('"') && value.endsWith('"') ? value.substring(1, value.length - 1) : value
              contents = contents.replace(new RegExp(valueToBeReplaced, 'g'), overrideValue)
            }
          }
          res.send(contents)
        }
      })
    } else {
      console.log(`File ${jsFile} does not exists.`)
      res.status(404)
    }
  } else {
    if (path.indexOf('__webpack_hmr') !== -1) {
      // For some reason hmr is included when dockerized
      res.status(404)
    } else {
      if (path === '/') {
        path = 'index.html'
      }
      res.sendFile(path, {root: distDir})
    }
  }
})

app.listen(port, (err) => {
  if (err) {
    return console.log('Failed to start server.', err)
  }
  console.log(`Server is listening on ${port}`)
})

process.on('SIGINT', function () {
  process.exit()
})
