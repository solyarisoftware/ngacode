/* 
 * MOXA ioLogik E1200 Series - HTTP APIs 
 *
 * Documentation:
 * HTTP REST API https://www.moxa.com/getmedia/e128fd84-0f99-4f86-907a-6bd9dc17bfdb/moxa-using-a-restful-api-to-connect-to-remote-i-os-tech-note-v1.0.pdf
 * https://www.moxa.com/en/spotlight/controller-and-io/multiprotocol-smart-io/index.htm
 * https://dev.to/yuyatakeyama/how-i-measure-response-times-of-web-apis-using-curl-6nh
 * https://ops.tips/gists/measuring-http-response-times-curl/
 * 
 * Not implemented API:
 *   /api/slot/0/io/ai
 *   /api/slot/0/io/ai/0/aiValueRaw
 * 
 *   /api/slot/0/io/ao
 * 
 *   /api/slot/0/io/rtd
 *   /api/slot/0/io/rtd/0/rtdValueEngineeringMultiplied
 * 
 *   /api/slot/0/io/tc
 *
 */ 

// https://github.com/axios/axios
const axios = require('axios').default
const { sleep } = require('./sleep')
const { log } = require('./log') 
const Elapsed = require('./elapsed')

const EventEmitter = require('events')
const moxaEvents = new EventEmitter()

const DEBUG_DATA = false

// ioLogik E1200 device IP address
let ipAddress
let config
let SYSINFO_URL
let DIGITAL_INPUTS_URL
let RELAYS_URL
let DIGITAL_OUTPUTS_URL

// MOXA iologik E1214 IP Address
const DEFAULT_IP_ADDRESS = '192.168.127.254'

const POLLING_MSECS = 500
let pollingTimeoutCallback

//
// Digital Inputs Event Names
//
const DI0_UP = 'DI0_UP'
const DI0_DOWN = 'DI0_DOWN'

const DI1_UP = 'DI1_UP'
const DI1_DOWN = 'DI1_DOWN'

const DI2_UP = 'DI2_UP'
const DI2_DOWN = 'DI2_DOWN'

const DI3_UP = 'DI3_UP'
const DI3_DOWN = 'DI3_DOWN'

const DI4_UP = 'DI4_UP'
const DI4_DOWN = 'DI4_DOWN'

const DI5_UP = 'DI5_UP'
const DI5_DOWN = 'DI5_DOWN'


let INPUTSOBJ = {

  slot: 0,
  io: {
    di: [
      { diIndex: 0, diMode: 0, diStatus: 0 },
      { diIndex: 1, diMode: 0, diStatus: 0 },
      { diIndex: 2, diMode: 0, diStatus: 0 },
      { diIndex: 3, diMode: 0, diStatus: 0 },
      { diIndex: 4, diMode: 0, diStatus: 0 },
      { diIndex: 5, diMode: 0, diStatus: 0 }
    ]
  }

}

let OUTPUTSOBJ = {

  slot: 0,
  io: {
    relay: [
      {
        relayIndex: 0,
        relayMode: 0,
        relayStatus: 0,
        relayTotalCount: 0,
        relayCurrentCount: 0,
        relayCurrentCountReset: 0
      },
      {
        relayIndex: 1,
        relayMode: 0,
        relayStatus: 0,
        relayTotalCount: 0,
        relayCurrentCount: 0,
        relayCurrentCountReset: 0
      },
      {
        relayIndex: 2,
        relayMode: 0,
        relayStatus: 0,
        relayTotalCount: 0,
        relayCurrentCount: 0,
        relayCurrentCountReset: 0
      },
      {
        relayIndex: 3,
        relayMode: 0,
        relayStatus: 0,
        relayTotalCount: 0,
        relayCurrentCount: 0,
        relayCurrentCountReset: 0
      },
      {
        relayIndex: 4,
        relayMode: 0,
        relayStatus: 0,
        relayTotalCount: 0,
        relayCurrentCount: 0,
        relayCurrentCountReset: 0
      },
      {
        relayIndex: 5,
        relayMode: 0,
        relayStatus: 0,
        relayTotalCount: 0,
        relayCurrentCount: 0,
        relayCurrentCountReset: 0
      }
    ]
  }

}
  

