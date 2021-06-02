//servidor de express
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
const Sockets = require('./sockets');


class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        //http server
        this.server = http.createServer(this.app);

        //configuracion del socket server
        this.io = socketio(this.server, { /* configuraciones */ });
    }

    middlewares() {
        //desplegar directorio publico
        this.app.use(express.static(path.resolve(__dirname, '../public')));
    }

    configurarSockets() {
        new Sockets(this.io);
    }

    execute() {

        //inicializar middlewares
        this.middlewares();

        //inicializar Sockets
        this.configurarSockets();

        //inicializar server
        this.server.listen(this.port, () => {
            console.log('Server corriendo en purto: ', this.port);
        });
    }


}

module.exports = Server;