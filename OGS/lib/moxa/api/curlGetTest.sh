#!/bin/bash
# MOXA ioLogik E1200 Series - curl test script

# Documentation:
# HTTP REST API https://www.moxa.com/getmedia/e128fd84-0f99-4f86-907a-6bd9dc17bfdb/moxa-using-a-restful-api-to-connect-to-remote-i-os-tech-note-v1.0.pdf
# https://www.moxa.com/en/spotlight/controller-and-io/multiprotocol-smart-io/index.htm
# https://dev.to/yuyatakeyama/how-i-measure-response-times-of-web-apis-using-curl-6nh
# https://ops.tips/gists/measuring-http-response-times-curl/

# ioLogik E1200 device IP address
IPADDRESS=192.168.127.254


#
# 1. SYS INFO REQUEST 
#
curl \
  -X GET \
  -H "Accept: vdn.dac.v1" \
  -H "Content-Type: application/json" \
  http://$IPADDRESS/api/slot/0/sysInfo \
  -w  "\n\n%{time_starttransfer}\n"

# /api/slot/0/sysInfo/device
# /api/slot/0/sysInfo/network
# /api/slot/0/sysInfo/network/LAN

#
# 2. DIGITAL INPUTS REQUEST
#
curl \
  -X GET \
  -H "Accept: vdn.dac.v1" \
  -H "Content-Type: application/json" \
  http://$IPADDRESS/api/slot/0/io/di \
  -w "\n\n%{time_starttransfer}\n"

# /api/slot/0/io/di/0/diStatus
# /api/slot/0/io/di/0/diCounterValue
# /api/slot/0/io/di/0/diCounterReset

#
# 3. DIGITAL OUTPUTS REQUEST
#
curl \
  -X GET \
  -H "Accept: vdn.dac.v1" \
  -H "Content-Type: application/json" \
  http://$IPADDRESS/api/slot/0/io/do \
  -w "\n\n%{time_starttransfer}\n"

# /api/slot/0/io/do/0/doStatus
# /api/slot/0/io/do/0/doPulseCount
# /api/slot/0/io/do/0/doPulseStatus


# /api/slot/0/io/relay
# /api/slot/0/io/relay/0/relayStatus
# /api/slot/0/io/relay/0/relayPulseStatus
# /api/slot/0/io/relay/0/relayPulseCount
# 
# /api/slot/0/io/ai
# /api/slot/0/io/ai/0/aiValueRaw
# 
# /api/slot/0/io/ao
# 
# /api/slot/0/io/rtd
# /api/slot/0/io/rtd/0/rtdValueEngineeringMultiplied
# 
# /api/slot/0/io/tc

