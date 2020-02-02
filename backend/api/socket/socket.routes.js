
module.exports = connectSockets

function connectSockets(io) {
    io.on('connection', socket => {
        socket.on('newMsg', msg=>{
            // io.emit('review NewReview', msg)
            // emits only to sockets in the same room   
            console.log('emitting msg!')
            io.to(socket.myChannel).emit('addMsg', msg)
        })

        socket.on('newChannel', channel=>{
            
            if (socket.myChannel) {
                console.log('leaving socket!')
                socket.leave(socket.myChannel)

            }
            console.log('joining socket!')
            socket.join(channel)
            socket.myChannel = channel;
            
        })
        console.log("socket->4");
    })
}
