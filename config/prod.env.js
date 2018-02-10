var fs = require('fs')
var dotEnvFile = `${__dirname}/../.env`
var config = {NODE_ENV: '"production"', API_BASE_URL: '"http://localhost:3000/api"'}
if (fs.existsSync(dotEnvFile)) {
  try {
    var contents = fs.readFileSync(dotEnvFile, 'utf8')
    var properties = contents.split('\n')
    for (var i = 0; i < properties.length; i++) {
      var property = properties[i].trim()
      if (property) { // Ignore whitespace
        var keyValue = property.split('=')
        if (keyValue.length === 2) {
          var key = keyValue[0]
          var value = keyValue[1]
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
module.exports = config