function printStatus() {
  
  const DI0 = INPUTSOBJ.io.di[0].diStatus
  const DI1 = INPUTSOBJ.io.di[1].diStatus
  const DI2 = INPUTSOBJ.io.di[2].diStatus
  const DI3 = INPUTSOBJ.io.di[3].diStatus
  const DI4 = INPUTSOBJ.io.di[4].diStatus
  const DI5 = INPUTSOBJ.io.di[5].diStatus

  const R0 = OUTPUTSOBJ.io.relay[0].relayStatus
  const R1 = OUTPUTSOBJ.io.relay[1].relayStatus
  const R2 = OUTPUTSOBJ.io.relay[2].relayStatus
  const R3 = OUTPUTSOBJ.io.relay[3].relayStatus
  const R4 = OUTPUTSOBJ.io.relay[4].relayStatus
  const R5 = OUTPUTSOBJ.io.relay[5].relayStatus

  log(`MOXA Digital Inputs: ${DI0} ${DI1} ${DI2} ${DI3} ${DI4} ${DI5} Relays (outputs): ${R0} ${R1} ${R2} ${R3} ${R4} ${R5}`)

}  


function printStatusHorizontal() {
  
  const DI0 = INPUTSOBJ.io.di[0].diStatus
  const DI1 = INPUTSOBJ.io.di[1].diStatus
  const DI2 = INPUTSOBJ.io.di[2].diStatus
  const DI3 = INPUTSOBJ.io.di[3].diStatus
  const DI4 = INPUTSOBJ.io.di[4].diStatus
  const DI5 = INPUTSOBJ.io.di[5].diStatus

  const R0 = OUTPUTSOBJ.io.relay[0].relayStatus
  const R1 = OUTPUTSOBJ.io.relay[1].relayStatus
  const R2 = OUTPUTSOBJ.io.relay[2].relayStatus
  const R3 = OUTPUTSOBJ.io.relay[3].relayStatus
  const R4 = OUTPUTSOBJ.io.relay[4].relayStatus
  const R5 = OUTPUTSOBJ.io.relay[5].relayStatus

  console.log( `

6 DIGITAL INPUTS

 DI0 DI1 DI2 DI3 DI4 DI5
.-----------------------.
| ${DI0} | ${DI1} | ${DI2} | ${DI3} | ${DI4} | ${DI5} |
.-----------------------. 

6 OUTPUT RELAYS

 R0  R1  R2  R3  R4  R5
.-----------------------.
| ${R0} | ${R1} | ${R2} | ${R3} | ${R4} | ${R5} |
.-----------------------.
`)

/*  
          INPUTS                   OUTPUTS  

 DI0 DI1 DI2 DI3 DI4 DI5   R0  R1  R2  R3  R4  R5
.---.---.---.---.---.---. .---.---.---.---.---.---.
| ${DI0} | ${DI1} | ${DI2} | ${DI3} | ${DI4} | ${DI5} | | ${R0} | ${R1} | ${R2} | ${R3} | ${R4} | ${R5} |
.---.---.---.---.---.---. .---.---.---.---.---.---.

*/
}  


function printStatusVertical() {
  
  const DI0 = INPUTSOBJ.io.di[0].diStatus
  const DI1 = INPUTSOBJ.io.di[1].diStatus
  const DI2 = INPUTSOBJ.io.di[2].diStatus
  const DI3 = INPUTSOBJ.io.di[3].diStatus
  const DI4 = INPUTSOBJ.io.di[4].diStatus
  const DI5 = INPUTSOBJ.io.di[5].diStatus

  const R0 = OUTPUTSOBJ.io.relay[0].relayStatus
  const R1 = OUTPUTSOBJ.io.relay[1].relayStatus
  const R2 = OUTPUTSOBJ.io.relay[2].relayStatus
  const R3 = OUTPUTSOBJ.io.relay[3].relayStatus
  const R4 = OUTPUTSOBJ.io.relay[4].relayStatus
  const R5 = OUTPUTSOBJ.io.relay[5].relayStatus

  console.log()
  console.log('6 DIGITAL INPUTS')
  console.log( 'DI0             : ' + DI0)
  console.log( 'DI1             : ' + DI1)
  console.log( 'DI2             : ' + DI2)
  console.log( 'DI3             : ' + DI3)
  console.log( 'DI4             : ' + DI4)
  console.log( 'DI5             : ' + DI5)
  console.log()
  console.log('6 OUTPUT RELAYS')
  console.log( 'R0              : ' + R0)
  console.log( 'R1              : ' + R1)
  console.log( 'R2              : ' + R2)
  console.log( 'R3              : ' + R3)
  console.log( 'R4              : ' + R4)
  console.log( 'R5              : ' + R5)
  console.log()
}  


