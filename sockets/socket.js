const { comprobarJWT } = require("../helpers/jwt");
const {usuarioConectado, usuarioDesconectado, grabarMensaje} = require('../controllers/socket');

//Mensajes de Sockets
module.exports = function(io){
  io.on('connection', (client) => {
    console.log('Cliente Conectado');
    
    const [valido, uid] = comprobarJWT(client.handshake.headers['x-token']);

    //Verificar Autenticacion
    if(!valido){return client.disconnect();}

    //Cliente Autenticado
    usuarioConectado(uid);

    //Escuchar del cliente el mensaje personal

    client.on('mensaje-personal', async(payload) => {
      //TODO: Grabar Mensaje

      await grabarMensaje(payload);

      io.to(payload.para).emit('mensaje-personal', payload);
      
    });
    //Ingresar al usuario a una sala en particular
    //Sala global, client.id
    
    client.join(uid);
    

    client.on('disconnect', () => {
      usuarioDesconectado(uid);
    });
    
    // client.on('mensaje', (payload) => {
    //   console.log('Mensaje', payload);
  
    //   io.emit('mensaje', {admin: 'Nuevo Mensaje'})
    // });
  });
}

