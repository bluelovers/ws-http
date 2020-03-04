
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./response-stream.cjs.production.min.js')
} else {
  module.exports = require('./response-stream.cjs.development.js')
}
