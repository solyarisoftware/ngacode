// https://stackoverflow.com/questions/5006821/nodejs-how-to-read-keystrokes-from-stdin
//
// https://thisdavej.com/making-interactive-node-js-console-apps-that-listen-for-keypress-events/
// https://blog.fullstacktraining.com/capturing-user-input-in-a-node-js-application/
// https://medium.com/javascript-in-plain-english/how-to-detect-a-sequence-of-keystrokes-in-javascript-83ec6ffd8e93
// https://nodejs.org/en/knowledge/command-line/how-to-prompt-for-command-line-input/

const stdin = process.stdin

// without this, we would only get streams once enter is pressed
stdin.setRawMode( true )

// resume stdin in the parent process (node app won't quit all by itself
// unless an error or process.exit() happens)
stdin.resume()

// i don't want binary, do you?
stdin.setEncoding( 'utf8' )

// on any data into stdin
stdin.on( 'data', function( key ) {

  // ctrl-c ( end of text )
  if ( key === '\u0003' ) {
    process.exit()
  }

  // write the key to stdout all normal like
  process.stdout.write( key )
})

