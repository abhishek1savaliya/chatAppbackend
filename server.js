const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/route');
const http = require('http');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
const { Server } = require('socket.io');
const connectDB = require('./config/db');
const PORT = process.env.PORT || 5000;

dotenv.config();

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});


app.use(morgan('tiny'));
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

connectDB();

app.use('/api', routes);


require('./controllers/chatController').initChat(io);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
