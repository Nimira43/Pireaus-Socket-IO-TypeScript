import { createServer } from 'http'
import { Server } from 'socket.io'
import * as express from 'express'
import * as path from 'path'

const PORT = 3000

const app = express()
app.use(express.static(path.join(__dirname, '../client')))

const server = createServer(app)
const io = new Server(server)

io.on('connection', (socket) => {
  console.log('User is connected : ' + socket.id)

   socket.on('disconnect', () => {
    console.log('socket disconnected : ' + socket.id)
  })
})

server.listen(PORT, () => {
  console.log('Server is listening on Port ' + PORT)
})