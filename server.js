const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/route');
const morgan = require('morgan')
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const PORT = process.env.PORT || 5000;

dotenv.config();

const app = express();

app.use(morgan('tiny'))

app.use(bodyParser.json());
connectDB();

app.use('/api', routes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
