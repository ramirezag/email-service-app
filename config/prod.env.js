const fs = require('fs')
const dotEnvFile = `${__dirname}/../.env`
const config = {NODE_ENV: '"production"', API_BASE_URL: '"http://localhost:3000/api"'}
if (fs.existsSync(dotEnvFile)) {
  try {
    const contents = fs.readFileSync(dotEnvFile, 'utf8')
    const properties = contents.split('\n')
    for (let i = 0; i < properties.length; i++) {
      const property = properties[i].trim()
      if (property) { // Ignore whitespace
        const keyValue = property.split('=')
        if (keyValue.length === 2) {
          const key = keyValue[0]
          let value = keyValue[1]
          if (!value.startsWith('"') && !value.endsWith('"')) {
            value = JSON.stringify(value)
          }
          config[key] = value
          console.log('Setting property ' + key + ' to ' + value)
        } else {
          console.log('Ignoring property ' + property)
        }
      }
    }
  } catch (e) {
    //
  }
} else {
  console.log('File .env does not exists.')
}
module.exports = {NODE_ENV: '"production"', API_BASE_URL: '"http://localhost:3000/api"'}
