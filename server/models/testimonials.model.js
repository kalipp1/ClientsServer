const mongoose = require('mongoose');

const testimonialsSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    author: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        refPath: 'authorModel'
      },
      authorModel: { 
        type: String, 
        required: true, 
        enum: ['Seats', 'Concerts']
      },
    text: { type: String, required: true }
  });

module.exports = mongoose.model('Testimonials', testimonialsSchema);