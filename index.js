const express = require('express');
const path = require('path');
require('dotenv').config();

// DBConnection
const {dbConnection} = require('./database/config')
dbConnection();


//App de Express
const app = express();

//Lectura y parseo del Body
app.use(express.json());


//NodeServer
const server = require('http').createServer(app);
const io = require('socket.io')(server);
require('./sockets/socket')(io); 

// Path Publico
const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));

// Rutas

app.use('/api/login', require('./routes/auth'));


server.listen(process.env.PORT, (err) => {
  if (err) throw new Error(err);
  console.log('Servidor Corriendo en puerto', process.env.PORT );
} );