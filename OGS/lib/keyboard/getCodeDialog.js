/*
 
 Get code 'tabella' as digits inserted through the keypad
 
 manage the small dialog with truck driver, 
 getting the code (5 digits)  
 
 - USB keyboard is considered as an input stream (stdin)
 - Each keypressed is treated as an event
 - Prompts are writted to terminal (stdout)  
 - Remprompt on keypressed timeout 
 - Remprompt on silence imeout 
 
 EVENTS TRIGGERED

 1. EVENT_CODE_INSERTED
    The module triggers the custom event dialog 'data' 
    if input code code is correct, goodbye function is called
    if code is wrong after N retries (3), or after a silence  

 2. EVENT_TIMEOUT
    The module trigger the custom event dialog 'timeout' 
    if after N times (3) keystroke timeout is triggered. 
 

 DIALOGS USE CASE EXAMPLES
 
 1. correct code at first tempt
 ------------------------------
  
 Digita il codice di 5 cifre
 12345

 Codice Corretto!
 Arrivederci

 2. exit for timeout (no code inserted)
 --------------------------------------

 Digita il codice di 5 cifre

 Digita il codice di 5 cifre

 Digita il codice di 5 cifre

 Digita il codice di 5 cifre


 Non hai inserito il codice di 5 cifre.
 Contatta l'operatore

 3. correct code at first tempt, but with two keystroke timeouts  
 ---------------------------------------------------------------

 Digita il codice di 5 cifre
 12
 Digita le ultime 3 cifre
 34
 Digita l'ultima cifra
 5

 Codice corretto!
 Arrivederci

 4. many keystroke timeouts, three tempts failed  
 -----------------------------------------------

 Digita il codice di 5 cifre
 123
 Digita le ultime 2 cifre
 66

 Il codice 12366 non è corretto. Riprova.

 Digita il codice di 5 cifre
 7777
 Digita l'ultima cifra
 1

 Il codice 77771 non è corretto. Riprova.

 Digita il codice di 5 cifre
 445
 Digita le ultime 2 cifre
 2
 Digita l'ultima cifra
 3

 Il codice 44523 non è corretto.

 Non hai inserito il codice corretto per 3 volte.
 Contatta l'operatore

 */   

const { writeTerminal, clearTerminal } = require('./terminal')

// https://flaviocopes.com/javascript-custom-events/
const EventEmitter = require('events')
const dialog = new EventEmitter()

// https://stackoverflow.com/questions/5006821/nodejs-how-to-read-keystrokes-from-stdin
const stdin = process.stdin

// local constants
const NUM_DIGITS = 5
const KEY_TIMEOUT_MSECS = 5000
const KEY_TIMEOUT_MAX_RETRIES = 3
const WRONG_CODE_MAX_RETRIES = 3

const EVENT_CODE_INSERTED = 'data'
const EVENT_TIMEOUT = 'timeout'

// local variables
let string 
let numberOfDigits
let keyTimeout
let timeoutRetries 
let wrongCodeRetries 


/**
 * run a new dialog to get code "tabella"
 *
 * @public
 *
 */ 
function runDialog() {
  clearTerminal()
  wrongCodeRetries = 0
  readDigits( `Digita il codice di ${NUM_DIGITS} cifre\n`, NUM_DIGITS )
}  


/*
 * set keyboard event emissions
 *
 * - a system event is emitted every keystroke pressed
 * - a custom event is emitted when is inserted a digit of NUM_DIGITS items.
 *
 */ 
function setKeyboardEvents() {

  // without this, we would only get streams once enter is pressed
  stdin.setRawMode( true )

  // resume stdin in the parent process (node app won't quit all by itself
  // unless an error or process.exit() happens)
  stdin.resume()

  // i don't want binary, do you?
  stdin.setEncoding( 'utf8' )

  // on any data into stdin
  stdin.on( 'data', function( key ) {

    clearTimeout( keyTimeout )

    // TODO temporary for debug
    // ctrl-c ( end of text )
    if ( key === '\u0003' ) {
      process.exit()
    }

    // write the key to stdout all normal like
    writeTerminal( key )
    
    // compose digits adding the key pressed
    string += key 

    if ( string.length === numberOfDigits ) {
      //
      // user has typed NUM_DIGITS times
      // generate a custom event 'data' 
      //
      dialog.emit(EVENT_CODE_INSERTED, string)
    }
    else {
      // a timout is set for every key pressed 
      setKeyboardTimeout()
    }  

  })

}  

