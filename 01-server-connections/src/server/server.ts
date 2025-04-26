import { createServer } from 'http'
import { Server } from 'socket.io'
import * as express from 'express'
import * as path from 'path'

const PORT = 3000

const app = express()
app.use(express.static(path.join(__dirname, '../client')))

const server = createServer(app)
const io = new Server(server)
let clientCount = 0

io.on('connection', (socket) => {
  clientCount++
  console.log('User is connected : ' + socket.id)
  console.log('Number of Clients: ', clientCount)

  socket.emit('message', 'Welcome = ' + socket.id)
  socket.broadcast.emit('message', 'Everyone say welcome to ' + socket.id)

  socket.on('disconnect', () => {
    clientCount--
    console.log('socket disconnected : ' + socket.id)
    console.log('Number of Clients: ', clientCount)
    socket.broadcast.emit('message', socket.id + ' has now departed.')
  })
})

server.listen(PORT, () => {
  console.log('Server is listening on Port ' + PORT)
})