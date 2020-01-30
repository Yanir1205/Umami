
module.exports = connectSockets

function connectSockets(io) {
    io.on('connection', socket => {
        console.log("SOcKET - HII ->0",socket.on);

        socket.on('reviewNew', msg=>{
            // io.emit('review NewReview', msg)
            // emits only to sockets in the same room
            
            console.log("SOcKET - HII -> msg->1 ",msg);
            io.to(socket.myTopic).emit('review addMsg', msg)
            console.log("SOcKET - socket.myTopic ->1",socket.myTopic);
            
        })
        socket.on('reviewNew', topic=>{
            if (socket.myTopic) {
                socket.leave(socket.myTopic)
                // console.log("SOKET - HII ->2",msg);

            }
            socket.join(topic)
            socket.myTopic = topic;
            console.log("SOcKET - HII ->3");
            
        })
        console.log("SOcKET - HII ->4");
    })
}