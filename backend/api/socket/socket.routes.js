
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
            console.log('socket.myChannel->',socket.myChannel)
            if (socket.myChannel) {
                console.log('leaving socket!')
                socket.leave(socket.myChannel)

            }
            console.log('joining socket!')
            socket.join(channel)
            socket.myChannel = channel;
            
        })
        console.log("connectSockets(io)");
    })
}