const validIndex = index => {
  return (
    index === 0 || 
    index === 1 || 
    index === 2 || 
    index === 3 || 
    index === 4 || 
    index === 5 
  )  
}


const validStatus = status => status === 0 || status === 1  


/**
 * set digital input
 *
 * @param {Integer} index (DI0 -> index=0, DI5 -> index=5 
 * @param {Integer} status (0, 1)
 */
function setDigitalInput(index, status=1) {

  if ( !validIndex(index) ) {
   console.error( `ERROR: setDigitalInput. Index ${index} is not in range 0-5.` )
   return null
  } 

  if ( !validStatus(status) ) {
   console.error( `ERROR: setDigitalInput. Status ${status} is not in range 0-1.` )
   return null
  } 

  INPUTSOBJ.io.di[index].diStatus = status

  return INPUTSOBJ
}  


/**
 * set relay output
 *
 * @private
 * @param {Integer} index (R0 -> index=0, R5 -> index=5 
 * @param {Integer} status (0, 1)
 */
function setRelay(index, status=1) {

  if ( !validIndex(index) ) {
   console.error( `ERROR: setDigitalInput. Index ${index} is not in range 0-5.` )
   return null
  } 

  if ( !validStatus(status) ) {
   console.error( `ERROR: setDigitalInput. Status ${status} is not in range 0-1.` )
   return null
  } 

  OUTPUTSOBJ.io.relay[index].relayStatus = status

  return OUTPUTSOBJ
}  


function resetRelay(index) {
  return setRelay(index, 0)
}  


/**
 * initialize HTTP parameters
 *
 * @param {String} address 
 */ 
function initialize(address=DEFAULT_IP_ADDRESS) {

  ipAddress = address
  
  SYSINFO_URL = `http://${ipAddress}/api/slot/0/sysInfo`
  DIGITAL_INPUTS_URL = `http://${ipAddress}/api/slot/0/io/di`
  DIGITAL_OUTPUTS_URL = `http://${ipAddress}/api/slot/0/io/do`
  RELAYS_URL = `http://${ipAddress}/api/slot/0/io/relay`

  config = {

    headers: {
      'Accept': 'vdn.dac.v1',
      'Content-Type': 'application/json'
    },

    // `timeout` specifies the number of milliseconds before the request times out.
    // If the request takes longer than `timeout`, the request will be aborted.
    timeout: 3000, // default is `0` (no timeout)

    // `responseType` indicates the type of data that the server will respond with
    // options are: 'arraybuffer', 'document', 'json', 'text', 'stream'
    //   browser only: 'blob'
    responseType: 'json'

  }

}  

/**
 * SYS INFO REQUEST 
 *
 * curl \
 *  -X GET \
 *  -H "Accept: vdn.dac.v1" \
 *  -H "Content-Type: application/json" \
 *  http://$IPADDRESS/api/slot/0/sysInfo \
 *  -w  "\n\n%{time_starttransfer}\n"
 *
 */
async function sysInfo() {

  try {
    const time = new Elapsed()
    
    const response = await axios.get(SYSINFO_URL, config)
  
    log( `MOXA GET ${SYSINFO_URL} ${time.elapsed()}` )

    const data = response.data

    if (DEBUG_DATA)
      console.dir( data, {depth: null} )

    return data
  }  

  catch(error) { 
    onError(error) 
  } 

}  



function printInfo( data ) {

  if (data) {
    log( `MOXA ${data.sysInfo.device[0].modelName} ${data.sysInfo.device[0].deviceUpTime} ${data.sysInfo.device[0].firmwareVersion} ${data.sysInfo.network.LAN.lanMac} ${data.sysInfo.network.LAN.lanIp}` )
  }    

}  


function printInfoLong( data ) {

  if (data) {
    console.log()
    console.log( 'modelName       : ' + data.sysInfo.device[0].modelName )  
    console.log( 'deviceName      : ' + data.sysInfo.device[0].deviceName )  
    console.log( 'deviceUpTime    : ' + data.sysInfo.device[0].deviceUpTime )  
    console.log( 'firmwareVersion : ' + data.sysInfo.device[0].firmwareVersion )  
    console.log( 'lanMac          : ' + data.sysInfo.network.LAN.lanMac )  
    console.log( 'lanIp           : ' + data.sysInfo.network.LAN.lanIp )  
    console.log()
  }    

}  


