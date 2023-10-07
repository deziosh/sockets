// Importe as bibliotecas necessárias
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');
const routes = require('./routes/routes'); // Importe suas rotas
const { emitir } = require('./middlewares/middleware'); // Importe o middleware personalizado

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Configurações do bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 8080;

// Middleware para emitir notificações via Socket.io
app.use((req, res, next) => {
  emitir(req, res, next, io); // Passe a instância do Socket.io como argumento
});

// Roteamento
app.use('/api', routes);

// Servir o cliente HTML estático
app.use(express.static(__dirname + './public/recebedor'));

// Endpoint para enviar notificações
app.get('/enviar-notificacao', (req, res) => {
  const notificacao = req.query.notificacao || 'Notificação padrão';
  io.emit('notificacao', notificacao); // Emitir notificação para todos os clientes conectados
  res.send(`Notificação "${notificacao}" enviada com sucesso.`);
});

server.listen(port, () => {
  console.log(`Conectado à porta ${port}`);
});
