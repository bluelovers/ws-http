
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./http-response-stream.cjs.production.min.js')
} else {
  module.exports = require('./http-response-stream.cjs.development.js')
}
