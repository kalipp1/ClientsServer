const express = require('express');
const { v4: uuidv4 } = require('uuid');
const db = require('../server/db')
const router = express.Router();

router.route('/concerts').get((req, res) => {
    res.send(db.concerts);
  });
  
router.route('/concerts/:id').get((req, res) => {
    const { id } = req.params;
    const concert = db.concerts.find(item => item.id === parseInt(id));
    if(!concert){
      res.status(404).send('Concert not found');
    }else{
      res.send(concert);
    }
  });
  
router.route('/concerts').post((req , res) => {
    const { performer, genre, price, day, image } = req.body;
    
    const newConcert = {
      id: uuidv4(),
      performer: performer,
      genre: genre,
      price: price,
      day: day,
      image: image,
    }
  
    db.concerts.push(newConcert);
    res.send({message: 'OK'});
  });
  
router.route('/concerts/:id').put((req, res) => {
    const { id } = req.params;
    const { performer, genre, price, day, image } = req.body;
    const concert = db.concerts.find(item => item.id === parseInt(id));
    if(!concert){
      res.status(404).send('Concert not found');
    }else{
      concert.performer = performer;
      concert.genre = genre;
      concert.price = price;
      concert.day = day;
      concert.image = image;
  
      res.send({message: 'OK'});
    }
  });
  
router.route('/concerts/:id').delete((req, res) => {
    const { id } = req.params;
    const index = db.concerts.findIndex(item => item.id === parseInt(id));
  
  if(index === -1){
    res.status(404).send('Concert not found');
  }else{
    db.concerts.splice(index, 1);
    res.send({message: 'OK'});
  }
  });

module.exports = router;