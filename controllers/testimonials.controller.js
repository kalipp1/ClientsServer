const Testimonials = require('../models/testimonials.model');

exports.getAll = async (req, res) => {
    try {
      res.json(await Testimonials.find({}));
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  };
  
  
  exports.getRandom = async (req, res) => {
  
    try {
      const count = await Testimonials.countDocuments();
      const rand = Math.floor(Math.random() * count);
      const testimonial = await Testimonials.findOne().skip(rand);
      if(!testimonial) res.status(404).json({ message: 'Not found' });
      else res.json(dep);
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  
  };
  
  exports.getById = async (req, res) => {
  
      try {
        const testimonial = await Testimonials.findById(req.params.id);
        if(!testimonial) res.status(404).json({ message: 'Not found' });
        else res.json(testimonial);
      }
      catch(err) {
        res.status(500).json({ message: err });
      }
    
  };
  
  exports.postTestimonial = async (req, res) => {
      try {
  
          const { id } = req.body;
          const { author } = req.body;
          const{ text } = req.body;
          const newTestimonial = new Testimonials({ id: id, author: author, text: text });
          await newTestimonial.save();
          res.json({ message: 'OK' });
      
        } catch(err) {
          res.status(500).json({ message: err });
        }
  };
  
  exports.modifyTestimonial = async (req, res) => {
    const { id } = req.body;
    const { author } = req.body;
    const{ text } = req.body;
  
      try {
        const testimonial = await Testimonials.findByIdAndUpdate(
          req.params.id,
          { $set: { id: id, author: author, text: text }},
          { new: true }
        );
        if(testimonial) {
          res.json(testimonial);
        }
        else res.status(404).json({ message: 'Not found...' });
      }
      catch(err) {
        res.status(500).json({ message: err });
      }
  };
  
  exports.deleteTestimonial = async (req, res) => {
      try {
          const testimonial = await Testimonials.findByIdAndDelete(req.params.id);
          if(testimonial) {
            res.json(testimonial);
          }
          else res.status(404).json({ message: 'Not found...' });
        }
        catch(err) {
          res.status(500).json({ message: err });
        }
  };