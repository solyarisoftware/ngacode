
/*
 * write to terminal
 */ 
function writeTerminal( promptString ) {
  process.stdout.write( promptString )
}


/*
 * clear terminal
 */ 
function clearTerminal() {
  process.stdout.write( '\x1B[2J\x1B[0f' ) // '\x1B[2J\x1B[0f'
}


module.exports = { writeTerminal, clearTerminal }
