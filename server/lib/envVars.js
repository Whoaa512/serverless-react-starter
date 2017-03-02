const path = require('path')
const env = require('./env')
const myEnv = require('dotenv').config({ path: path.join(__dirname, '../.dev.env') })

module.exports.getEnvVars = function getEnvVars() {
    return Object.assign({
        NODE_ENV: env.NODE_ENV === 'production' ? 'production' : 'development',
    }, myEnv)
}
