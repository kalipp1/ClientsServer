const express = require('express');
const cors = require('cors');
const path = require('path');
const socket = require('socket.io');

const testimonialsRoutes = require('../routes/testimonials.routes.js');
const concertsRoutes = require('../routes/concerts.routes.js');
const seatsRoutes = require('../routes/seats.routes.js');


const app = express();
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});

const io = socket(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

app.use((req, res, next) => {
  req.io = io;
  next();
});
app.use('/api', testimonialsRoutes);
app.use('/api', concertsRoutes);
app.use('/api', seatsRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use(express.static(path.join(__dirname, '/client/build')));

app.use((req, res) => {
    res.status(404).send('404 not found...');
  })

io.on('connection', (socket) => {
  console.log('New client! Its id – ' + socket.id);
  });