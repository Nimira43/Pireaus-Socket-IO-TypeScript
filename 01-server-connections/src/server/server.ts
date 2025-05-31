import { createServer } from 'http'
import { Server } from 'socket.io'
import * as express from 'express'
import * as path from 'path'
import NombreGame from './nombreGame'

const PORT = 3000
const app = express()
app.use(express.static(path.join(__dirname, '../client')))

const server = createServer(app)
const io = new Server(server)
const game = new NombreGame()

io.on('connection', (socket) => {
  console.log('User is connected : ' + socket.id)

  game.LuckyNumbers[socket.id] = Math.floor(Math.random() * 20)
 
  socket.emit('message', 'Welcome. Your lucky number is ' + game.LuckyNumbers[socket.id])
  socket.broadcast.emit('message', 'Everyone say welcome to ' + socket.id)

  socket.on('disconnect', () => {
    console.log('socket disconnected : ' + socket.id)
    socket.broadcast.emit('message', socket.id + ' has now departed.')
  })
})

server.listen(PORT, () => {
  console.log('Server is listening on Port ' + PORT)
})

setInterval(() => {
  const randomNumber = Math.floor(Math.random() * 20)
  const winners = game.GetWinners(randomNumber)
  if (winners.length) {
    winners.forEach((w) => {
      io.to(w).emit('message', 'You win with ' + randomNumber)
    })
  }
  io.emit('message', randomNumber)
}, 1000)