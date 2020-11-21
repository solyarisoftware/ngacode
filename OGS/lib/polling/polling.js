
function test(a, room, seconds) {
  console.log(a, room, seconds)
}

const intervalid = setInterval(test, 2000, 'room', 20)
