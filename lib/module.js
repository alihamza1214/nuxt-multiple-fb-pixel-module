const path = require('path')

module.exports = function facebookPixelModule (moduleOptions) {
  const defaults = {
    pixelId: [],
    track: 'PageView',
    version: '2.0',
    disabled: false
  }

  const options = Object.assign({}, defaults, this.options.facebook, moduleOptions)

  if (options.pixelId.length===0) throw new Error('The `pixelId` option is required.')

  this.addPlugin({
    src: path.resolve(__dirname, './templates/plugin.js'),
    ssr: false,
    options
  })
}

module.exports.meta = require('../package.json')
