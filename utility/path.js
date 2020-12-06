const path = require('path')

const oldWay = path.dirname(process.mainModule.filename)
const newWay = path.dirname(require.main.filename)

module.exports = newWay