/**
 * digitalInputsGITAL INPUTS GET
 *
 * curl \
 *   -X GET \
 *   -H "Accept: vdn.dac.v1" \
 *   -H "Content-Type: application/json" \
 *   http://$IPADDRESS/api/slot/0/io/di \
 *   -w "\n\n%{time_starttransfer}\n"
 *
 */ 
async function digitalInputsGet() {

  try {
    const time = new Elapsed()

    const response = await axios.get(DIGITAL_INPUTS_URL, config)

    log( `MOXA GET ${DIGITAL_INPUTS_URL} ${time.elapsed()}` )

    const data = response.data
      
    if (DEBUG_DATA)
      console.dir( data, {depth: null} )

    //
    // Emit 0->1 (UP) and 1->0 (DOWN) transaction events for each bit 
    //
    if (INPUTSOBJ.io.di[0].diStatus === 0 && data.io.di[0].diStatus === 1)
      moxaEvents.emit(DI0_UP)
    if (INPUTSOBJ.io.di[0].diStatus === 1 && data.io.di[0].diStatus === 0)
      moxaEvents.emit(DI0_DOWN)

    if (INPUTSOBJ.io.di[1].diStatus === 0 && data.io.di[1].diStatus === 1)
      moxaEvents.emit(DI1_UP)
    if (INPUTSOBJ.io.di[1].diStatus === 1 && data.io.di[1].diStatus === 0)
      moxaEvents.emit(DI1_DOWN)

    if (INPUTSOBJ.io.di[2].diStatus === 0 && data.io.di[2].diStatus === 1)
      moxaEvents.emit(DI2_UP)
    if (INPUTSOBJ.io.di[2].diStatus === 1 && data.io.di[2].diStatus === 0)
      moxaEvents.emit(DI2_DOWN)

    if (INPUTSOBJ.io.di[3].diStatus === 0 && data.io.di[3].diStatus === 1)
      moxaEvents.emit(DI3_UP)
    if (INPUTSOBJ.io.di[3].diStatus === 1 && data.io.di[3].diStatus === 0)
      moxaEvents.emit(DI3_DOWN)

    if (INPUTSOBJ.io.di[4].diStatus === 0 && data.io.di[4].diStatus === 1)
      moxaEvents.emit(DI4_UP)
    if (INPUTSOBJ.io.di[4].diStatus === 1 && data.io.di[4].diStatus === 0)
      moxaEvents.emit(DI4_DOWN)

    if (INPUTSOBJ.io.di[5].diStatus === 0 && data.io.di[5].diStatus === 1)
      moxaEvents.emit(DI5_UP)
    if (INPUTSOBJ.io.di[5].diStatus === 1 && data.io.di[5].diStatus === 0)
      moxaEvents.emit(DI5_DOWN)

    // store digital inputs data received
    INPUTSOBJ.io.di[0].diStatus = data.io.di[0].diStatus
    INPUTSOBJ.io.di[1].diStatus = data.io.di[1].diStatus
    INPUTSOBJ.io.di[2].diStatus = data.io.di[2].diStatus
    INPUTSOBJ.io.di[3].diStatus = data.io.di[3].diStatus
    INPUTSOBJ.io.di[4].diStatus = data.io.di[4].diStatus
    INPUTSOBJ.io.di[5].diStatus = data.io.di[5].diStatus
      
    return data
  }  

  catch(error) { 
    onError(error) 
  } 

}  


/**
 * RELAYS GET 
 *
 * curl \
 *   -X GET \
 *   -H "Accept: vdn.dac.v1" \
 *   -H "Content-Type: application/json" \
 *   http://$IPADDRESS/api/slot/0/io/relay \
 *   -w "\n\n%{time_starttransfer}\n"
 *
 */ 
async function relaysGet() {

  try {
    const time = new Elapsed()

    const data = ( await axios.get(RELAYS_URL, config)).data
    
    log( `MOXA GET ${RELAYS_URL} ${time.elapsed()}` )

    if (DEBUG_DATA)
      console.dir( data, {depth: null} )

    // store relays data received
    OUTPUTSOBJ.io.relay[0].relayStatus = data.io.relay[0].relayStatus
    OUTPUTSOBJ.io.relay[1].relayStatus = data.io.relay[1].relayStatus
    OUTPUTSOBJ.io.relay[2].relayStatus = data.io.relay[2].relayStatus
    OUTPUTSOBJ.io.relay[3].relayStatus = data.io.relay[3].relayStatus
    OUTPUTSOBJ.io.relay[4].relayStatus = data.io.relay[4].relayStatus
    OUTPUTSOBJ.io.relay[5].relayStatus = data.io.relay[5].relayStatus
      
    return data
  }  

  catch(error) { 
    onError(error) 
  } 

}  


