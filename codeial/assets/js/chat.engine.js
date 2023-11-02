class ChatEngine {
    constructor(chatBoxId, userEmail) {
      const chatBox = $(`#${chatBoxId}`);
      const socket = io.connect('http://localhost:5000');
  
      if (userEmail) {
        this.connectionHandler(socket);
      }
    }
  
    connectionHandler(socket) {
        let self = this;
      socket.on('connect', () => {
        console.log('Connection established using sockets...!');

        self.socket.emit('join_room',{
            user_email: self.userEmail,
            chatroom: 'codeial'
        });

        self.socket.on('user_joined',(data)=>{
            console.log('a user joined',data);
        })
    });
    }
  }
  