class Sockets {

    constructor(io) {
        this.io = io;

        this.socketsEvents();

    }

    socketsEvents() {
        this.io.on('connection', (socket) => {


            //escuchar el evento
            socket.on('mensaje-to-server', (data) => {
                console.log(data);

                //el socket solo emite el mensaje a un solo explorador no funciona para poder hacer comunicacion entre todos, para hacer la comunicacion entre todos los exploradores conectados es con io
                this.io.emit('mensaje-from-server', data);
            });
        });
    }

}

module.exports = Sockets;