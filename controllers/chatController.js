const Message = require('../models/Message');

let ioInstance;

exports.initChat = (io) => {
  ioInstance = io;
  io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('chat message', (msg) => {
      io.emit('chat message', msg);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });
};

exports.sendMessage = async (req, res) => {
  try {
    const { content, receiver } = req.body;
    const sender = req.user.id

    console.log(content, receiver, sender)

    const newMessage = new Message({
      content,
      sender,
      receiver,
      timestamp: new Date()
    });

    const savedMessage = await newMessage.save();

    ioInstance.emit('chat message', savedMessage);

    res.status(200).json(savedMessage);
  } catch (error) {
    res.status(500).json({ message: 'Error sending message', error });
  }
};