/**
 * RELAYS PUT 
 *
 * curl \
 *   -X PUT \
 *   -H "Accept: vdn.dac.v1" \
 *   -H "Content-Type: application/json" \
 *   http://$IPADDRESS/api/slot/0/io/relay \
 *   -w "\n\n%{time_starttransfer}\n"
 *
 */ 
async function relaysPut(data) {
  
  try {

    const time = new Elapsed()

    const response = await axios.put(RELAYS_URL, data, config)

    log( `MOXA PUT ${RELAYS_URL} ${time.elapsed()}` )

    const responseData = response.data

    if (DEBUG_DATA)
      console.dir( responseData, {depth: null} )

    // store relays data received
    //OUTPUTSOBJ.io.relay[0].relayStatus = responseData.io.relay[0].relayStatus
    //OUTPUTSOBJ.io.relay[1].relayStatus = responseData.io.relay[1].relayStatus
    //OUTPUTSOBJ.io.relay[2].relayStatus = responseData.io.relay[2].relayStatus
    //OUTPUTSOBJ.io.relay[3].relayStatus = responseData.io.relay[3].relayStatus
    //OUTPUTSOBJ.io.relay[4].relayStatus = responseData.io.relay[4].relayStatus
    //OUTPUTSOBJ.io.relay[5].relayStatus = responseData.io.relay[5].relayStatus
      
    return data //responseData
  }  

  catch(error) { 
    onError(error) 
  } 

}  


/**
 * DIGITAL INPUTS PUT
 *
 * curl \
 *   -X PUT \
 *   -H "Accept: vdn.dac.v1" \
 *   -H "Content-Type: application/json" \
 *   http://$IPADDRESS/api/slot/0/io/di \
 *   -d '{"key1":"value1", "key2":"value2"}' or -d @data.json \
 *   -w "\n\n%{time_starttransfer}\n"
 *
 */ 
function digitalInputsPut(data) {

  const time = new Elapsed()
  axios.put(DIGITAL_INPUTS_URL, data, config)
    .then(function (response) {

      log( `MOXA PUT ${DIGITAL_INPUTS_URL} ${time.elapsed()}` )

      if (DEBUG_DATA) 
        console.dir( response.data, {depth: null} )

      // store digital inputs data received
      INPUTSOBJ.io.di[0].diStatus = response.data.io.di[0].diStatus
      INPUTSOBJ.io.di[1].diStatus = response.data.io.di[1].diStatus
      INPUTSOBJ.io.di[2].diStatus = response.data.io.di[2].diStatus
      INPUTSOBJ.io.di[3].diStatus = response.data.io.di[3].diStatus
      INPUTSOBJ.io.di[4].diStatus = response.data.io.di[4].diStatus
      INPUTSOBJ.io.di[5].diStatus = response.data.io.di[5].diStatus

    })
    .catch( error => onError(error) )

}  


/**
 * DIGITAL OUTPUTS GET
 *
 * curl \
 *   -X GET \
 *   -H "Accept: vdn.dac.v1" \
 *   -H "Content-Type: application/json" \
 *   http://$IPADDRESS/api/slot/0/io/do \
 *   -w "\n\n%{time_starttransfer}\n"
 *
 */ 
function digitalOutputsGet() {

  const time = new Elapsed()
  axios.get(DIGITAL_OUTPUTS_URL, config)
    .then(function (response) {

      log( `MOXA GET ${DIGITAL_OUTPUTS_URL} ${time.elapsed()}` )

      if (DEBUG_DATA) 
        console.dir( response.data, {depth: null} )

    })
    .catch( error => onError(error) )

}  


/**
 * DIGITAL OUTPUTS PUT
 *
 * curl \
 *   -X PUT \
 *   -H "Accept: vdn.dac.v1" \
 *   -H "Content-Type: application/json" \
 *   http://$IPADDRESS/api/slot/0/io/do \
 *   -d '{"key1":"value1", "key2":"value2"}' or -d @data.json \
 *   -w "\n\n%{time_starttransfer}\n"
 *
 */ 
