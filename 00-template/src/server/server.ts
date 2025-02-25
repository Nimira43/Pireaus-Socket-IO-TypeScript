import { createServer } from 'http'
import { Server } from 'socket.io'

const PORT = 3000
const server = createServer()
const io = new Server(server)

io.on('connection', (socket) => {
  console.log('User is connected : ' + socket.id)
})

server.listen(PORT, () => {
  console.log('Server is listening on Port ' + PORT)
})