//
// WARNING: TO BE CALLED ONCE
//
setKeyboardEvents()



/*
 * contact operator
 */ 
function contactOperator() {

  writeTerminal( '\nContatta l\'operatore\n\n' )

  // TODO temporary for debug
  process.exit()

}  



/**
 * set the keyboard timeout
 * to be activated if key is not pressed after timeoutMsecs
 *
 * @param {Number} timeoutMsecs 
 *
 */
function setKeyboardTimeout(timeoutMsecs=KEY_TIMEOUT_MSECS) {

  const remainingDigits = NUM_DIGITS - string.length

  let suggestion
  
  if (remainingDigits === NUM_DIGITS) 
    suggestion = `\nDigita il codice di ${NUM_DIGITS} cifre\n` 
  else if (remainingDigits > 1) 
    suggestion = `\nDigita le ultime ${remainingDigits} cifre\n` 
  else
    suggestion = '\nDigita l\'ultima cifra\n'

  // retrigger timeout
  keyTimeout = setTimeout ( 
    () => onKeyboardTimeout(suggestion), 
    timeoutMsecs )

}


/** 
 * keyboard timeout callback function. 
 *
 * write on terminal 
 * retrigger itself
 *
 * @param {String} suggestion - text to be displayed on terminal
 *
 */ 
function onKeyboardTimeout(suggestion) {

  if ( timeoutRetries === KEY_TIMEOUT_MAX_RETRIES ) {
    
    clearTimeout( keyTimeout )

    // generate a custom event 'error' 
    dialog.emit( EVENT_TIMEOUT, 'timeout max retries' )
  }  

  else {

    writeTerminal(suggestion), 
  
    timeoutRetries ++

    // retrigger timeout handler  
    setKeyboardTimeout()
  }  
}    


/**
 * prompt on terminal and read a keys sequence from keyboard
 *
 * @param {String} promptString
 * @param {Number} n
 *
 */ 
function readDigits( promptString, n=NUM_DIGITS ) {

  string = ''
  numberOfDigits = n

  if ( promptString )
    writeTerminal( promptString )

  timeoutRetries = 0


  setKeyboardTimeout() 

}  


/*
 * goodbye - end the conversation
 */ 
function goodbye() {

  writeTerminal( '\n\nCodice corretto!' )
  writeTerminal( '\nArrivederci\n\n' )

  // 
  // TODO
  // produce DDT document 
  //
  
  // TODO temporary for debug
  process.exit()

}  


// stub function that simulate a query to database
function allowedCode(string) {

  // list of valid codes
  const codes = [
    '12345',
    '12346',
    '12347',
    '98765',
    '98766',
    '98767',
    '00000',
    '11111'
  ]

  return codes.includes(string) 
}


/*
 * main module function, acting as unit test
 */ 
function main() {

  runDialog()

  //
  // CORRECT CODE EVENT DETECTION
  //
  dialog.on( EVENT_CODE_INSERTED, digits => {

    if ( allowedCode(digits) )

      // produce DDT document 
      goodbye()

    else {

      wrongCodeRetries ++

      writeTerminal( `\n\nIl codice ${string} non è corretto.` )

      if ( wrongCodeRetries === WRONG_CODE_MAX_RETRIES ) {

        writeTerminal( `\n\nNon hai inserito il codice corretto per ${wrongCodeRetries} volte.` )

        contactOperator()
      }  

      else {  
        writeTerminal( ' Riprova.\n' )
        readDigits( `\nDigita il codice di ${NUM_DIGITS} cifre\n`, NUM_DIGITS )
      }  

    }  

  })

  //
  // FAILURE (TIMEOUT) EVENT DETECTION
  //
  dialog.on( EVENT_TIMEOUT, () => {

    writeTerminal( `\n\nNon hai inserito il codice di ${NUM_DIGITS} cifre.` )

    contactOperator()

  })
}


// this module was run directly from the command line as in node getCodeDialog.js
if (require.main === module) 
  main()


// exports public function 
module.exports = { 
  runDialog, 
  dialog 
}

