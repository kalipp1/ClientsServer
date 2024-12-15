const express = require('express');
const { v4: uuidv4 } = require('uuid');
const db = require('../db')
const router = express.Router();

router.route('/seats').get((req, res) => {
    res.send(db.seats);
  });
  
router.route('/seats/:id').get((req, res) => {
    const { id } = req.params;
    const seat = db.seats.find(item => item.id === parseInt(id));
    if(!seat){
      res.status(404).send('Seat not found');
    }else{
      res.send(seat);
    }
  });
  
router.route('/seats').post((req , res) => {
    const { day, seat, client, email } = req.body;
    
    const newSeat = {
      id: uuidv4(),
      day: day,
      seat: seat,
      client: client,
      email: email,
    }
  
    db.seats.push(newSeat);
    res.send({message: 'OK'});
  });
  
router.route('/seats/:id').put((req, res) => {
    const { id } = req.params;
    const { day, seat, client, email } = req.body;
    const updatedSeat = db.seats.find(item => item.id === parseInt(id));
    if(!updatedSeat){
      res.status(404).send('Seat not found');
    }else{
      updatedSeat.day = day,
      updatedSeat.seat = seat,
      updatedSeat.client = client,
      updatedSeat.email = email,
  
      res.send({message: 'OK'});
    }
  });
  
router.route('/seats/:id').delete((req, res) => {
    const { id } = req.params;
    const index = db.seats.findIndex(item => item.id === parseInt(id));
  
  if(index === -1){
    res.status(404).send('Seat not found');
  }else{
    db.seats.splice(index, 1);
    res.send({message: 'OK'});
  }
  });

module.exports = router;