function digitalOutputsPut(data) {

  const time = new Elapsed()
  axios.put(DIGITAL_OUTPUTS_URL, data, config)
    .then(function (response) {

      log( `MOXA GET ${DIGITAL_OUTPUTS_URL} ${time.elapsed()}` )

      if (DEBUG_DATA) 
        console.dir( response.data, {depth: null} )

    })
    .catch( error => onError(error) )

}  


/** 
 * onError
 *
 * @param {AxiosErrorObject} error
 *
 * @see https://github.com/axios/axios#handling-errors
 */
function onError( error ) {
  
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.error(error.response.status)
    console.error(error.message)
    //console.error(error.response.data)
    //console.error(error.response.headers)
  } 

  else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    //console.error(error.request)
    console.error('Error', error.message)
  } 

  else {
    // Something happened in setting up the request that triggered an Error
    console.error('Error', error.message)
  }

  //console.error(error.config)

}



/**
 *
 * @param {Number} timeoutMsecs 
 *
 */
function digitalInputsPolling(timeoutMsecs=POLLING_MSECS) {


  // retrigger timeout
  pollingTimeoutCallback = setTimeout ( 
    async () => {

      // get digital inputs
      await digitalInputsGet()
      printStatus()
      
      // retrigger timeout handler  
      digitalInputsPolling()
    }, 
    timeoutMsecs )

}


/**
 *
 * @param {Number} timeoutMsecs 
 *
 */
function relaysActivationRandom(timeoutMsecs=5*1000) {

  setTimeout( 
    async () => {

      for (let i = 0; i < 6; i++) {

        if ( Math.random() > 0.5 ) {
          if ( Math.random() > 0.5 )
            setRelay(i)
          else
            resetRelay(i)
        }

      }  

      await relaysPut( OUTPUTSOBJ )
      printStatus()

      const minimum = 5*1000
      const maximum = 10*1000
      const delay = minimum + (Math.random() * (maximum - minimum + 1) ) << 0

      log(`next relays activation in ${delay} msecs`)

      relaysActivationRandom( delay )

    }, 
    timeoutMsecs)

}




/*
 * main module function, acting as unit test
 */ 
async function main() {
  
  initialize('192.168.1.200')

  // event handlers
  moxaEvents.on( DI0_UP, () => log( 'MOXA EVENT DI0 UP' ) )
  moxaEvents.on( DI0_DOWN, () => log( 'MOXA EVENT DI0 DOWN' ) )
  moxaEvents.on( DI1_UP, () => log( 'MOXA EVENT DI1 UP' ) )
  moxaEvents.on( DI1_DOWN, () => log( 'MOXA EVENT DI1 DOWN' ) )
  moxaEvents.on( DI2_UP, () => log( 'MOXA EVENT DI2 UP' ) )
  moxaEvents.on( DI2_DOWN, () => log( 'MOXA EVENT DI2 DOWN' ) )
  moxaEvents.on( DI3_UP, () => log( 'MOXA EVENT DI3 up' ) )
  moxaEvents.on( DI3_DOWN, () => log( 'MOXA EVENT DI3 DOWN' ) )
  moxaEvents.on( DI4_UP, () => log( 'MOXA EVENT DI4 UP' ) )
  moxaEvents.on( DI4_DOWN, () => log( 'MOXA EVENT DI4 DOWN' ) )
  moxaEvents.on( DI5_UP, () => log( 'MOXA EVENT DI5 UP' ) )
  moxaEvents.on( DI5_DOWN, () => log( 'MOXA EVENT DI5 DOWN' ) )

  printInfo( await sysInfo() )

  // Input polling, every 500 msecs
  digitalInputsPolling()

  // simulate relays activation every >= 5000 msec
  relaysActivationRandom()

  /*
  // digitalInputs1 = ON
  //digitalInputsPut( setDigitalInput(1, 1) )
  
  await digitalInputsGet()
  await relaysGet()
  
  //printStatusVertical()
  printStatus()
  
  await sleep(2000)

  setRelay(0)
  setRelay(1)
  setRelay(2)

  if (DEBUG_DATA)
    console.dir( OUTPUTSOBJ, {depth: null} )
  
  await relaysPut( OUTPUTSOBJ ) 

  printStatus()
  
  //digitalOutputsGet()
  */
}  


// this module was run directly from the command line
if (require.main === module) 
  main()


// exports public function 
module.exports = { 

  initialize,
  printStatus,

  sysInfo,
  printInfo,

  relaysGet,
  relaysPut,

  digitalInputsGet,
  digitalInputsPut,

  digitalOutputsGet,
  digitalOutputsPut

}

