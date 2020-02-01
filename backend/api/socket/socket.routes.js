
module.exports = connectSockets

function connectSockets(io) {
    io.on('connection', socket => {

        socket.on('newMsg', msg => { //getting a new msg through the socket port
            // io.emit('review NewReview', msg)
            // emits only to sockets in the same room
            // console.log("enter to reviewNewMsg");

            // console.log("SOcKET - HII -> msg->1 ",msg);
            // console.log("SOcKET - socket.myTopic ->1",socket.myTopic);

            //emitting the received msg only to the channel which was opened!
            io.to(socket.myTopic).emit('addMsg', msg)
        })

        socket.on('newChannel', topic => { //signing to a new socket port 
            console.log("new channel opened!");

            if (socket.myTopic) { // if already signed to this chennel - leave the channel
                socket.leave(socket.myTopic)
                // console.log("SOKET - HII ->2",msg);

            } //else - join the new channel
            socket.join(topic)
            socket.myTopic = topic;
            console.log("signed to a new channel: ", socket.myTopic);

        })
    })
}
