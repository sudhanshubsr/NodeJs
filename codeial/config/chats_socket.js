import {Server} from 'socket.io';

export const chatSockets = (Socketserver)=>{
    const io = new Server(Socketserver);


    io.on('connection',(socket)=>{
        console.log('new connected received', socket.id);
        socket.on('disconnect',()=>{
            console.log('socket disconnected!');
        });

        socket.on('join_room',(data)=>{
            console.log('joining request received',data);
            socket.join(data.chatroom);
            io.in(data.chatroom).emit('user_joined',data);
        });
    })
}