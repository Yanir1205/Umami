
module.exports = connectSockets

function connectSockets(io) {
    io.on('connection', socket => {
        socket.on('newMsg', msg=>{
            // io.emit('review NewReview', msg)
            // emits only to sockets in the same room            
            console.log("socket - test msg -> ",msg);
            console.log("socket connection to  myChannel ->",socket.myChannel);
            io.to(socket.myChannel).emit('addMsg', msg)
        })

        socket.on('newChannel', channel=>{
            console.log("enter to reviewNew change channel");
            
            if (socket.myChannel) {
                socket.leave(socket.myChannel)
                // console.log("SOKET - HII ->2",msg);

            }
            socket.join(channel)
            socket.myChannel = channel;
            console.log("signed to channel: -> myChannel ->",socket.myChannel);
            
        })
        console.log("socket->4");
    })
}