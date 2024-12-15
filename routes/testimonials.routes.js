const express = require('express');
const { v4: uuidv4 } = require('uuid');
const db = require('../db')
const router = express.Router();

router.route('/testimonials').get((req, res) => {
    res.send(db.testimonials);
  });

router.route('/testimonials/random').get((req, res) => {
    const randomIndex = Math.floor(Math.random() * db.testimonials.length)
    res.send(db.testimonials[randomIndex]);
  });
  
router.route('/testimonials/:id').get((req, res) => {
    const { id } = req.params;
    const testimonial = db.testimonials.find(item => item.id === parseInt(id));
    if(!testimonial){
      res.status(404).send('Testimonial not found');
    }else{
      res.send(testimonial);
    }
  });
  
router.route('/testimonials').post((req , res) => {
    const { author, text } = req.body;
    
    const newTestimonial = {
      id: uuidv4(),
      author: author,
      text: text,
    }
  
    db.testimonials.push(newTestimonial);
    res.send({message: 'OK'});
  });
  
router.route('/testimonials/:id').put((req, res) => {
    const { id } = req.params;
    const { author, text } = req.body;
    const testimonial = db.testimonials.find(item => item.id === parseInt(id));
    if(!testimonial){
      res.status(404).send('Testimonial not found');
    }else{
      testimonial.author = author;
      testimonial.text = text;
  
      res.send({message: 'OK'});
    }
  });
  
router.route('/testimonials/:id',).delete((req, res) => {
    const { id } = req.params;
    const index = db.testimonials.findIndex(item => item.id === parseInt(id));
  
  if(index === -1){
    res.status(404).send('Testimonial not found');
  }else{
    db.testimonials.splice(index, 1);
    res.send({message: 'OK'});
  }
  });

module.exports = router;