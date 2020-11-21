/*
 *
 * http://momentjs.com/
 * http://momentjs.com/docs/
 * https://momentjs.com/docs/#/displaying/
 */
const moment = require('moment')

//
// set locale: ITALY
//
moment.locale('it')

/*
 * Current time in format YY.MM.DD hh:mm:ss
 * @public
 *
 * @return {string} CurrentTime
 *
 */
function logTime() {
  //return moment().format('YY.MM.DD LTS')
  
  //return moment().toISOString()
  
  // https://stackoverflow.com/questions/25725019/how-do-i-format-a-date-as-iso-8601-in-moment-js
  //return moment().format('YY-MM-DD HH:mm:ss.SSS')
  return moment().format('YYYY-MM-DD[T]HH:mm:ss.SSS[Z]')

}

function unixTime() {
  return moment().unix()
}  

function unixMillisecondsTime() {
  return moment().valueOf()
}  



function main() {
  console.log( logTime() )
  console.log( unixTime() )
  console.log( unixMillisecondsTime() )
}  

if (require.main === module)
  main()


module.exports = {
  unixTime,
  unixMillisecondsTime,
  logTime
}

