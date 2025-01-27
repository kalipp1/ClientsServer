const Concerts = require('../models/concerts.model');

exports.getAll = async (req, res) => {
    try {
      console.log('123');
      res.json(await Concerts.find());
    }
    catch(err) {
      console.log(err);
      res.status(500).json({ message: err });
    }
  };
  
  
  exports.getRandom = async (req, res) => {
  
    try {
      const count = await Concerts.countDocuments();
      const rand = Math.floor(Math.random() * count);
      const concert = await Concerts.findOne().skip(rand);
      if(!concert) res.status(404).json({ message: 'Not found' });
      else res.json(concert);
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  
  };
  
  exports.getById = async (req, res) => {
  
      try {
        const concert = await Concerts.findById(req.params.id);
        if(!concert) res.status(404).json({ message: 'Not found' });
        else res.json(concert);
      }
      catch(err) {
        res.status(500).json({ message: err });
      }
    
  };
  
  exports.postConcert = async (req, res) => {
      try {
  
          const { id } = req.body;
          const { performer } = req.body;
          const{ genre } = req.body;
          const{ price } = req.body;
          const{ day } = req.body;
          const{ image } = req.body;
          const newConcert = new Concerts({ id: id, performer: performer, genre: genre, price: price, day: day, image: image });
          await newConcert.save();
          res.json({ message: 'OK' });
      
        } catch(err) {
          res.status(500).json({ message: err });
        }
  };
  
  exports.modifyConcert = async (req, res) => {
    const { id } = req.body;
    const { performer } = req.body;
    const{ genre } = req.body;
    const{ price } = req.body;
    const{ day } = req.body;
    const{ image } = req.body;
  
      try {
        const concert = await Concerts.findByIdAndUpdate(
          req.params.id,
          { $set: { id: id, performer: performer, genre: genre, price: price, day: day, image: image }},
          { new: true }
        );
        if(concert) {
          res.json(concert);
        }
        else res.status(404).json({ message: 'Not found...' });
      }
      catch(err) {
        res.status(500).json({ message: err });
      }
  };
  
  exports.deleteConcert = async (req, res) => {
      try {
          const concert = await Concerts.findByIdAndDelete(req.params.id);
          if(concert) {
            res.json(concert);
          }
          else res.status(404).json({ message: 'Not found...' });
        }
        catch(err) {
          res.status(500).json({ message: err });
        }
  };