
module.exports = connectSockets

function connectSockets(io) {
    io.on('connection', socket => {
        socket.on('newMsg', msg=>{
            // io.emit('review NewReview', msg)
            // emits only to sockets in the same room            
            io.to(socket.myChannel).emit('addMsg', msg)
        })

        socket.on('newChannel', channel=>{
            
            if (socket.myChannel) {
                socket.leave(socket.myChannel)

            }
            socket.join(channel)
            socket.myChannel = channel;
            
        })
        console.log("socket->4");
    })
}
