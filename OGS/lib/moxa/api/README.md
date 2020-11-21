# MOXA ioLogik E1200 Series

- Home https://www.moxa.com/en/products/industrial-edge-connectivity/controllers-and-ios/universal-controllers-and-i-os/iologik-e1200-series#resource
- User Manual https://www.moxa.com/getmedia/6b024adb-5276-429d-9837-1235ee4ac836/moxa-iologik-e1200-series-manual-v15.9.pdf
- Datasheet https://www.moxa.com/getmedia/368c4382-67cf-4a6a-8457-ac5c7ce10230/moxa-iologik-e1200-series-datasheet-v2.1.pdf
- Moxa CLI Configuration Tool (MCC_Tool) Manual https://www.moxa.com/getmedia/cf16149b-eac7-454d-8b84-23d8ae90ebcf/moxa-cli-configuration-tool-manual-v2.0.pdf
- HTTP REST API https://www.moxa.com/getmedia/e128fd84-0f99-4f86-907a-6bd9dc17bfdb/moxa-using-a-restful-api-to-connect-to-remote-i-os-tech-note-v1.0.pdf

```
ioLogik E1200 RESTful API
·         Supported Methods

o    GET

o    PUT

o    OPTIONS



·         API List



RESTful API
 Name
 Description
 Access

/api/slot/0/sysInfo




/api/slot/0/sysInfo/device
 modelName
 model name
 read-only

/api/slot/0/sysInfo/device
 deviceName
 device name
 read-only

/api/slot/0/sysInfo/device
 deviceUpTime
 device up time
 read-only

/api/slot/0/sysInfo/device
 firmwareVersion
 firmware version
 read-only

/api/slot/0/sysInfo/network




/api/slot/0/sysInfo/network/LAN




/api/slot/0/sysInfo/network/LAN
 lanMac
 MAC address
 read-only

/api/slot/0/sysInfo/network/LAN
 lanIp
 IP address
 read-only

/api/slot/0/io/di




/api/slot/0/io/di
 diIndex
 DI - index
 read-only

/api/slot/0/io/di
 diMode
 DI - mode (0: DI, 1: Counter)
 read-only

/api/slot/0/io/di
 diStatus
 DI - DI mode - status (0: OFF, 1: ON)
 read-only

/api/slot/0/io/di
 diCounterValue
 DI - Counter mode - value
 read-only

/api/slot/0/io/di
 diCounterReset
 DI - Counter mode - reset to initial value (1: RESET)
 read-write

/api/slot/0/io/di
 diCounterOverflowFlag
 DI - Counter mode - overflow flag (0: Normal, 1: Overflow)
 read-only

/api/slot/0/io/di
 diCounterOverflowClear
 DI - Counter mode - clear overflow flag (1: Clear)
 read-write

/api/slot/0/io/di
 diCounterStatus
 DI - Counter mode - status (0: STOP, 1: START)
 read-write

/api/slot/0/io/di/0/diStatus
 diStatus
 DI - DI mode - status (0: OFF, 1: ON)
 read-only

/api/slot/0/io/di/0/diCounterValue
 diCounterValue
 DI - Counter mode - value
 read-only

/api/slot/0/io/di/0/diCounterReset

 DI - Counter mode - reset to initial value (1: RESET)
 read-write

/api/slot/0/io/di/0/diCounterStatus

 DI - Counter mode - status (0: STOP, 1: START)
 read-write

/api/slot/0/io/do




/api/slot/0/io/do
 doIndex
 DO - index
 read-only

/api/slot/0/io/do
 doMode
 DO - mode (0: DO, 1: Pulse)
 read-only

/api/slot/0/io/do
 doStatus
 DO - DO mode - status (0: OFF, 1: ON)
 read-write

/api/slot/0/io/do
 doPulseCount
 DO - Pulse mode - count
 read-write

/api/slot/0/io/do
 doPulseOnWidth
 DO - Pulse mode - ON width (unit: 1 ms)
 read-write

/api/slot/0/io/do
 doPulseOffWidth
 DO - Pulse mode - OFF width (unit: 1 ms)
 read-write

/api/slot/0/io/do
 doPulseStatus
 DO - Pulse mode - status (0: STOP, 1: START)
 read-write

/api/slot/0/io/do/0/doStatus
 doStatus
 DO - DO mode - status (0: OFF, 1: ON)
 read-write

/api/slot/0/io/do/0/doPulseCount
 doPulseCount
 DO - Pulse mode - count
 read-write

/api/slot/0/io/do/0/doPulseStatus
 doPulseStatus
 DO - Pulse mode - status (0: STOP, 1: START)
 read-write

/api/slot/0/io/relay




/api/slot/0/io/relay
 relayIndex
 Relay - index
 read-only

/api/slot/0/io/relay
 relayMode
 Relay - mode (0: Relay, 1: Pulse)
 read-only

/api/slot/0/io/relay
 relayStatus
 Relay - Relay mode - status (0: OFF, 1: ON)
 read-write

/api/slot/0/io/relay
 relayTotalCount
 Relay - Relay mode - total count
 read-only

/api/slot/0/io/relay
 relayCurrentCount
 Relay - Relay mode - current count
 read-only

/api/slot/0/io/relay
 relayCurrentCountReset
 Relay - Relay mode - reset current count (1: RESET)
 read-write

/api/slot/0/io/relay
 relayPulseStatus
 Relay - Pulse mode - status (0: STOP, 1: START)
 read-write

/api/slot/0/io/relay
 relayPulseCount
 Relay - Pulse mode - count
 read-write

/api/slot/0/io/relay
 relayPulseOnWidth
 Relay - Pulse mode - ON width (unit: 1.5 s)
 read-write

/api/slot/0/io/relay
 relayPulseOffWidth
 Relay - Pulse mode - OFF width (unit: 1.5 s)
 read-write

/api/slot/0/io/relay/0/relayStatus
 relayStatus
 Relay - Relay mode - status (0: OFF, 1: ON)
 read-write

/api/slot/0/io/relay/0/relayPulseStatus
 relayPulseStatus
 Relay - Pulse mode - status (0: STOP, 1: START)
 read-write

/api/slot/0/io/relay/0/relayPulseCount
 relayPulseCount
 Relay - Pulse mode - count
 read-write

/api/slot/0/io/ai




/api/slot/0/io/ai
 aiIndex
 AI - index
 read-only

/api/slot/0/io/ai
 aiMode
 AI - mode (0: 0-10 V, 1: 4-20mA, 2: 0-20mA, 4: 4-20mA burnout)
 read-only

/api/slot/0/io/ai
 aiValueRaw
 AI - raw value
 read-only

/api/slot/0/io/ai
 aiValueScaled
 AI - scaled value
 read-only

/api/slot/0/io/ai
 aiValueRawMin
 AI - minimum raw value
 read-only

/api/slot/0/io/ai
 aiValueRawMax
 AI - maximum raw value
 read-only

/api/slot/0/io/ai
 aiValueScaledMin
 AI - minimum scaled value
 read-only

/api/slot/0/io/ai
 aiValueScaledMax
 AI - maximum scaled value
 read-only

/api/slot/0/io/ai
 aiResetMinValue
 AI - reset minimum value (1: RESET)
 read-write

/api/slot/0/io/ai
 aiResetMaxValue
 AI - reset maximum value (1: RESET)
 read-write

/api/slot/0/io/ai
 aiStatus
 AI - status (0: normal, 1: burnout, 2: over range, 3. under range)
 read-only

/api/slot/0/io/ai
 aiBurnoutValue
 AI - burnout value
 read-only

/api/slot/0/io/ai/0/aiValueRaw
 aiValueRaw
 AI - raw value
 read-only

/api/slot/0/io/ao




/api/slot/0/io/ao
 aoIndex
 AO - index
 read-only

/api/slot/0/io/ao
 aoMode
 AO - mode (0: 0-10 V, 1: 4-20mA, 2: 0-20 mA)
 read-only

/api/slot/0/io/ao
 aoValueRaw
 AO - raw value
 read-write

/api/slot/0/io/ao
 aoValueScaled
 AO - scaled value
 read-only

/api/slot/0/io/ao/0/aoValueRaw
 aoValueRaw
 AO - raw value
 read-write

/api/slot/0/io/rtd




/api/slot/0/io/rtd
 rtdIndex
 RTD - index
 read-only

/api/slot/0/io/rtd
 rtdSensorType
 RTD - sensor type
 read-only

/api/slot/0/io/rtd
 rtdValueEngineeringMultiplied
 RTD - engineering multiplied value
 read-only

/api/slot/0/io/rtd
 rtdValueEngineeringMultipliedMin
 RTD - engineering multiplied minimum value
 read-only

/api/slot/0/io/rtd
 rtdValueEngineeringMultipliedMax
 RTD - engineering multiplied maximum value
 read-only

/api/slot/0/io/rtd
 rtdValueScaled
 RTD - scaled value
 read-only

/api/slot/0/io/rtd
 rtdValueScaledMin
 RTD - minimum scaled value
 read-only

/api/slot/0/io/rtd
 rtdValueScaledMax
 RTD - maximum scaled value
 read-only

/api/slot/0/io/rtd
 rtdResetMinValue
 RTD - reset minimum value (1: RESET)
 read-write

/api/slot/0/io/rtd
 rtdResetMaxValue
 RTD - reset maximum value (1: RESET)
 read-write

/api/slot/0/io/rtd/0/rtdValueEngineeringMultiplied
 rtdValueEngineeringMultiplied
 RTD - engineering multiplied value
 read-only

/api/slot/0/io/tc




/api/slot/0/io/tc
 tcIndex
 TC - index
 read-only

/api/slot/0/io/tc
 tcSensorType
 TC - sensor type
 read-only

/api/slot/0/io/tc
 tcValueEngineeringMultiplied
 TC - engineering multiplied value
 read-only

/api/slot/0/io/tc
 tcValueEngineeringMultipliedMin
 TC - engineering multiplied minimum value
 read-only

/api/slot/0/io/tc
 tcValueEngineeringMultipliedMax
 TC - engineering multiplied maximum value
 read-only

/api/slot/0/io/tc
 tcValueScaled
 TC - scaled value
 read-only

/api/slot/0/io/tc
 tcValueScaledMin
 TC - minimum scaled value
 read-only

/api/slot/0/io/tc
 tcValueScaledMax
 TC - maximum scaled value
 read-only

/api/slot/0/io/tc
 tcResetMinValue
 TC - reset minimum value (1: RESET)
 read-write

/api/slot/0/io/tc
 tcResetMaxValue
 TC - reset maximum value (1: RESET)
 read-write

/api/slot/0/io/tc/0/tcValueEngineeringMultiplied
 tcValueEngineeringMultiplied
 TC - engineering multiplied value
 read-only




·         Response Code



HTTP Status Code
 Description
 Moxa Status Code
 Moxa Status Code
 User Message

400
 Bad Request
 101
 UnsupportedVersion
 The content version specified in the request is not supported.

400
 Bad Request
 102
 UnsupportedDocFormat
 The document format specified in the request is not supported.

400
 Bad Request
 201
 InvalidJsonFormat
 The json format in the request is invalid.

400
 Bad Request
 202
 InvalidNodeValue
 One of the node values is invalid.

400
 Bad Request
 203
 WrongChannelOrder
 The I/O channels are disordered.

400
 Bad Request
 204
 MissingRequiredChannel
 A required channel index was not specified in the request body.

400
 Bad Request
 206
 MissingRequiredNode
 A required node was not specified in the request body.

400
 Bad Request
 300
 ContentFailed
 One of the channel content in the request could not be set. Please refer to the detail information.

400
 Bad Request
 301
 ContentFailedToSet
 The content in the request could not be set. (invalid value)

200
 OK
 N/A


404
 Bad Request
 N/A



405
 Method Not Allowed
 N/A



500
 Internal Server Error
 N/A

```







