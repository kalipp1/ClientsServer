const Seats = require('../models/seats.model');
const mongoose = require('mongoose');

exports.getAll = async (req, res) => {
  console.log('123');
    try {
      console.log(mongoose.models);
      console.log(await mongoose.model('Seat').find()); // Works!
      console.log('controller');
      res.json(await Seats.find({}));
    }
    catch(err) {
      console.log(err);
      res.status(500).json({ message: err });
    }
  };
  
  
  exports.getRandom = async (req, res) => {
  
    try {
      const count = await Seats.countDocuments();
      const rand = Math.floor(Math.random() * count);
      const seat = await Seats.findOne().skip(rand);
      if(!seat) res.status(404).json({ message: 'Not found' });
      else res.json(seat);
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  
  };
  
  exports.getById = async (req, res) => {
  
      try {
        const seat = await Seats.findById(req.params.id);
        if(!seat) res.status(404).json({ message: 'Not found' });
        else res.json(seat);
      }
      catch(err) {
        res.status(500).json({ message: err });
      }
    
  };
  
  exports.postSeat = async (req, res) => {
      try {
  
          const { id } = req.body;
          const { day } = req.body;
          const{ seat } = req.body;
          const{ client } = req.body;
          const{ email } = req.body;
          const newSeat = new Seats({ id: id, day: day, seat: seat, client: client, email: email });
          await newSeat.save();
          res.json({ message: 'OK' });
      
        } catch(err) {
          res.status(500).json({ message: err });
        }
  };
  
  exports.modifySeat = async (req, res) => {
        const { id } = req.body;
        const { day } = req.body;
        const{ seat } = req.body;
        const{ client } = req.body;
        const{ email } = req.body;
  
      try {
        const seatModif = await Seats.findByIdAndUpdate(
          req.params.id,
          { $set: { id: id, day: day, seat: seat, client: client, email: email }},
          { new: true }
        );
        if(seatModif) {
          res.json(seatModif);
        }
        else res.status(404).json({ message: 'Not found...' });
      }
      catch(err) {
        res.status(500).json({ message: err });
      }
  };
  
  exports.deleteSeat = async (req, res) => {
      try {
          const seat = await Seats.findByIdAndDelete(req.params.id);
          if(seat) {
            res.json(seat);
          }
          else res.status(404).json({ message: 'Not found...' });
        }
        catch(err) {
          res.status(500).json({ message: err });
        }
  };