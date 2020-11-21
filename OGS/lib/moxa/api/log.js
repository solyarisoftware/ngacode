const { logTime } = require('./timeHelpers') 

const log = (text) => {
    console.log(`${logTime()} ${text}`)
}

module.exports = { log }
