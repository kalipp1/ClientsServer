const express = require('express');
const { v4: uuidv4 } = require('uuid');
const db = require('./db.js')
const cors = require('cors');

const testimonialsRoutes = require('../routes/testimonials.routes.js');
const concertsRoutes = require('../routes/concerts.routes.js');
const seatsRoutes = require('../routes/seats.routes.js');


const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api', testimonialsRoutes);
app.use('/api', concertsRoutes);
app.use('/api', seatsRoutes);

app.use((req, res) => {
    res.status(404).send('404 not found...');
  })

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});